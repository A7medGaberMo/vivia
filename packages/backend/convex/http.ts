import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/backend";
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const event = await validateRequest(request);

        if (!event) {
            return new Response("Invalid request", { status: 400 });
        }

        console.log("Clerk Webhook Event:", event.type, event.data);

        switch (event.type) {
            case "subscription.created":
            case "subscription.updated":
            case "subscription.active":
            case "subscription.pastDue": {
                const subscription = event.data as {
                    status?: string;
                };

                if (subscription.status) {
                    await ctx.runMutation(internal.system.subscription.upsert, {
                        status: subscription.status,
                    });
                    console.log(`Subscription status updated to: ${subscription.status}`);
                    return new Response("Subscription updated", { status: 200 });
                } else {
                    console.warn("Received subscription event without status:", event.type);
                    return new Response("Missing subscription status", { status: 400 });
                }
            }

            default:
                console.log("Ignored Clerk event type:", event.type);
                return new Response("Event ignored", { status: 200 });
        }
    }),
});

async function validateRequest(
    request: Request
): Promise<WebhookEvent | null> {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        console.error("Missing CLERK_WEBHOOK_SECRET environment variable");
        return null;
    }

    try {
        const payload = await request.text();

        const headers = {
            "svix-id": request.headers.get("svix-id") ?? "",
            "svix-timestamp": request.headers.get("svix-timestamp") ?? "",
            "svix-signature": request.headers.get("svix-signature") ?? "",
        };

        const webhook = new Webhook(WEBHOOK_SECRET);
        return webhook.verify(payload, headers) as WebhookEvent;
    } catch (error) {
        console.error("Error validating webhook request:", error);
        return null;
    }
}

export default http;