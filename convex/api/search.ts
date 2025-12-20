import { v } from "convex/values";
import { query } from "../_generated/server";

export const searchEpisodes = query({
  args: { searchText: v.string() },
  handler: async (ctx, args) => {
    if (!args.searchText || args.searchText === "") {
      return;
    } else {
      const episodes = await ctx.db
        .query("episodes")
        .withSearchIndex("search_description", (q) =>
          q.search("description", args.searchText),
        )
        .take(10);
      return episodes;
    }
  },
});
