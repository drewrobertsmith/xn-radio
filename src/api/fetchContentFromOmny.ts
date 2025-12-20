import { Program, ProgramStatus } from "../types/types";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const ORG_ID = process.env.EXPO_PUBLIC_ORG_ID;

export const fetchContentFromOmny = async (): Promise<Program[]> => {
  if (!BASE_URL) {
    console.error("No BASE_URL defined!");
  }
  if (!ORG_ID) {
    console.error("No ORG_ID defined!");
  }

  console.log("Begin fetching for Programs....");

  const url = `${BASE_URL}/orgs/${ORG_ID}/programs`;

  console.log("Fetching from URL:", url);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Network response was not okay");
    }

    const json = await res.json();

    if (!json.Programs || json.Programs.length === 0) {
      console.log("The 'Programs' array is missing or empty in the response.");
      return [];
    }

    /*
     *  An annoying thing about the Omny Consumer api is there is no way to to do a query string filter like: ?Network="XN Radio"&CustomFieldData[status]="[Past | Current]"
     *  so we have to fetch all programs and keep 60+ programs in memory,
     *  filter to just the XN Programs,
     *  TanStack caches the one array on the "XN Radio, All Programs" key,
     *  stringify the array of 15ish XN Programs to MMKV storage via the TanStack Query Persister
     *  then use TanStack's selector with a callback to filter based on the CustomFieldData[status] in the hook right before giving it to the component
     *
     *  This way there is only ONE fetch call of a smaller array of programs to be organized that is stringified to memory and any changes are mutated at the hook level
     */

    const networkFilteredPrograms = json.Programs.filter(
      (n: Program) => n.Network === "XN Radio",
    );

    // console.log("Filtered Programs:", networkFilteredPrograms);

    console.log(
      `Found ${networkFilteredPrograms.length} programs after filtering`,
    );

    return networkFilteredPrograms;
  } catch (error) {
    console.error("An error occurred in fetchContentFromOmny:", error);
    throw error;
  }
};
