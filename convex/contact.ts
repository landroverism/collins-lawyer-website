import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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
  returns: v.id("contactSubmissions"),
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
  returns: v.array(v.object({
    _id: v.id("contactSubmissions"),
    _creationTime: v.number(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
    language: v.string(),
    status: v.string(),
    priority: v.string(),
  })),
  handler: async (ctx, args) => {
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
  returns: v.null(),
  handler: async (ctx, args) => {
    const updates: any = { status: args.status };
    if (args.priority) {
      updates.priority = args.priority;
    }

    await ctx.db.patch(args.submissionId, updates);
    return null;
  },
});
