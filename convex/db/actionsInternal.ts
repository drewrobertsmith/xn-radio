import { internalAction } from "../_generated/server";
import { internal } from "../_generated/api";

const BASE_URL = process.env.BASE_URL;
const ORG_ID = process.env.ORG_ID;

export const fetchXNProgramsFromOmnyConsumerAPI = internalAction({
  args: {},
  handler: async (ctx, args) => {
    const url = `${BASE_URL}/orgs/${ORG_ID}/programs`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    const jsonData = data.Programs.filter((p: any) => p.Network === "XN Radio");

    for (const program of jsonData) {
      await ctx.runMutation(internal.db.mutationsInternal.updateProgramTable, {
        omnyId: program.Id,
      });
    }
  },
});

export const fetchXNProgramEpisodesFromOmnyConsumerAPI = internalAction({
  args: {},
  handler: async (ctx, args) => {
    const programs = await ctx.runQuery(
      internal.db.queriesInternal.listPrograms,
      {},
    );

    for (const program of programs) {
      const url = `${BASE_URL}/orgs/${ORG_ID}/programs/${program.omnyId}/clips`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      const clips: any[] = data.Clips ?? [];

      for (const clip of clips) {
        await ctx.runMutation(
          internal.db.mutationsInternal.updateEpisodeTable,
          {
            omnyId: clip.Id,
            title: clip.Title,
            image: clip.ImageUrl,
            audioURL: clip.AudioUrl,
            description: clip.Description,
            programOmnyId: clip.ProgramId,
          },
        );
      }
    }
  },
});
