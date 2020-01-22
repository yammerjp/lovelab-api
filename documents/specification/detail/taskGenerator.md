# 4.2.6. 定期タスクに関する操作 <各エンドポイントの仕様>

[エンドポイントのもくじに戻る](index.md)

## 定期タスクとは？

定期タスクはユーザが作成できる。定期タスクを作成すると、定期的に、自動的に、タスクが生成される

### タスクが生成されるタイミング ( 定期的にとは? )

タスクの締め切り間隔は次から選べる

- 1日ごと
- 1週間ごと
- 1ヶ月ごと

タスクの締め切り日時を過ぎて次の00分になったときに次回のタスクが生成される
。

例)
2020/01/22-15:32締切の定期タスクがあった。
締め切り間隔は1日ごとである。
このとき、2020/01/22-16:00に、2020/01/23-15:32締め切りのタスクがグループに自動追加される。

例)
2020/01/22-15:32締切の定期タスクがあった。
締め切り間隔は1ヶ月ごとである。
このとき、2020/01/22-16:00に、2020/02/22-15:32締め切りのタスクがグループに自動追加される。

### 生成されるタスク ( 自動的にとは? )

name ... もととなる定期タスクのnameと同じ
comment ... もととなる定期タスクのcommentと同じ
groupid ... もととなる定期タスクのグループid
whoisdoinguserid ... グループ内のメンバーに自動振り分けされる。
deadlinedate ... 前回締め切り日時と締め切り間隔から計算した値が採用される。
taskgeneratorid ... もととなる定期タスクのid

### nextgeneratingdateの仕様

#### post時

firstdeadlinedateを過ぎて次の00分の時刻が格納される。

#### put時

firstdeadlinedateの値が変更された時、書き換えられる。

##### intervalがそのままの時

変更された差分と同じだけ、nextgeneratingdateに反映する。
ただしここでいう差分とは、intervalの期間の半分より短いものとする。
例えば、interval=onedayのとき、firstdeadlinedateの時刻が17時から19時に変更していたら+2時間、17時から6時に変更していたら-11時間、17時から4時に変更していたら+11時間、と差分を定める。(日付は無視する)

( 執筆者メモ: nextgeneratingdate +=( firstdeadlinedate(新).getTime() - firstdeadlinedate(旧).getTime ) % interval - interval/2; )

ただし、nextgeneratingdate(新)が過去であるときは、そのタスク生成を行った上で、nextgeneratingdateを次回に更新する。

##### intervalが変更された時

nextgeneratingdateは変更せず、現在生成されているタスクのdeadlinedateの1時間後

#### タスク生成時

nextgeneratingdate += interval

### lovelab-batchの動作

定期タスクは、毎時00分にdatabaseに操作をするバッチプログラムコンテナ「lovelab-batch」により実現している。

lovelab-batchはnextgeneratingdateと現在時刻について、実行日時と日付と時が一致するタスクについてタスク生成を行う。
またこのとき、nextgeneratingdate += intervalとして値を書き換えることで実行が実現している

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
| groupid | 数字 | グループid |
| interval | 文字列 |  タスクの生成間隔(`oneday`または`oneweek`または`onemonth`) |
| firstdeadlinedate | 文字列 | 初回タスクの締め切り日時(ISO8601) |
| nextgeneratingdate | 文字列 | 次回タスク生成される日時(ISO8601) |
| updatedAt | 文字列 | 当該レコードの最終更新日時 |
| createdAt | 文字列 | 当該レコードの作成日時 |

### サーバ内の状態変化

新しい定期タスクのレコードが作成される

同時に、定期タスクの初回のタスクのレコードがtasksテーブルに生成される

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
| groupid | 数字 | グループid |
| interval | 文字列 |  タスクの生成間隔(`oneday`または`oneweek`または`onemonth`) |
| firstdeadlinedate | 文字列 | 初回タスクの締め切り日時(ISO8601) |
| nextgeneratingdate | 文字列 | 次回タスク生成される日時(ISO8601) |
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
| groupid | 数字 | グループid |
| interval | 文字列 |  タスクの生成間隔(`oneday`または`oneweek`または`onemonth`) |
| firstdeadlinedate | 文字列 | 初回タスクの締め切り日時(ISO8601) |
| nextgeneratingdate | 文字列 | 次回タスク生成される日時(ISO8601) |
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
| groupid | 数字 | グループid |
| interval | 文字列 |  タスクの生成間隔(`oneday`または`oneweek`または`onemonth`) |
| firstdeadlinedate | 文字列 | 初回タスクの締め切り日時(ISO8601) |
| nextgeneratingdate | 文字列 | 次回タスク生成される日時(ISO8601) |
| updatedAt | 文字列 | 当該レコードの最終更新日時 |
| createdAt | 文字列 | 当該レコードの作成日時 |

### サーバ内の状態変化

該当の定期タスクのレコードが更新される

nextgeneratingdateが現在時刻よりも過去に更新されてしまう時、タスク生成を行い、nextgeneratingdateを次回時刻に進める

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
