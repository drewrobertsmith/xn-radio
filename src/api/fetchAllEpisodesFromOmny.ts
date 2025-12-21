import { Clip } from "../types/types";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const ORG_ID = process.env.EXPO_PUBLIC_ORG_ID;

export const fetchAllEpisodesFromOmny = async (
  programID: string,
): Promise<Clip[]> => {
  if (!BASE_URL) {
    console.error("No BASE_URL defined!");
  }
  if (!ORG_ID) {
    console.error("No ORG_ID defined!");
  }

  console.log("Begin fetching for Clips....");

  const url = `${BASE_URL}/orgs/${ORG_ID}/programs/${programID}/clips`;

  console.log("Fetching from URL:", url);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Network response was not okay");
    }

    const json = await res.json();

    if (!json.Clips || json.Clips.length === 0) {
      console.log("The 'Programs' array is missing or empty in the response.");
      return [];
    }

    console.log(`Found ${json.Clips.length} clips`);

    return json.Clips;
  } catch (error) {
    console.error("An error occurred in fetchContentFromOmny:", error);
    throw error;
  }
};
