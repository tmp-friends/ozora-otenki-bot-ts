import TwitterApi from "twitter-api-v2";
import { tweet } from "../lib/twitter"

const twitterClient = new TwitterApi({
  // /functions/.env
  // HACK:undefined型を回避するため変数展開
  appKey: `${process.env.APP_KEY}`,
  appSecret: `${process.env.APP_SECRET}`,
  accessToken: `${process.env.ACCESS_TOKEN}`,
  accessSecret: `${process.env.ACCESS_SECRET}`,
});

export const tweetHoge = async (): Promise<void> => {
  await tweet(twitterClient);
}