import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Get all published blog posts
export const getPublishedPosts = query({
  args: { 
    limit: v.optional(v.number()),
    language: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query("blogPosts")
      .withIndex("by_published", (q) => q.eq("published", true))
      .order("desc")
      .take(args.limit || 10);

    return posts.map(post => ({
      ...post,
      title: post.title[args.language as keyof typeof post.title] || post.title.en,
      content: post.content[args.language as keyof typeof post.content] || post.content.en,
      excerpt: post.excerpt[args.language as keyof typeof post.excerpt] || post.excerpt.en,
    }));
  },
});

// Get single blog post by slug
export const getPostBySlug = query({
  args: { 
    slug: v.string(),
    language: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .filter((q) => q.eq(q.field("published"), true))
      .unique();

    if (!post) return null;

    return {
      ...post,
      title: post.title[args.language as keyof typeof post.title] || post.title.en,
      content: post.content[args.language as keyof typeof post.content] || post.content.en,
      excerpt: post.excerpt[args.language as keyof typeof post.excerpt] || post.excerpt.en,
    };
  },
});

// Admin: Create new blog post
export const createPost = mutation({
  args: {
    title: v.object({
      en: v.string(),
      sw: v.optional(v.string()),
      fr: v.optional(v.string()),
      de: v.optional(v.string()),
      es: v.optional(v.string()),
    }),
    content: v.object({
      en: v.string(),
      sw: v.optional(v.string()),
      fr: v.optional(v.string()),
      de: v.optional(v.string()),
      es: v.optional(v.string()),
    }),
    excerpt: v.object({
      en: v.string(),
      sw: v.optional(v.string()),
      fr: v.optional(v.string()),
      de: v.optional(v.string()),
      es: v.optional(v.string()),
    }),
    slug: v.string(),
    published: v.boolean(),
    tags: v.array(v.string()),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to create posts");
    }

    return await ctx.db.insert("blogPosts", {
      ...args,
      authorId: userId,
    });
  },
});

// Admin: Get all posts (including unpublished)
export const getAllPosts = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to view all posts");
    }

    return await ctx.db
      .query("blogPosts")
      .order("desc")
      .collect();
  },
});

// Search blog posts
export const searchPosts = query({
  args: { 
    searchTerm: v.string(),
    language: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query("blogPosts")
      .withSearchIndex("search_posts", (q) =>
        q.search("title.en", args.searchTerm).eq("published", true)
      )
      .take(10);

    return posts.map(post => ({
      ...post,
      title: post.title[args.language as keyof typeof post.title] || post.title.en,
      excerpt: post.excerpt[args.language as keyof typeof post.excerpt] || post.excerpt.en,
    }));
  },
});
