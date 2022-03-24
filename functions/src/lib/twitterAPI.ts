import TwitterApiV2 from "twitter-api-v2";
import {Weather} from "../model/types/weather";

/**
 * Twitter-API-v2ライブラリを用いて、TwitterAPIとやりとりするクラス
 */
export class TwitterAPI {
  private static twitterClient: TwitterApiV2;
  // __dirname = ozora-otenki-bot-ts/functions/lib/lib
  private static imagesFolderPath = "./src/assets/images";

  /**
   * twitterClientを生成する
   */
  constructor() {
    TwitterAPI.twitterClient = new TwitterApiV2({
      // /functions/.env
      // HACK:undefined型を回避するため変数展開
      appKey: `${process.env.APP_KEY}`,
      appSecret: `${process.env.APP_SECRET}`,
      accessToken: `${process.env.ACCESS_TOKEN}`,
      accessSecret: `${process.env.ACCESS_SECRET}`,
    });
  }

  /**
   * ツイートを実行する
   * @param {Weather} weatherInfo
   * @return {void}
   */
  public tweet = async (
      weatherInfo: Weather
  ): Promise<void> => {
    // メディアツイートはv1を推奨とのこと
    // WARN: 同じ内容をツイートするとAPIの仕様によりエラー
    const text = TwitterAPI.createTweetText(weatherInfo);
    const mediaId = await TwitterAPI.generateMediaId();

    await TwitterAPI.twitterClient.v1.tweet(text, {media_ids: mediaId});
  };

  /**
   * 取得した天気データからツイートするテキストを作成する
   * @param {Weather} weatherInfo
   * @return {string} contentText ツイートするテキスト
   */
  private static createTweetText = (weatherInfo: Weather): string => {
    const contentText =
      "みなさんおはようございます！時刻は7時30分！\n" +
      "\n" +
      "今日のお空はどんな空～❓\n" +
      "大空お天気の時間です✨\n" +
      "\n" +
      `今日の都心部は${weatherInfo.todayTelop}、` +
        `最高気温は${weatherInfo.todayMaxTemperature}℃です！\n` +
      "\n" +
      "それでは通勤・通学気をつけて、行ってらっしゃ～い！";

    return contentText;
  };

  /**
   * 画像をUploadしたときに生成したmediaIdを返す
   * @return {string} mediaId
   */
  private static generateMediaId = async (): Promise<string> => {
    const randomId =
      TwitterAPI.generateRandomNumber(`${process.env.NUMBER_OF_IMAGES}`)
          .toString();
    const imagesPath = `${TwitterAPI.imagesFolderPath}/otenki${randomId}.jpg`;

    return TwitterAPI.twitterClient.v1.uploadMedia(imagesPath);
  };

  /**
   * ツイートに添付する画像をランダムにするため乱数を生成
   * @param {string} strImages
   * @return {number} 画像枚数の範囲で生成した乱数
   */
  private static generateRandomNumber = (strImages: string) :number => {
    const numImages = Number(strImages);

    return Math.floor(Math.random() * numImages);
  };
}
