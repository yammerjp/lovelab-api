# How to use Docker and docker-compose

## リポジトリ内のdockerコンテナについて

### [lovelab-api](https://hub.docker.com/r/basd4g/lovelab-api)

APIサーバ。

### [lovelab-postgres](https://hub.docker.com/_/postgres)

データを保存するPostgreSQL。APIサーバとBatchサーバから書き換えられる。

### [lovelab-batch](https://hub.docker.com/r/basd4g/lovelab-batch)

Batchサーバ。定期タスクを生成する。起動時と1時間ごとにバッチ処理が走り、Databaseに接続しタスクを生成する。

### [lovelab-https-portal](https://hub.docker.com/r/steveltn/https-portal/)

Webサーバ。nginxがリバースプロキシとして働き、APIサーバへ転送する。Let's Encryptによる証明書自動更新を含む。 (`$ ./run.sh local-https` または `$ ./run.sh production`のときのみ動く。ローカルで動くときは自己署名証明書)

## API serverを起動

```sh
# 環境変数を配置
$ cp .env.example .env # .envに記述した環境変数を各ファイルが読み込むようにつくられている

# APIサーバ、Batchサーバ、データベースを起動
$ docker-compose up
# 下記でも可能
$ ./run.sh local

# APIサーバ、Batchサーバ、データベースを停止
$ docker-compose down

# サーバが起動していることを確認
$ docker ps # コンテナが3つ起動していることを確認
$ curl http://localhost/api/v1 # jsonが取得できることを確認
```

## 正常に起動できないとき

```sh
# dockerコンテナが走っていることを確認
$ docker ps

# dockerコンテナ(停止中を含む)があることを確認
$ docker ps -a

# dockerコンテナを強制停止
$ docker kill [container-id]

# dockerコンテナを削除
$ docker rm [container-id]

# docker-volume(dockerにマウントできる永続化領域)を確認
$ docker volume ls

# docker-volumeを削除
$ docker volume rm [volume name]
```

## 特殊な実行方法

```
# テストを実行
$ docker-compose -f docker-compose.yml -f docker-compose.jest.yml run --rm lovelab-api
# 下記でも可能
$ ./run.sh test

# キャッシュを使わないでビルド
$ docker-compose build --no-cache

# ローカルでhttps実行
$ docker-compose -f docker-compose.yml -f docker-compose.local-https.yml up
# 下記でも可能
$ ./run.sh local-https

# 本番環境で実行(Let's encryptによる証明書取得)
# `.env`に適切な環境変数を設定すること
# `docker-compose.production.yml`のドメインをデプロイするサーバのものに置き換えること
$ docker-compose -f docker-compose.yml -f docker-compose.production.yml up
# 下記でも可能
$ ./run.sh production
```

## Docker-Hub

```
# build with image name 
$ docker build -t basd4g/lovelab-api:1.0 .
# push to docker-hub
$ docker push basd4g/lovelab-api:1.0
```

