import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Get site setting
export const getSetting = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const setting = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .unique();

    return setting?.value || null;
  },
});

// Get all settings
export const getAllSettings = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to view settings");
    }

    const settings = await ctx.db.query("siteSettings").collect();
    const settingsObj: Record<string, any> = {};
    
    settings.forEach(setting => {
      settingsObj[setting.key] = setting.value;
    });

    return settingsObj;
  },
});

// Update setting
export const updateSetting = mutation({
  args: {
    key: v.string(),
    value: v.union(v.string(), v.number(), v.boolean(), v.object({})),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to update settings");
    }

    const existing = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .unique();

    if (existing) {
      return await ctx.db.patch(existing._id, {
        value: args.value,
        description: args.description,
      });
    } else {
      return await ctx.db.insert("siteSettings", args);
    }
  },
});
