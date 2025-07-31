import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  // Blog posts for legal tips and articles
  blogPosts: defineTable({
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
    authorId: v.id("users"),
    featuredImage: v.optional(v.id("_storage")),
    tags: v.array(v.string()),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
  })
    .index("by_published", ["published"])
    .index("by_slug", ["slug"])
    .searchIndex("search_posts", {
      searchField: "title.en",
      filterFields: ["published", "tags"],
    }),

  // Practice areas
  practiceAreas: defineTable({
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
  }).index("by_order", ["order"])
    .index("by_active", ["active"]),

  // Client testimonials
  testimonials: defineTable({
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
  }).index("by_approved", ["approved", "featured"]),

  // Contact form submissions
  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
    language: v.string(),
    status: v.string(), // "new", "read", "responded", "archived"
    priority: v.string(), // "low", "medium", "high", "urgent"
  }).index("by_status", ["status"]),

  // Site settings
  siteSettings: defineTable({
    key: v.string(),
    value: v.union(v.string(), v.number(), v.boolean(), v.object({})),
    description: v.optional(v.string()),
  }).index("by_key", ["key"]),

  // Document uploads (secure client portal)
  clientDocuments: defineTable({
    clientEmail: v.string(),
    fileName: v.string(),
    fileId: v.id("_storage"),
    uploadedBy: v.string(),
    caseReference: v.optional(v.string()),
    status: v.string(), // "pending", "reviewed", "processed"
    notes: v.optional(v.string()),
  }).index("by_client", ["clientEmail"])
    .index("by_status", ["status"]),

  // Users table
  users: defineTable({
    name: v.string(),
    email: v.string(),
    password: v.string(), // Added password field
    role: v.string(), // Added role field
    createdAt: v.number(),
  }),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
