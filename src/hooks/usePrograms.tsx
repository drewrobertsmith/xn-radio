import { useQuery } from "@tanstack/react-query";
import { fetchContentFromOmny } from "../api/fetchContentFromOmny";
import { Program, ProgramStatus } from "../types/types";
import { useCallback } from "react";

function usePrograms(status: ProgramStatus) {
  return useQuery({
    queryKey: ["xn radio", "all programs"],
    queryFn: fetchContentFromOmny,
    staleTime: 1000 * 60 * 60 * 24, //every 24 hours
    gcTime: 1000 * 60 * 60 * 24, // Keep in MMKV for 24 hours

    // SELECT: This runs whenever data is fetched or the component renders
    // It filters the master list into the specific slice needed
    select: useCallback(
      (data: Program[]) => {
        return data.filter((p) => p.CustomFieldData?.status === status);
      },
      [status],
    ),
  });
}

export function usePastPrograms() {
  return usePrograms("Past");
}

export function useCurrentPrograms() {
  return usePrograms("Current");
}
