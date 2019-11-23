# lovelab.heroku API仕様書

lovelab.herokuのAPIに関する仕様を記す。

2019/11/23時点での仕様。

## 概略

lovelabのWebサーバにあるデータベース内の情報を取得/変更する際に、APIと通信して情報を送受信する。
HTTPS通信で、jsonデータを送受信(一部は受信のみ)することで利用できる。

- APIの送受信するデータ形式: json
- 認証が必要な場合の方式: Bearerトークン
- エンドポイント `https://lovelab.2n2n.ninja/api/v1/*`

## 認証

APIは一部認証が必要である。
認証は、特定のユーザー以外がAPIを使って情報を操作することを防ぐために行う。
具体的な方法は後術。

### 認証の有無

| 認証の有無 | エンドポイント |
----|---- 
| 認証あり | `/api/v1/authed/` |
| 認証なし | `/api/v1/*` (ただし/authed以下を除く)  |

認証の有無に関しては次章以降の各エンドポイントの説明にも記載する。

### 認証の方法

HTTPヘッダに`Authorization: Bearer トークン`を付加してリクエストを送信する。

参考資料

- [トークンを利用した認証・認可 API を実装するとき Authorization: Bearer ヘッダを使っていいのか調べた - Qiita](https://qiita.com/uasi/items/cfb60588daa18c2ec6f5)
- [OAuth 2.0のbearer tokenの最新仕様を調べたらあまり変わってなかった](https://ritou.hatenablog.com/entry/20110402/1301679908)
- [Authorization Bearer ヘッダを用いた認証 API の実装](https://www.getto.systems/entry/2017/10/19/004734)

### Bearerトークンを取得する

POST /api/v1/login の項を参照のこと。ログインに成功するとレスポンスのjsonの中身としてキーが取得できる。有効期限は30日間。

## 実際にAPIと通信してみる

### 認証付きのリクエストを試してみる

### 認証付きのリクエストを試してみる

#### curlで送信する。 (執筆中)

terminalで次のように送信する

```sh
$ curl -H "Authorization: Bearer xxxx" -X POST -d "{"name":"charlie"
# xxxx は取得したAPIキーを利用
```

#### Postmanで送信する。

1. RequestのAuthorizationタブを開き、
1. TYPEを`Bearer Token`に設定。
1. Tokenにトークンを入力する。
1. その他各種値を設定してSend

![postman.png](postman_auth.png)

#### Swiftで送信する。

未調査... 頑張ってください....

## 各エンドポイントの説明

注意:

URIに含む`:id`はそのまま打つのではなく適宜任意の数字などに置き換えて読む。

各種idはAPI側で決定される。どのidが指定されるかはユーザ側では選べない。
また、そのidのレコードが削除されても、それ以降別のレコードに同じidが振られることはない。

### 一例

#### 操作の分類

##### そのエンドポイントでできる操作名

操作の説明

HTTPリクエストメソッド(GET,POST,PUT,DELETE)

エンドポイントのURI( https://lovelab.2n2n.ninja 以下の文字列)

(必要な場合)リクエストボディのjson

(存在する場合)レスポンスボディのjson


#### 認証に関する操作

##### 新規ユーザ登録

POST /api/v1/signup

##### 既存ユーザログイン

POST /api/v1/login

#### ユーザに関する操作

##### 特定のグループに所属するユーザ達の情報を取得

注意: 認証が必要ですが、認証に成功すれば、どのグループのユーザ情報も取得できます。

GET /api/v1/authed/users?groupid=:id

##### 特定のユーザの情報を取得

注意: 認証が必要ですが、認証に成功すれば、すべてのユーザの情報も取得できます。

GET /api/v1/authed/users/:id

:id ... ユーザid(数字)

#### 招待に関する操作

##### 新しい招待を作成

POST /api/v1/authed/invitations

##### 自分への招待をすべて取得

GET /api/v1/authed/invitations

##### (自分への)特定の招待を拒否

DELETE /api/v1/authed/invitations/:id

:id ... 招待id(数字)

##### (自分への)特定の招待を承諾

DELETE /api/v1/authed/invitations/:id?agreement=true

:id ... 招待id(数字)

#### グループに関する操作

##### グループの情報を取得

GET /api/v1/authed/groups/:id

:id ... グループid(数字)

##### 新規グループ作成

グループに所属していないユーザのみ実行可能
新規に作成されたグループに、強制的にアクセスしたユーザが加盟する

POST /api/v1/authed/groups

#### タスクに関する操作

##### グループのタスクをすべて取得

GET /api/v1/authed/tasks

##### 特定のタスクの情報を取得

自分の所属するグループのタスクのみ取得可能

GET /api/v1/authed/tasks/:id

:id ... タスクid(数字)

##### タスクを追加

POST /api/v1/authed/tasks

##### 特定のタスクの内容を変更 (例えば、タスクを完了する操作など)

PUT /api/v1/authed/tasks/:id

:id ... タスクid

