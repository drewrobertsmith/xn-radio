import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const addToFollowedPrograms = mutation({
  args: { userId: v.id("users"), programId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }
    let followedPrograms = user.followedPrograms ?? [];
    if (followedPrograms.includes(args.programId)) {
      return;
    } else {
      followedPrograms = [...followedPrograms, args.programId];
    }
    await ctx.db.patch(args.userId, { followedPrograms });
  },
});

export const getFollowedPrograms = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user?.followedPrograms ?? [];
  },
});
