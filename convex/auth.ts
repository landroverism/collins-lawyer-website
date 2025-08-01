import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { GenericDatabaseReader } from "convex/server";
import bcrypt from "bcryptjs";
import { Doc, Id } from "./_generated/dataModel";
import { DataModel } from "./_generated/dataModel";
import { getAuthUserId } from "@convex-dev/auth/server";

// Helper function to safely get user data with proper type parameter
async function getUserById(db: GenericDatabaseReader<DataModel>, userId: Id<"users">) {
  const user = await db.get(userId);
  if (!user) {
    return null;
  }
  return user as Doc<"users">;
}

// Helper function to get user profile
async function getUserProfileHelper(db: GenericDatabaseReader<DataModel>, userId: Id<"users">) {
  const profile = await db
    .query("userProfiles")
    .withIndex("by_user", (q) => q.eq("userId", userId))
    .unique();
  return profile;
}

export const signIn = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  returns: v.union(
    v.object({
      userId: v.id("users"),
      role: v.string(),
    }),
    v.null()
  ),
  handler: async (ctx, { email, password }) => {
    // Find the user by email
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .first();

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Get the user profile to check password and role
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    if (!profile || !profile.password) {
      throw new Error("Invalid email or password");
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, profile.password);
    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }

    return {
      userId: user._id,
      role: profile.role,
    };
  },
});

// Helper functions for the action
export const getUserByEmail = query({
  args: { email: v.string() },
  returns: v.union(
    v.object({
      _id: v.id("users"),
      _creationTime: v.number(),
      name: v.optional(v.string()),
      email: v.optional(v.string()),
      phone: v.optional(v.string()),
      image: v.optional(v.string()),
      emailVerificationTime: v.optional(v.number()),
      phoneVerificationTime: v.optional(v.number()),
      isAnonymous: v.optional(v.boolean()),
    }),
    v.null()
  ),
  handler: async (ctx, { email }) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .first();
  },
});

export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
  },
  returns: v.id("users"),
  handler: async (ctx, { email, name }) => {
    return await ctx.db.insert("users", {
      email,
      name,
    });
  },
});

export const createUserProfile = mutation({
  args: {
    userId: v.id("users"),
    password: v.string(),
    role: v.string(),
    createdAt: v.optional(v.number()),
  },
  returns: v.id("userProfiles"),
  handler: async (ctx, { userId, password, role, createdAt }) => {
    return await ctx.db.insert("userProfiles", {
      userId,
      password,
      role,
      createdAt: createdAt || Date.now(),
    });
  },
});

export const getUserProfile = query({
  args: { userId: v.id("users") },
  returns: v.union(
    v.object({
      _id: v.id("userProfiles"),
      _creationTime: v.number(),
      userId: v.id("users"),
      password: v.optional(v.string()),
      role: v.string(),
      createdAt: v.optional(v.number()),
    }),
    v.null()
  ),
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
  },
});

export const signUp = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.optional(v.string()),
  },
  returns: v.object({
    userId: v.id("users"),
    role: v.string(),
  }),
  handler: async (ctx, { email, password, name }) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .first();

    if (existingUser) {
      throw new Error("Email already registered");
    }

    // Create the user first
    const userId = await ctx.db.insert("users", {
      email,
      name,
    });

    // Create the user profile
    const hashedPassword = await bcrypt.hash(password, 10);
    await ctx.db.insert("userProfiles", {
      userId,
      password: hashedPassword,
      role: "user",
      createdAt: Date.now(),
    });

    return { userId, role: "user" };
  },
});

