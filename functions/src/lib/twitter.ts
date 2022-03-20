import TwitterApi from "twitter-api-v2";
import {Weather} from "../model/types/weather";

export const tweet = async (
    twitterClient: TwitterApi,
    weatherInfo: Weather
): Promise<void> => {
  // WARN:同じ内容をツイートするとAPIの仕様によりエラー
  await twitterClient.v2.tweet(createTweetText(weatherInfo));
};

export const createTweetText = (weatherInfo: Weather): string => {
  const contentText =
    `${weatherInfo.todayTelop} ${weatherInfo.todayMaxTemperature}`;

  return contentText;
};
