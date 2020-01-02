# 4. 各エンドポイントの仕様 に関して

[もくじに戻る](../index.md)

これより下は各エンドポイントの詳細仕様を記す。

注意:

URIに含む`:id`はそのまま打つのではなく適宜任意の数字などに置き換えて読む。

各種idはAPI側で決定される。どのidが指定されるかはユーザ側では選べない。
また、そのidのレコードが削除されても、それ以降別のレコードに同じidが振られることはない。

## 4.1. 一例

### そのエンドポイントでできる操作名

- 操作の説明
- HTTPリクエストメソッド(GET,POST,PUT,DELETE) ... (以下HTTPメソッドと表記)
- エンドポイントのURI( https://lovelab.2n2n.ninja 以下の文字列)
- (必要な場合)リクエストボディ
- (存在する場合)レスポンスボディ

などを記す。

リクエスト/レスポンスのbodyは特記がなければ原則json形式

## 4.2. エンドポイントのもくじ

- [4.2.1. 認証系](auth.md)
- [4.2.2. ユーザ](user.md)
- [4.2.3. 招待](invitation.md)
- [4.2.4. グループ](group.md)
- [4.2.5. タスク](task.md)

## 4.3. API一覧

| 分類 | 操作名 | 認証の有無 | HTTPメソッド | URI末尾 |
----|----|----|----|----
| 認証系 | [新規ユーザ登録](auth.md#新規ユーザ登録) | 無し | POST | `/signup` |
| 認証系 | [既存ユーザログイン](auth.md#既存ユーザログイン) | 無し | POST | `/login` |
| ユーザ | [特定のグループに所属するユーザ達の情報を取得](user.md#特定のグループに所属するユーザ達の情報を取得) | 有り | GET | `/authed/users?groupid=:id` |
| ユーザ | [自分のグループに所属するユーザ達の情報を取得](user.md#自分のグループに所属するユーザ達の情報を取得) | 有り | GET | `/authed/users?mygroup=true` |
| ユーザ | [特定のユーザの情報を取得](user.md#特定のユーザの情報を取得) | 有り | GET | `/authed/users/:id` |
| 招待 | [自分への招待をすべて取得](invitation.md#自分への招待をすべて取得) | 有り | GET | `/authed/invitations` |
| 招待 | [新しい招待を作成](invitation.md#新しい招待を作成) | 有り | POST | `/authed/invitations` |
| 招待 | [特定の招待を拒否](invitation.md#特定の招待を拒否)| 有り | DELETE | `/authed/invitations/:id` |
| 招待 | [特定の招待を承諾](invitation.md#特定の招待を承諾) | 有り | DELETE | `/authed/invitations/:id?agreement=true` |
| グループ | [グループの情報を取得](group.md#グループの情報を取得) | 有り | GET | `/authed/groups/:id` |
| グループ | [新規グループ作成](group.md#新規グループ作成)| 有り | POST | `/authed/groups` |
| タスク | [グループのタスクをすべて取得](task.md#グループのタスクをすべて取得) | 有り | GET | `/authed/tasks` |
| タスク | [新規タスクの作成](task.md#新規タスクの作成) | 有り | POST | `/authed/tasks` |
| タスク | [新規タスクの作成-ランダム振り分け](task.md#新規タスクの作成-ランダム振り分け) | 有り | POST | `/authed/tasks?auto=true` |
| タスク | [特定のタスクの情報を取得](task.md#特定のタスクの情報を取得)| 有り | GET | `/authed/tasks/:id` |
| タスク | [特定のタスクの内容を変更](task.md#特定のタスクの内容を変更)| 有り | PUT | `/authed/tasks/:id` |
| タスク | [特定のタスクを削除](task.md#特定のタスクを削除)| 有り | DELETE | `/authed/tasks/:id` |

[もくじに戻る](../index.md)