export const createDefaultAdmin = mutation({
  args: {}, // No arguments needed since this is a fixed operation
  returns: v.object({
    success: v.boolean(),
    message: v.string(),
    adminId: v.optional(v.id("users")),
  }),
  handler: async (ctx) => {
    console.log("Starting createDefaultAdmin mutation...");

    const existingAdmin = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), "kemboiham3@gmail.com"))
      .first();

    if (!existingAdmin) {
      console.log("No existing admin found, creating new admin...");
      
      // Create the user first
      const adminId = await ctx.db.insert("users", {
        name: "Admin User",
        email: "kemboiham3@gmail.com",
      });
      
      // Create the user profile
      const hashedPassword = await bcrypt.hash("kem98@#$", 10);
      await ctx.db.insert("userProfiles", {
        userId: adminId,
        password: hashedPassword,
        role: "admin",
        createdAt: Date.now(),
      });
      
      console.log("Admin user created successfully with ID:", adminId);
      return { success: true, message: "Default admin user created", adminId };
    }

    console.log("Admin user already exists");
    return { success: false, message: "Default admin user already exists" };
  },
});

export const createAdminUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.optional(v.string()),
  },
  returns: v.object({
    userId: v.id("users"),
    role: v.string(),
    message: v.string(),
  }),
  handler: async (ctx, { email, password, name }) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .first();

    let userId: Id<"users">;

    if (existingUser) {
      // User exists, update their role to admin
      userId = existingUser._id;
      
      // Update the user profile to admin role
      const existingProfile = await ctx.db
        .query("userProfiles")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .unique();

      if (existingProfile) {
        // Update existing profile
        await ctx.db.patch(existingProfile._id, {
          role: "admin",
          password: await bcrypt.hash(password, 10),
        });
      } else {
        // Create new profile
        await ctx.db.insert("userProfiles", {
          userId,
          password: await bcrypt.hash(password, 10),
          role: "admin",
          createdAt: Date.now(),
        });
      }

      return { 
        userId, 
        role: "admin",
        message: "Existing user upgraded to admin"
      };
    } else {
      // Create new admin user
      userId = await ctx.db.insert("users", {
        email,
        name,
      });

      const hashedPassword = await bcrypt.hash(password, 10);
      await ctx.db.insert("userProfiles", {
        userId,
        password: hashedPassword,
        role: "admin",
        createdAt: Date.now(),
      });

      return { 
        userId, 
        role: "admin",
        message: "New admin user created"
      };
    }
  },
});

export const ensureDefaultAdmin = mutation({
  args: {},
  returns: v.object({
    success: v.boolean(),
    message: v.string(),
    adminId: v.optional(v.id("users")),
  }),
  handler: async (ctx) => {
    console.log("Ensuring default admin exists...");

    const existingAdmin = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), "kemboiham3@gmail.com"))
      .first();

    if (!existingAdmin) {
      console.log("No existing admin found, creating new admin...");
      
      // Create the user first
      const adminId = await ctx.db.insert("users", {
        name: "Admin User",
        email: "kemboiham3@gmail.com",
      });
      
      // Create the user profile
      const hashedPassword = await bcrypt.hash("kem98@#$", 10);
      await ctx.db.insert("userProfiles", {
        userId: adminId,
        password: hashedPassword,
        role: "admin",
        createdAt: Date.now(),
      });
      
      console.log("Admin user created successfully with ID:", adminId);
      return { success: true, message: "Default admin user created", adminId };
    }

    console.log("Admin user already exists");
    return { success: true, message: "Default admin user already exists", adminId: existingAdmin._id };
  },
});

export const me = query({
  args: {},
  returns: v.union(
    v.object({
      id: v.id("users"),
      role: v.string(),
      email: v.optional(v.string()),
      name: v.optional(v.string()),
    }),
    v.null()
  ),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    const user = await getUserById(ctx.db, userId);
    if (!user) {
      return null;
    }

    // Handle anonymous users
    if (user.isAnonymous) {
      return {
        id: user._id,
        role: "anonymous",
        email: undefined,
        name: undefined,
      };
    }

    // Get user profile for role
    const profile = await getUserProfileHelper(ctx.db, userId);

    return {
      id: user._id,
      role: profile?.role || "user",
      email: user.email,
      name: user.name,
    };
  },
});
