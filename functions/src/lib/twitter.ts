import TwitterApi from "twitter-api-v2";
import {Weather} from "../model/types/weather";

// __dirname = ozora-otenki-bot-ts/functions/lib/lib
const imagesFolderPath = "../functions/src/assets/images";

export const tweet = async (
    twitterClient: TwitterApi,
    weatherInfo: Weather
): Promise<void> => {
  // WARN: 同じ内容をツイートするとAPIの仕様によりエラー
  // メディアツイートはv1を推奨とのこと
  const text = createTweetText(weatherInfo);
  const mediaId = await generateMediaId(twitterClient);

  await twitterClient.v1.tweet(text, {media_ids: mediaId});
};

export const createTweetText = (weatherInfo: Weather): string => {
  const contentText =
    `${weatherInfo.todayTelop} ${weatherInfo.todayMaxTemperature}`;

  return contentText;
};

export const generateMediaId = async (
    twitterClient: TwitterApi
): Promise<string> => {
  const randomId =
    generateRandomNumber(`${process.env.NUMBER_OF_IMAGES}`).toString();
  const imagesPath = `${imagesFolderPath}/otenki${randomId}.jpg`;

  return twitterClient.v1.uploadMedia(imagesPath);
};

// 画像id(=0~20)の範囲で整数を生成
export const generateRandomNumber = (stImages: string) :number => {
  const numImages = Number(stImages);

  return Math.floor(Math.random() * numImages);
};
