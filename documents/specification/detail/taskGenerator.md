# 4.2.6. 定期タスクに関する操作 <各エンドポイントの仕様>

[エンドポイントのもくじに戻る](index.md)

## 新規定期タスクの作成

| 認証の有無 | HTTPメソッド | URI末尾 |
----|----|----
| 有り | POST | `/authed/taskgenerators` |

### リクエストbody

| キー | データ型 | 必須/任意 | 説明 |
----|----|----|----
| name | 文字列 | 必須 | タスクの表示名 |
| comment | 文字列またはnull | 任意 | タスクの詳細文字列 |
| interval | 文字列 | 必須 | タスクの生成間隔(`oneday`または`oneweek`または`onemonth`) |
| firstdeadlinedate | 文字列 | 必須 | 初回タスクの締め切り日時(ISO8601) |

### レスポンスbody

以下のオブジェクトの配列が戻る。

| キー | データ型 | 説明 |
----|----|----
| id | 数字 | 定期タスクid |
| name | 文字列 |  タスクの表示名 |
| comment | 文字列またはnull |  タスクの詳細文字列 |
| interval | 文字列 |  タスクの生成間隔(`oneday`または`oneweek`または`onemonth`) |
| firstdeadlinedate | 文字列 | 必須 | 初回タスクの締め切り日時(ISO8601) |
| updatedAt | 文字列 | 当該レコードの最終更新日時 |
| createdAt | 文字列 | 当該レコードの作成日時 |

### サーバ内の状態変化

新しい定期タスクのレコードが作成される

## グループの定期タスクをすべて取得

| 認証の有無 | HTTPメソッド | URI末尾 |
----|----|----
| 有り | GET | `/authed/taskgenerators` |

### リクエストbody

無し

### レスポンスbody

以下のオブジェクトの配列が戻る。

| キー | データ型 | 説明 |
----|----|----
| id | 数字 | 定期タスクid |
| name | 文字列 |  タスクの表示名 |
| comment | 文字列またはnull |  タスクの詳細文字列 |
| interval | 文字列 |  タスクの生成間隔(`oneday`または`oneweek`または`onemonth`) |
| firstdeadlinedate | 文字列 | 必須 | 初回タスクの締め切り日時(ISO8601) |
| updatedAt | 文字列 | 当該レコードの最終更新日時 |
| createdAt | 文字列 | 当該レコードの作成日時 |

### サーバ内の状態変化

無し

## 特定の定期タスクの内容を取得

| 認証の有無 | HTTPメソッド | URI末尾 |
----|----|----
| 有り | GET | `/authed/taskgenerators/:id` |

### リクエストbody

無し

### レスポンスbody

| キー | データ型 | 説明 |
----|----|----
| id | 数字 | 定期タスクid |
| name | 文字列 |  タスクの表示名 |
| comment | 文字列またはnull |  タスクの詳細文字列 |
| interval | 文字列 |  タスクの生成間隔(`oneday`または`oneweek`または`onemonth`) |
| firstdeadlinedate | 文字列 | 必須 | 初回タスクの締め切り日時(ISO8601) |
| updatedAt | 文字列 | 当該レコードの最終更新日時 |
| createdAt | 文字列 | 当該レコードの作成日時 |

### サーバ内の状態変化

無し

## 特定の定期タスクの内容を変更

| 認証の有無 | HTTPメソッド | URI末尾 |
----|----|----
| 有り | PUT | `/authed/taskgenerators/:id` |

### リクエストbody

| キー | データ型 | 必須/任意 | 説明 |
----|----|----|----
| name | 文字列 | 任意 | タスクの表示名 |
| comment | 文字列またはnull | 任意 | タスクの詳細文字列 |
| interval | 文字列 | 任意 | タスクの生成間隔(`oneday`または`oneweek`または`onemonth`) |
| firstdeadlinedate | 文字列 | 必須 | 初回タスクの締め切り日時(ISO8601) |

### レスポンスbody

| キー | データ型 | 説明 |
----|----|----
| id | 数字 | 定期タスクid |
| name | 文字列 |  タスクの表示名 |
| comment | 文字列またはnull |  タスクの詳細文字列 |
| interval | 文字列 |  タスクの生成間隔(`oneday`または`oneweek`または`onemonth`) |
| firstdeadlinedate | 文字列 | 必須 | 初回タスクの締め切り日時(ISO8601) |
| updatedAt | 文字列 | 当該レコードの最終更新日時 |
| createdAt | 文字列 | 当該レコードの作成日時 |

### サーバ内の状態変化

特になし

## 特定の定期タスクを削除

| 認証の有無 | HTTPメソッド | URI末尾 |
----|----|----
| 有り | DELETE | `/authed/taskgenerators/:id` |

### リクエストbody

無し

### レスポンスbody

無し(レスポンスのHTTPステータスコードは204)

### サーバ内の状態変化

該当の定期タスクのレコードが削除される(次回以降のタスク生成は行われない)

[もくじに戻る](../index.md)
