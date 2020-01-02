FROM node:13-alpine

# PostgreSQLの初期化(userとdatabaseの作成)が終わったことを確認するwait-for-postgres.shでpsqlコマンドを使うため
RUN apk --update add postgresql-client

# アプリケーションディレクトリを作成する
WORKDIR /usr/src/app

# アプリケーションの依存関係をインストールする
# ワイルドカードを使用して、package.json と package-lock.json の両方が確実にコピーされるようにします。
# 可能であれば (npm@5+)
COPY package*.json ./

RUN npm install
# 本番用にコードを作成している場合
# RUN npm install --only=production

# アプリケーションのソースをバンドルする
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]

