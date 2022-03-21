import * as functions from "firebase-functions";
import {tweetWeatherInfo} from "./core";

const runtimeOpts = {
  timeoutSeconds: 180,
  memory: "512MB" as const,
};

export const tweet = functions
    .runWith(runtimeOpts)
    .pubsub.schedule("every 1 minutes")
    .onRun(async (_context) => {
      try {
        await tweetWeatherInfo();
      } catch (e) {
        console.error(e);
      }
    });
