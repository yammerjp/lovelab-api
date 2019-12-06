# 1. 認証

[もくじに戻る](index.md)

APIは一部認証が必要である。
認証は、特定のユーザー以外がAPIを使って情報を操作することを防ぐために行う。
具体的な方法は後術。

### 1.1. 認証の有無

| 認証の有無 | エンドポイント |
----|----
| 認証あり | `/authed/` |
| 認証なし | `/` (ただし/authed以下を除く)  |

認証の有無に関しては次章以降の各エンドポイントの説明にも記載する。

### 1.2. 認証の方法

HTTPヘッダに`Authorization: Bearer トークン`を付加してリクエストを送信する。

参考資料

- [トークンを利用した認証・認可 API を実装するとき Authorization: Bearer ヘッダを使っていいのか調べた - Qiita](https://qiita.com/uasi/items/cfb60588daa18c2ec6f5)
- [OAuth 2.0のbearer tokenの最新仕様を調べたらあまり変わってなかった](https://ritou.hatenablog.com/entry/20110402/1301679908)
- [Authorization Bearer ヘッダを用いた認証 API の実装](https://www.getto.systems/entry/2017/10/19/004734)

### 1.3. トークンの有効期限

有効期限はログイン時から30日間。

### 1.4. Bearerトークンを取得する

POST /login の項を参照のこと。ログインに成功するとレスポンスボディのjsonの中身としてトークンが取得できる。

[もくじに戻る](index.md)
