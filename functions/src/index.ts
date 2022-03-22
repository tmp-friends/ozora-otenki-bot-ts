import * as functions from "firebase-functions";
import {tweetWeatherInfo} from "./core";

const runtimeOpts = {
  timeoutSeconds: 180,
  memory: "512MB" as const,
};

export const twitterBot = functions
    .runWith(runtimeOpts)
    // 8h進んでいる時間を指定
    .pubsub.schedule("30 15 * * *")
    .onRun(async (_context) => {
      try {
        await tweetWeatherInfo();
      } catch (e) {
        console.error(e);
      }
    });
