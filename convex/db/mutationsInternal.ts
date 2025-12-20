import { v } from "convex/values";
import { internalMutation } from "../_generated/server";

export const updateProgramTable = internalMutation({
  args: { omnyId: v.string() },
  handler: async (ctx, args) => {
    const existingProgram = await ctx.db
      .query("programs")
      .filter((q) => q.eq(q.field("omnyId"), args.omnyId))
      .unique();

    if (!existingProgram) {
      await ctx.db.insert("programs", args);
    }
  },
});

export const updateEpisodeTable = internalMutation({
  args: {
    omnyId: v.string(),
    title: v.string(),
    image: v.string(),
    audioURL: v.string(),
    description: v.string(),
    programOmnyId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingEpisode = await ctx.db
      .query("episodes")
      .filter((q) => q.eq(q.field("omnyId"), args.omnyId))
      .unique();

    if (!existingEpisode) {
      await ctx.db.insert("episodes", args);
    }
  },
});
