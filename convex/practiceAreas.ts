import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all active practice areas
export const getActivePracticeAreas = query({
  args: { language: v.optional(v.string()) },
  returns: v.array(v.object({
    _id: v.id("practiceAreas"),
    _creationTime: v.number(),
    title: v.union(v.string(), v.object({
      en: v.string(),
      sw: v.optional(v.string()),
      fr: v.optional(v.string()),
      de: v.optional(v.string()),
      es: v.optional(v.string()),
    })),
    description: v.union(v.string(), v.object({
      en: v.string(),
      sw: v.optional(v.string()),
      fr: v.optional(v.string()),
      de: v.optional(v.string()),
      es: v.optional(v.string()),
    })),
    icon: v.string(),
    order: v.number(),
    active: v.boolean(),
  })),
  handler: async (ctx, args) => {
    const areas = await ctx.db
      .query("practiceAreas")
      .filter((q) => q.eq(q.field("active"), true))
      .order("asc")
      .collect();

    return areas.map(area => ({
      ...area,
      title: area.title[args.language as keyof typeof area.title] || area.title.en,
      description: area.description[args.language as keyof typeof area.description] || area.description.en,
    }));
  },
});

// Admin: Create practice area
export const createPracticeArea = mutation({
  args: {
    title: v.object({
      en: v.string(),
      sw: v.optional(v.string()),
      fr: v.optional(v.string()),
      de: v.optional(v.string()),
      es: v.optional(v.string()),
    }),
    description: v.object({
      en: v.string(),
      sw: v.optional(v.string()),
      fr: v.optional(v.string()),
      de: v.optional(v.string()),
      es: v.optional(v.string()),
    }),
    icon: v.string(),
    order: v.number(),
  },
  returns: v.id("practiceAreas"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("practiceAreas", {
      ...args,
      active: true,
    });
  },
});

// Admin: Get all practice areas
export const getAllPracticeAreas = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("practiceAreas"),
    _creationTime: v.number(),
    title: v.object({
      en: v.string(),
      sw: v.optional(v.string()),
      fr: v.optional(v.string()),
      de: v.optional(v.string()),
      es: v.optional(v.string()),
    }),
    description: v.object({
      en: v.string(),
      sw: v.optional(v.string()),
      fr: v.optional(v.string()),
      de: v.optional(v.string()),
      es: v.optional(v.string()),
    }),
    icon: v.string(),
    order: v.number(),
    active: v.boolean(),
  })),
  handler: async (ctx) => {
    return await ctx.db
      .query("practiceAreas")
      .withIndex("by_order")
      .collect();
  },
});
