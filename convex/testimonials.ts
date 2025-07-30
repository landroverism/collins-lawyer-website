import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Get approved testimonials
export const getApprovedTestimonials = query({
  args: { 
    featured: v.optional(v.boolean()),
    language: v.optional(v.string()),
  },
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
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to approve testimonials");
    }

    return await ctx.db.patch(args.testimonialId, {
      approved: true,
      featured: args.featured || false,
    });
  },
});

// Admin: Get all testimonials
export const getAllTestimonials = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to view all testimonials");
    }

    return await ctx.db.query("testimonials").order("desc").collect();
  },
});
