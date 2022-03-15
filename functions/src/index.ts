import * as functions from "firebase-functions";
import TwitterApi from "twitter-api-v2";

const twitterClient = new TwitterApi({
  // /functions/.env
  // HACK:undefined型を回避するため変数展開
  appKey: `${process.env.APP_KEY}`,
  appSecret: `${process.env.APP_SECRET}`,
  accessToken: `${process.env.ACCESS_TOKEN}`,
  accessSecret: `${process.env.ACCESS_SECRET}`,
});

export const tweet = functions.https.onRequest(async(request, response) => {
  // WARN:同じ内容をツイートするとAPIの仕様によりエラー
  await twitterClient.v2.tweet('This is test - v2');
});
