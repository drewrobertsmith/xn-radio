import { useQuery } from "@tanstack/react-query";
import { fetchAllEpisodesFromOmny } from "../api/fetchAllEpisodesFromOmny";

export default function useClips(programID: string) {
  return useQuery({
    queryKey: ["xn radio", "all clips", programID],
    queryFn: async () => fetchAllEpisodesFromOmny(programID),
    staleTime: 1000 * 60 * 60, // every hour
    gcTime: 1000 * 60 * 60, // Keep in MMKV for an hour
  });
}
