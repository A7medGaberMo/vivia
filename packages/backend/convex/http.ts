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

        switch (event.type) {
            case "subscription.updated": {
                const subscription = event.data as {
                    status?: string;
                };

                if (!subscription.status) {
                    return new Response("Missing subscription status", { status: 400 });
                }

                await ctx.runMutation(internal.system.subscription.upsert, {
                    status: subscription.status,
                });

                return new Response("Subscription updated", { status: 200 });
            }

            default:
                return new Response("Event ignored", { status: 200 });
        }
    }),
});

async function validateRequest(
    request: Request
): Promise<WebhookEvent | null> {
    try {
        const payload = await request.text();

        const headers = {
            id: request.headers.get("svix-id") ?? "",
            timestamp: request.headers.get("svix-timestamp") ?? "",
            signature: request.headers.get("svix-signature") ?? "",
        };

        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
        return webhook.verify(payload, headers) as WebhookEvent;
    } catch (error) {
        console.error("Error validating webhook request:", error);
        return null;
    }
}

export default http;