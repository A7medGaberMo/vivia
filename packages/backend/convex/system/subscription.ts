import { v } from "convex/values";
import { internalMutation, internalQuery } from "../_generated/server";

export const getOne = internalQuery({
    args: {},
    handler: async (ctx) => {
        const subscription = await ctx.db.query("subscriptions").first();
        return subscription;
    },
});

export const upsert = internalMutation({
    args: {
        status: v.string(),
    },
    handler: async (ctx, args) => {
        const existingSubscription = await ctx.db.query("subscriptions").first();

        if (existingSubscription) {
            await ctx.db.patch(existingSubscription._id, {
                status: args.status,
            });

            return existingSubscription._id;
        }

        const subscriptionId = await ctx.db.insert("subscriptions", {
            status: args.status,
        });

        return subscriptionId;
    },
});