# herokuの管理

## heroku PostgreSQL

```sh
$ heroku pg:psql -c "***"
# **にpostgreSQLで有効なSQL文を記述すると、直接データベースを操作できる。
# 例えば
$ heroku pg:psql -c "\dt;"
# テーブル一覧
```

## Check log

```sh
$ heroku logs --tail
# ログを見る
```

## Restart Application

```sh
$ heroku restart
# アプリケーションを再起動
```

## Deploying to Heroku

```sh
$ heroku create
$ git push heroku master
$ heroku open
```
