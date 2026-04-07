import { internalMutation, internalQuery } from "../_generated/server";
import { ConvexError, v } from "convex/values";
import { AUTO_REFRESH_THRESHOLD, SESSION_DURATION_MS } from "../constants";


export const refresh = internalMutation({
  args: {
    contactSessionId: v.id("contact_sessions"),
  },
  handler: async (ctx, { contactSessionId }) => {
    const session = await ctx.db.get(contactSessionId);
    if (!session) {
      throw new ConvexError({
        message: "Contact session not found",
        code: "not_found",
      });
    }
    if (session.expiresAt < Date.now()) {
      throw new ConvexError({
        message: "Contact session has expired",
        code: "BAD_REQUEST",
      });
    }
    const timeRemaining = session.expiresAt - Date.now();

    if (timeRemaining < AUTO_REFRESH_THRESHOLD) {
      const newExpiresAt = Date.now() + SESSION_DURATION_MS;

      await ctx.db.patch(contactSessionId, {
        expiresAt: newExpiresAt,
      });
      return { ...session, expiresAt: newExpiresAt };
    }
    return session;
  },
});

export const getOne = internalQuery({
  args: {
    contactSessionId: v.id("contact_sessions"),
  },
  handler: async (ctx, { contactSessionId }) => {
    const session = await ctx.db.get(contactSessionId);
    if (!session) {
      return null;
    }
    return session;
  },
});

