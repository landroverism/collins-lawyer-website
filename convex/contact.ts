import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Submit contact form
export const submitContactForm = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
    language: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contactSubmissions", {
      ...args,
      status: "new",
      priority: "medium",
    });
  },
});

// Admin: Get contact submissions
export const getContactSubmissions = query({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to view contact submissions");
    }

    if (args.status) {
      return await ctx.db
        .query("contactSubmissions")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .collect();
    }

    return await ctx.db
      .query("contactSubmissions")
      .order("desc")
      .collect();
  },
});

// Admin: Update submission status
export const updateSubmissionStatus = mutation({
  args: {
    submissionId: v.id("contactSubmissions"),
    status: v.string(),
    priority: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to update submissions");
    }

    const updates: any = { status: args.status };
    if (args.priority) {
      updates.priority = args.priority;
    }

    return await ctx.db.patch(args.submissionId, updates);
  },
});
