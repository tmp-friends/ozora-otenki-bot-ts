import {TwitterAPI} from "../lib/twitterAPI";
import {WeatherAPI} from "../lib/weatherAPI";

export const tweetWeatherInfo = async (): Promise<void> => {
  const weatherInfo =
    await new WeatherAPI(`${process.env.TOKYO_CODE}`).getWeatherInfo();
  console.log(weatherInfo);

  await new TwitterAPI().tweet(weatherInfo);
};
