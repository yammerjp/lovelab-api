# lovelab.heroku API仕様書

lovelab.herokuのAPIに関する仕様を記す。

## 概略

lovelabのWebサーバにあるデータベース内の情報を取得/変更する際に、APIと通信して情報を送受信する。

HTTPS通信で、jsonデータを送受信(一部は受信のみ)することで利用できる。

- APIの送受信するデータ形式: json
- 認証が必要な場合の方式: Bearerトークン
- エンドポイント `https://lovelab.2n2n.ninja/api/v1/*`( 以下は`https://lovelab.2n2n.ninja/api/v1`以下のURIを記載する

## もくじ

- [1.認証](auth.md)
- [2.成功と失敗](successAndFail.md)
- [3.実際にAPIと通信してみる](try.md)
- [4.各エンドポイントの仕様](detail/index.md)

