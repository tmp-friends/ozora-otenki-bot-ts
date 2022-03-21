import TwitterApi from "twitter-api-v2";
import {tweet} from "../lib/twitter";
import {WeatherAPI} from "../lib/weatherAPI";

const twitterClient = new TwitterApi({
  // /functions/.env
  // HACK:undefined型を回避するため変数展開
  appKey: `${process.env.APP_KEY}`,
  appSecret: `${process.env.APP_SECRET}`,
  accessToken: `${process.env.ACCESS_TOKEN}`,
  accessSecret: `${process.env.ACCESS_SECRET}`,
});

export const tweetWeatherInfo = async (): Promise<void> => {
  const weatherInfo =
    await new WeatherAPI(`${process.env.TOKYO_CODE}`).getWeatherInfo();
  console.log(weatherInfo);

  await tweet(twitterClient, weatherInfo);
};
