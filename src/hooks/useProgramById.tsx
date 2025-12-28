import { useQuery } from "@tanstack/react-query";
import { fetchProgramByIdFromOmny } from "../api/fetchProgramByIdFromOmny";

export default function useProgramById(programID: string) {
  return useQuery({
    queryKey: ["xn radio", "program", programID],
    queryFn: async () => fetchProgramByIdFromOmny(programID),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  });
}
