# herokuの管理

```sh
$ heroku pg:psql -c "***"
# **にpostgreSQLで有効なSQL文を記述すると、直接データベースを操作できる。
# 例えば
$ heroku pg:psql -c "\dt;"
# テーブル一覧

$ heroku logs --tail
# ログを見る

$ heroku restart
# アプリケーションを再起動

$ git push heroku master
# herokuにアプリケーションをデプロイ
```
