# 4.2.4. グループに関する操作 <各エンドポイントの仕様>

[エンドポイントのもくじに戻る](index.md)

| サンク | [特定のタスクにありがとうを送信](thank.md#特定のタスクにありがとうを送信) | 有り | POST | `/authed/thanks` |
| サンク | [特定のタスクへのありがとうをキャンセル](thank.md#特定のタスクへのありがとうをキャンセル) | 有り | DELETE | `/authed/thanks?taskid=:id` |

## 特定のタスクにありがとうを送信

| 認証の有無 | HTTPメソッド | URI末尾 |
----|----|----
| 有り | POST | `/authed/thanks` |

### リクエストbody

| キー | データ型 | 必須/任意 | 説明 |
----|----|----|----
| taskid | 数字 | 必須 | タスクid |

### レスポンスbody

| キー | データ型 | 説明 |
----|----|----
| id | 数字 | サンクid |
| taskid | 数字 | ありがとうをしたタスク |
| fromuserid | 数字 | ありがとうをした人 |
| task | オブジェクト | タスクが入ったオブジェクトが入っている | 

#### taskオブジェクト

```json
{
  "id" : number,
  "name" : string,
  "comment" : string|null,
  "groupid" : number,
  "isfinished" : boolean,
  "whoisdoinguserid" : number|null,
  "deadlinedate" : null,
  "finisheddate" : null,
  "updatedAt" : string,
  "createdAt" : string,
  "thanklength" : number
}
```

### サーバ内の状態変化

サンクのレコードが追加される

## 特定のタスクへのありがとうをキャンセル

| 認証の有無 | HTTPメソッド | URI末尾 |
----|----|----
| 有り | DELETE | `/authed/thanks?taskid=` |

### リクエストbody

無し

### レスポンスbody

| キー | データ型 | 説明 |
----|----|----
| task | オブジェクト | タスクが入ったオブジェクトが入っている | 

### サーバ内の状態変化

taskidが一致し、ユーザidが一致するサンクのレコードが削除される

[エンドポイントのもくじに戻る](index.md)
