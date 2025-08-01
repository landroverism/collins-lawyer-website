import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get site setting
export const getSetting = query({
  args: { key: v.string() },
  returns: v.union(v.string(), v.number(), v.boolean(), v.object({}), v.null()),
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
  returns: v.record(v.string(), v.union(v.string(), v.number(), v.boolean(), v.object({}))),
  handler: async (ctx) => {
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
  returns: v.id("siteSettings"),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        value: args.value,
        description: args.description,
      });
      return existing._id;
    } else {
      return await ctx.db.insert("siteSettings", args);
    }
  },
});
