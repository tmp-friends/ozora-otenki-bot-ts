import * as functions from "firebase-functions";
// import { tweetHoge } from "../core";

const runtimeOpts = {
  timeoutSeconds: 180,
  memory: "512MB" as const
};

export const tweet = functions
  .runWith(runtimeOpts)
  .pubsub.schedule("every 1 minutes")
  .onRun(async (_context) => {
    console.log("test");
    // try {
    //   await tweetHoge();
    // } catch (e) {
    //   console.error(e);
    // }
  })