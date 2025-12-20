import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  users: defineTable({
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.float64()),
    image: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.float64()),
    followedPrograms: v.optional(v.array(v.string())),
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),
  episodes: defineTable({
    omnyId: v.string(),
    title: v.string(),
    image: v.string(),
    audioURL: v.string(),
    description: v.string(),
    programOmnyId: v.string(),
  })
    .index("by_omnyId", ["omnyId"])
    .index("by_programOmnyId", ["programOmnyId"])
    .searchIndex("search_description", {
      searchField: "description",
    }),
  programs: defineTable({
    omnyId: v.string(),
  }).index("by_omnyId", ["omnyId"]),
});
