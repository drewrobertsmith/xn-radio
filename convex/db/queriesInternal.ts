import { internalQuery } from "../_generated/server";

export const listPrograms = internalQuery({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db.query("programs").collect();
  },
});
