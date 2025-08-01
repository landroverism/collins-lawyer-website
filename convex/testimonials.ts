import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get approved testimonials
export const getApprovedTestimonials = query({
  args: { 
    featured: v.optional(v.boolean()),
    language: v.optional(v.string()),
  },
  returns: v.array(v.object({
    _id: v.id("testimonials"),
    _creationTime: v.number(),
    clientName: v.string(),
    content: v.union(v.string(), v.object({
      en: v.string(),
      sw: v.optional(v.string()),
      fr: v.optional(v.string()),
      de: v.optional(v.string()),
      es: v.optional(v.string()),
    })),
    rating: v.number(),
    caseType: v.string(),
    approved: v.boolean(),
    featured: v.boolean(),
  })),
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("testimonials")
      .withIndex("by_approved", (q) => q.eq("approved", true));

    if (args.featured !== undefined) {
      query = query.filter((q) => q.eq(q.field("featured"), args.featured));
    }

    const testimonials = await query.collect();

    return testimonials.map(testimonial => ({
      ...testimonial,
      content: testimonial.content[args.language as keyof typeof testimonial.content] || testimonial.content.en,
    }));
  },
});

// Submit new testimonial
export const submitTestimonial = mutation({
  args: {
    clientName: v.string(),
    content: v.string(),
    rating: v.number(),
    caseType: v.string(),
    language: v.string(),
  },
  returns: v.id("testimonials"),
  handler: async (ctx, args) => {
    const contentObj = {
      en: args.language === "en" ? args.content : "",
      sw: args.language === "sw" ? args.content : undefined,
      fr: args.language === "fr" ? args.content : undefined,
      de: args.language === "de" ? args.content : undefined,
      es: args.language === "es" ? args.content : undefined,
    };

    return await ctx.db.insert("testimonials", {
      clientName: args.clientName,
      content: contentObj,
      rating: args.rating,
      caseType: args.caseType,
      approved: false,
      featured: false,
    });
  },
});

// Admin: Approve testimonial
export const approveTestimonial = mutation({
  args: {
    testimonialId: v.id("testimonials"),
    featured: v.optional(v.boolean()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.testimonialId, {
      approved: true,
      featured: args.featured || false,
    });
    return null;
  },
});

// Admin: Get all testimonials
export const getAllTestimonials = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("testimonials"),
    _creationTime: v.number(),
    clientName: v.string(),
    content: v.object({
      en: v.string(),
      sw: v.optional(v.string()),
      fr: v.optional(v.string()),
      de: v.optional(v.string()),
      es: v.optional(v.string()),
    }),
    rating: v.number(),
    caseType: v.string(),
    approved: v.boolean(),
    featured: v.boolean(),
  })),
  handler: async (ctx) => {
    return await ctx.db.query("testimonials").order("desc").collect();
  },
});
