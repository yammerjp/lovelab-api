# レスポンスオブジェクト

## 概要

APIのレスポンスは、次の定義されたオブジェクトのいずれか、ないしはいずれかを複数個含む配列を返す

リクエストのプロパティは下記に関係なく、各エンドポイントごとに定義する

## レスポンスオブジェクトの定義

### user

| プロパティ名 | 値型 | nullを許すか | 
|----|----|----|
| groupid | number | yes |
| picturepath | null | - |
| id | number | no |
| email | string | no |
| name | string | yes |
| createdAt | string(ISO 8601) | no |
| updatedAt | string(ISO 8601) | no |

### group

| プロパティ名 | 値型 | nullを許すか | 
|----|----|----|
| id | number | no |
| name | string | no |
| picturepath | null | - |
| createdAt | string(ISO 8601) | no |
| updatedAt | string(ISO 8601) | no |

### task

| プロパティ名 | 値型 | nullを許すか | 
|----|----|----|
| id | number | no |
| name | string | no |
| comment | string | yes |
| groupid | number | no |
| isfinished | boolean | no |
| whoisdoinguserid | number | yes |
| deadlinedate | null | - |
| finisheddate | null | - |
| picturepath | null | - |
| createdAt | string(ISO 8601) | no |
| updatedAt | string(ISO 8601) | no |

### invitation

| プロパティ名 | 値型 | nullを許すか | 
|----|----|----|
| id | number | no |
| message | string | yes |
| groupid | number | no |
| inviteeuserid | number | no |
| inviteruserid | number | no |
| createdAt | string(ISO 8601) | no |
| updatedAt | string(ISO 8601) | no |

### session

| プロパティ名 | 値型 | nullを許すか | 
|----|----|----|
| userid | number | no |
| token | string | no |
| deadline | string(ISO 8601) | no |
| createdAt | string(ISO 8601) | no |
| updatedAt | string(ISO 8601) | no |
