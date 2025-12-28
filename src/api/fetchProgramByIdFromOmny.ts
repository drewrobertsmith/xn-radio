import { Program } from "../types/types";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const ORG_ID = process.env.EXPO_PUBLIC_ORG_ID;

export const fetchProgramByIdFromOmny = async (
  programID: string,
): Promise<Program> => {
  if (!BASE_URL) {
    console.error("No BASE_URL defined!");
  }
  if (!ORG_ID) {
    console.error("No ORG_ID defined!");
  }

  console.log("Begin fetching for Program....");

  const url = `${BASE_URL}/orgs/${ORG_ID}/programs/${programID}`;

  console.log("Fetching from URL:", url);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Network response was not okay");
    }

    const json = await res.json();

    console.log(`Found ${json.length} program`);

    return json;
  } catch (error) {
    console.error("An error occurred in fetchProgramByIdFromOmny:", error);
    throw error;
  }
};
