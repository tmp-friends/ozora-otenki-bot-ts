import TwitterApi from "twitter-api-v2";

export const createTweetText = () => {
  const contentText = 'This is test';
  return contentText;
};

export const tweet = async (
  twitterClient: TwitterApi
): Promise<void> => {
  // WARN:同じ内容をツイートするとAPIの仕様によりエラー
  await twitterClient.v2.tweet(createTweetText());
};
