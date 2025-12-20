import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.daily(
  "new xn program fetch",
  {
    hourUTC: 14, // 8am CST
    minuteUTC: 0,
  },
  internal.db.actionsInternal.fetchXNProgramsFromOmnyConsumerAPI,
);

export default crons;
