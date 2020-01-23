# lovelab-api

lovelab-apiは、[Lovelab(private repository)](https://github.com/enpit2su-ics/2019-team-C)で用いるAPIサーバである。

以下の技術スタックを用いて作られている。

- [node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Lovelabとは?

Lovelabは、タスク管理を行うiPhoneアプリである。  
大学の研究室のような、共同生活を行うチームやコミュニティにおける日常的なタスクを手軽に管理することができる。

## 使用方法

- [iPhoneアプリを含めた使用方法の詳細](./documents/HowToUse.md)
- [dockerコンテナの扱いについての詳細](./documents/docker.md)

### Webで実行

Web上で実行中のサーバ「[lovelab.pw](https://lovelab.pw/api/v1)」が公開されている。(2020/01/23現在)

### ローカルで実行

[docker-compose](https://docs.docker.com/compose/install/) (version 1.24.1)上で動く。

```sh
$ git clone https://github.com/basd4g/lovelab-api.git
$ cd lovelab-api
$ cp .env.example .env

$ docker-compose up
# `$ ./run.sh local`でも同じ

```

http://localhost/api/v1 をブラウザで開き、jsonが表示されたら正常な動作が確認できる。

docker-compose.ymlは定期タスク機能を実現する[lovelab-batch](https://github.com/basd4g/lovelab-batch)コンテナを含む。

### テストを実行

```sh
$ ./run.sh test
```

## 仕様書

lovelab-apiはREST-like APIである。(REST-fulではないのは、認証を要求するから)

- [lovelab-api API仕様書](documents/specification/index.md)

## ライセンス

MIT

## 作者

[basd4g](https://github.com/basd4g)

## 参考

- [lovelab-swift (iPhoneアプリ) (private repository)](https://github.com/enpit2su-ics/2019-team-C)
- [lovelab-api docker-hub (このリポジトリ)](https://hub.docker.com/r/basd4g/lovelab-api)
- [lovelab-batch (Batchサーバ)](https://github.com/basd4g/lovelab-batch)
- [lovelab-batch docker-hub](https://hub.docker.com/r/basd4g/lovelab-batch)

## Language

 [English README](./README.md) | Japanese README
