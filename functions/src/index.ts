import * as functions from "firebase-functions";
import {tweetWeatherInfo} from "./core";

const runtimeOpts = {
  timeoutSeconds: 180,
  memory: "512MB" as const,
};

export const twitterBot = functions
    .runWith(runtimeOpts)
    .pubsub.schedule("30 7 * * *")
    .timeZone("Asia/Tokyo")
    .onRun(async (__context) => {
      try {
        await tweetWeatherInfo();
      } catch (e) {
        console.error(e);
      }
    });
