
# 大空お天気Bot - v2

https://twitter.com/OzoraOtenkiBot

毎朝7:30に天気予報をつぶやくTwitterBotです。

![demo_image](https://user-images.githubusercontent.com/52572364/160261165-2add7639-16ce-4dfa-bacf-d4c57b26825e.png)

# 背景

『アイカツ！』というアニメで、大空あかりちゃんがお天気キャスターとして活躍します。それをBotとして作りました。
朝に東京の天気もわかるし、推しの画像も見られるので一石二鳥です。

実はこのBotは3年前からRubyで作成しHeroku上で運用していたのですが、今回作り直しました。
理由としては、以下です。
* [HerokuでSSL証明書が必須](https://devcenter.heroku.com/ja/articles/ssl-endpoint)となったらしく、毎月課金しないとBotが動かない状態にあったから
* TypeScriptの勉強がてら作るには最適なレベル感だったから

# 仕様

* Pub/Subを用いて毎朝7:30に定期実行
* [天気予報API](https://weather.tsukumijima.net/)から、今日の東京の天気予報をGET
* TwitterAPIを用いて、画像付きツイート


# 動作環境

* Node.js 14.17.3
* TypeScript 3.9.10
* Axios 0.26.1
* Twitter-API-v2 1.11.0
* FirebaseCLI 10.2.2

# インストール

* 動作環境で示したライブラリをインストールし、Firebaseプロジェクトを作成してください。

* `/functions/.env`ファイルを用意し、以下の環境変数を設定してください。
[参考](https://zenn.dev/temple_c_tech/articles/functions-config-env)

```
APP_KEY=<TwitterのAPP_KEY>
APP_SECRET=<TwitterのAPP_SECRET>
ACCESS_TOKEN=<TwitterのACCESS_TOKEN>
ACCESS_SECRET=<TwitterのACCESS_SECRET>

TOKYO_CODE=<天気予報APIの都市コード(今回の場合は東京)>
NUMBER_OF_IMAGES=<画像枚数>
```

* FirebaseEmulatorsでローカル実行環境を整えてください
[参考](https://zenn.dev/temple_c_tech/articles/ozora-otenki-bot-ts#firebase%E3%81%A7%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%AB%E5%AE%9F%E8%A1%8C%E7%92%B0%E5%A2%83%E3%82%92%E6%95%B4%E3%81%88%E3%82%8B)

## その他

Zennで制作過程を記事にしました。

https://zenn.dev/temple_c_tech/articles/ozora-otenki-bot-ts
