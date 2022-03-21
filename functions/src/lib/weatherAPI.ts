import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {Weather} from "../model/types/weather";

/**
 * 天気予報APIとやりとりするクラス
 */
export class WeatherAPI {
  readonly BASE_URL = "https://weather.tsukumijima.net/api/forecast/city";
  private static axiosRequestConfig: AxiosRequestConfig;

  /**
   * 天気データを取得したい都市を設定
   * 都市コード一覧: https://weather.tsukumijima.net/primary_area.xml
   * @param {string} cityCode 取得したい都市のコード
   */
  constructor(cityCode: string) {
    WeatherAPI.axiosRequestConfig = {
      url: `${this.BASE_URL}/${cityCode}`,
      method: "GET",
    };
  }

  /**
   * 天気予報APIから天気データを取得する
   * 天気予報API: https://weather.tsukumijima.net/
   * @param {string} cityCode 取得したい都市のコード
   * @return {Weather} {今日の天気, 今日の最高気温}
   */
  public getWeatherInfo = async (): Promise<Weather> => {
    let todayTelop = "";
    let todayMaxTemperature = "";

    await axios(WeatherAPI.axiosRequestConfig)
        .then((res: AxiosResponse) => {
          todayTelop =
            WeatherAPI.extractTodayTelop(res);
          todayMaxTemperature =
            WeatherAPI.extractTodayMaxTemperature(res);
        }).catch((e: AxiosError) => {
          console.log(e);
        });

    return {
      todayTelop,
      todayMaxTemperature,
    };
  };

  /**
   * 取得した天気データから"今日の天気"を抽出する
   * @param {AxiosResponse} res APIから取得した天気データ
   * @return {string} 今日の天気
   */
  private static extractTodayTelop = (
      res: AxiosResponse
  ) : string => {
    // forecastsの配列
    // 0: 今日, 1: 明日, 2: 明後日
    return res.data.forecasts[0].telop;
  };

  /**
   * 取得した天気データから"今日の最高気温"を抽出する
   * @param {AxiosResponse} res APIから取得したい天気データ
   * @return {string} 今日の最高気温
   */
  private static extractTodayMaxTemperature = (
      res: AxiosResponse
  ) : string => {
    // forecastsの配列
    // 0: 今日, 1: 明日, 2: 明後日
    return res.data.forecasts[0].temperature.max.celsius;
  };
}
