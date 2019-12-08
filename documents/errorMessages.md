# Error Reference

## errorCode: 1001

### HTTP status code

401

### Error Message

Authorization type is Beaer

### Error Message Jp

未認証です。BeaerトークンをHTTPヘッダに付加してください。

### Status

認証が必要なリソースにアクセスしたが、ヘッダから認証トークンを取得できなかったときに発生

## errorCode: 1002

### HTTP status code

403

### Error Message

token is invalid

### Error Message Jp

認証トークンが無効です。

### Status

認証が必要なリソースにアクセスしたが、認証トークンが誤りまたは期限切れのときに発生

## errorCode: 1003

### HTTP status code

500

### Error Message

token's user is not found

### Error Message Jp

トークンは有効ですが、トークンに該当するユーザがデータベースから発見できません。

### Status

トークンの指すユーザがデータベース上に存在しないときに発生。想定していない。

## errorCode: 1004

### HTTP status code

500

### Error Message

unknown error

### Error Message Jp

想定外のエラーです。データベースエラーの可能性があります。

### Status

トークンの有効性確認時、特に故意にエラーを投げていないがcatchされた。データベースエラーの可能性あり。想定されていない。

## errorCode: 1101

### HTTP status code

404

### Error Message

user is not found from email

### Error Message Jp

emailが間違っています。

### Status

ログイン時、リクエストに含まれるemailのユーザが存在しないときに発生

## errorCode: 1102

### HTTP status code

403

### Error Message

password is wrong

### Error Message Jp

パスワードが無効です。

### Status

ログイン時、リクエストに含まれるパスワードがデータベースと一致しないときに発生

## errorCode: 1103

### HTTP status code

500

### Error Message

database error. please retray login

### Error Message Jp

データベースエラーによりトークンが発行できませんでした。

### Status

認証トークン発行時のデータベースエラー。想定されていない。

## errorCode: 1201

### HTTP status code

400

### Error Message

Sent json is Invalid

### Error Message Jp

送信されたjsonの形式が無効です。

### Status

ユーザ登録時、リクエストのjson形式が異なり受理できないときに発生

## errorCode: 1202

### HTTP status code

409

### Error Message

the email user is already exist

### Error Message Jp

そのメールアドレスは既に登録されています。

### Status

ユーザ登録時、リクエストに含まれるemailが、ユーザデータベース上に既に存在する場合に発生。

## errorCode: 1203

### HTTP status code

500

### Error Message

Database error, failed to create new user

### Error Message Jp

データベースエラーにより、ユーザー登録に失敗しました。

### Status

ユーザ登録時のデータベースエラー。想定されていない。

## errorCode: 1204

### HTTP status code

500

### Error Message

Database error, searching same email user is failed

### Error Message Jp

データベースエラーにより、同じemailアドレスを持つユーザが存在するかの調査に失敗しました。

### Status

ユーザ登録時、データベースの追加前に、同じemailのユーザが存在するかを検索した際のデータベースエラー。想定されていない。

## errorCode: 1205

### HTTP status code

500

### Error Message

Database error

### Error Message Jp

データベースエラーが発生しました

### Status

errorCode:1203 or errorCode 1204

## errorCode: 1301

### HTTP status code

400

### Error Message

Invalid groupid

### Error Message Jp

URIに含まれるグループidが数字として認識できません。

### Status

特定のグループの情報取得時、URIに含まれるgroupidの値が数字以外のものであるときに発生。

## errorCode: 1302

### HTTP status code

404

### Error Message

group is not found

### Error Message Jp

指定されたidのグループが見つかりません。

### Status

特定のグループの情報取得時、データベース上に指定されたidのグループが存在しないときに発生

## errorCode: 1303

### HTTP status code

500

### Error Message

Database error

### Error Message Jp

指定されたグループを探そうとしましたが、データベースエラーが発生しました。

### Status

特定のグループの情報取得時、データベースエラーが発生。想定していない。

## errorCode: 1304

### HTTP status code

400

### Error Message

invalid name

### Error Message Jp

リクエストに含まれるnameが不適切です。

### Status

新規グループ作成時、リクエストに含まれるnameが適切な文字列として渡されたなかったときに発生

## errorCode: 1306

### HTTP status code

409

### Error Message

you are already join any group.

### Error Message Jp

既にグループに所属しているユーザは新規グループを作成できません。

### Status

新規グループ作成時、リクエストしたユーザが既に何らかのグループに所属していたときに発生

## errorCode: 1307

### HTTP status code

500

### Error Message

failed to update your groupid. And don't create new group

### Error Message Jp

リクエストしたユーザのグループ加盟に失敗したため、新規グループ作成をキャンセルしました。

### Status

新規グループ作成後、リクエストしたユーザを新規グループに加盟するようデータベース書き換え時のエラーが発生した。その後巻き戻しのために新規作成したグループの削除のデータベース書き換えには成功した。想定していない。

## errorCode: 1308

### HTTP status code

500

### Error Message

created group and failed to update your groupid, but failed to delete new group

### Error Message Jp

リクエストしたユーザのグループ加盟に失敗し、さらに新規グループ作成のキャンセルに失敗しました。

### Status

新規グループ作成後、リクエストしたユーザを新規グループに加盟するようデータベース書き換え時のエラーが発生した。その後巻き戻しのために新規作成したグループの削除のデータベース書き換えにも失敗した。想定していない。

## errorCode: 1309

### HTTP status code

500

### Error Message

failed to access user database

### Error Message Jp

ユーザをデータベース上から検索する際にデータベースエラーが発生しました。

### Status

新規グループ作成時、グループidを知るために認証トークンのユーザをidからデータベース検索しようとしたが、データベースエラーが発生。想定していない。

## errorCode: 1401

### HTTP status code

400

### Error Message

Sent json is invalid

### Error Message Jp

リクエストに含まれるjsonの形式が無効です。

### Status

新規招待作成時、リクエストに含まれるinviteeuseridが数字として認識できなかったときに発生。

## errorCode: 1402

### HTTP status code

409

### Error Message

inviter and invitee is same

### Error Message Jp

自分自身を招待することは出来ません。

### Status

新規招待作成時、招待ユーザが自身と一致したときに発生

## errorCode: 1403

### HTTP status code

409

### Error Message

invitee user is not found on database

### Error Message Jp

被招待者がデータベースに存在しません。

### Status

新規招待作成時、リクエストで指定された被招待者がデータベース上で発見できなかったときに発生

## errorCode: 1404

### HTTP status code

500

### Error Message

unknown error database?

### Error Message Jp

想定されていないエラーが発生しました。データベースエラーの可能性があります。

### Status

新規招待作成時、例外が発生。データベースエラーの可能性あり。想定されていない。

## errorCode: 1409

### HTTP status code

500

### Error Message

DataBase error

### Error Message Jp

データベースエラー

### Status

自分への招待取得時、データベースエラーが発生

## errorCode: 1410

### HTTP status code

400

### Error Message

Invitation id is invalid

### Error Message Jp

リクエストに含まれる招待idは無効です。

### Status

特定の招待を承諾/拒否時、リクエストURIに含まれる招待idが数字として認識できないときに発生

## errorCode: 1411

### HTTP status code

404

### Error Message

invitation is not found

### Error Message Jp

指定されたidの招待はデータベース上に存在しません。

### Status

特定の招待を承諾/拒否時、リクエストURIに含まれる招待idがデータベースに存在しないときに発生

## errorCode: 1412

### HTTP status code

403

### Error Message

you are not invitee

### Error Message Jp

認証トークンのユーザと被招待者が一致しません。招待を削除できるのは被招待者のみです。

### Status

特定の招待を承諾/拒否時、被招待者でない招待を操作しようとリクエストされたときに発生

## errorCode: 1413

### HTTP status code

500

### Error Message

Failed to delete

### Error Message Jp

データベースエラーにより、招待の削除に失敗しました。

### Status

特定の招待を承諾/拒否時、招待レコードの削除時にデータベースエラーが発生

## errorCode: 1502

### HTTP status code

400

### Error Message

groupid is invalid

### Error Message Jp

グループidが無効です。

### Status

グループ所属ユーザ取得時、与えられたgroupidが数字として認識できないときに発生

## errorCode: 1503

### HTTP status code

500

### Error Message

database error

### Error Message Jp

データベースエラーが発生しました。

### Status

グループ所属ユーザ取得時、データベースエラーが発生

## errorCode: 1504

### HTTP status code

400

### Error Message

user id is invalid

### Error Message Jp

ユーザidが無効です

### Status

特定のユーザ情報取得時、URIで指定されたuseridが数字として認識できないときに発生

## errorCode: 1505

### HTTP status code

404

### Error Message

user is not found

### Error Message Jp

ユーザが存在しません。

### Status

特定のユーザ情報取得時、指定されたidのユーザが存在しないことで発生

## errorCode: 1511

### HTTP status code

500

### Error Message

unknown error. accessed user is not found.

### Error Message Jp

認証トークンより取得したユーザが、データベース上で見つかりません。

### Status

グループ所属ユーザ一覧取得時、認証トークンのユーザがデータベース検索でヒットしなかったときに発生

## errorCode: 1512

### HTTP status code

500

### Error Message

database error

### Error Message Jp

認証トークンより取得したユーザの詳細情報をデータベースに問い合わせましたがエラーが発生しました。

### Status

グループ所属ユーザ一覧取得時、認証トークンのユーザをデータベース検索しようとした際にデータベースエラーが発生

## errorCode: 1601

### HTTP status code

500

### Error Message

access user is not found on database

### Error Message Jp

ユーザが見つかりません

### Status

所属グループのタスク一覧取得時、認証トークンのユーザがデータベースに存在しない時発生。想定していない。

## errorCode: 1602

### HTTP status code

409

### Error Message

you are not joined any groups

### Error Message Jp

リクエストしたユーザがグループに所属していません。

### Status

所属グループのタスク一覧取得時、リクエストしたユーザがグループに所属していないときに発生

## errorCode: 1603

### HTTP status code

500

### Error Message

database error

### Error Message Jp

タスク一括取得時にデータベースエラーが発生しました。

### Status

所属グループのタスク一覧取得時、データベースエラーが発生。想定していない。

## errorCode: 1605

### HTTP status code

400

### Error Message

Invalid params of request

### Error Message Jp

リクエストボディの形式が無効です

### Status

新規タスク作成時、リクエストボディの形式が無効であることで発生

## errorCode: 1607

### HTTP status code

500

### Error Message

Database error

### Error Message Jp

タスク新規作成時にデータベースエラーが発生しました。

### Status

タスク新規作成時にデータベースエラーが発生しました。想定していない。

## errorCode: 1608

### HTTP status code

400

### Error Message

task id is invalid

### Error Message Jp

タスクidが無効です。

### Status

特定のタスクの情報取得時、URIで指定されたtaskidが数字として認識できないときに発生

## errorCode: 1610

### HTTP status code

404

### Error Message

Task is not found

### Error Message Jp

指定されたidのタスクは存在しません。

### Status

特定のタスク情報取得時、指定されたidのタスクがデータベース上で発見できなかったときに発生

## errorCode: 1611

### HTTP status code

403

### Error Message

Not parmitted. 

### Error Message Jp

自分のグループのタスクのみ情報を閲覧できます。

### Status

特定のタスク情報取得時、指定されてidのタスクがリクエストしたユーザの所属グループと異なるときに発生

## errorCode: 1612

### HTTP status code

500

### Error Message

Database error

### Error Message Jp

タスク検索時にデータベースエラーが発生しました。

### Status

特定のタスク情報取得時、タスク検索中にデータベースエラーが発生。想定していない。

## errorCode: 1614

### HTTP status code

400

### Error Message

task id is invalid

### Error Message Jp

タスクidの形式が無効です。

### Status

タスク編集時、URIで与えられたtaskidが数字として認識できないときに発生

## errorCode: 1615

### HTTP status code

500

### Error Message

isfinished is need true/false

### Error Message Jp

リクエストボディの形式が無効です。isfinishedは真偽値を要求します。

### Status

タスク編集時、リクエストボディのisfinishedが真偽値でない値を与えられたときに発生

## errorCode: 1617

### HTTP status code

404

### Error Message

searching task from task id is failed

### Error Message Jp

指定されたidのタスクが見つかりません。

### Status

タスク編集時、指定されたidのタスクがデータベース上に存在しないときに発生。

## errorCode: 1618

### HTTP status code

403

### Error Message

Not permitted. the task is out of your group.

### Error Message Jp

自分の所属するグループのタスクのみ編集可能です。

### Status

タスク編集時、指定されたidのタスクが、リクエストユーザのグループと一致しないときに発生。

## errorCode: 1619

### HTTP status code

500

### Error Message

Database updated. and failed to get updated task

### Error Message Jp

タスクの編集には成功しましたが、編集後の内容をデータベースで確認できませんでした。確認したい場合は別途タスク内容の取得をリクエストしてください。

### Status

タスク編集時、データベース書き換えは成功したが、その後の読み取りでデータベースエラーが発生。想定していない。

## errorCode: 1620

### HTTP status code

500

### Error Message

Database error. tasks update

### Error Message Jp

データベースエラーが発生し、タスク更新に失敗しました。

### Status

タスク編集時、データベースエラーが発生。想定していない。

## errorCode: 1621

### HTTP status code

409

### Error Message

whoisdoinguserid is invalid

### Error Message Jp

リクエストボディのwhoisdoinguseridが無効な値です。

### Status

タスク編集時、リクエストボディに無効な値が与えられた時発生。

## errorCode: 1700

### HTTP status code

400

### Error Message

Requested JSON is invalid

### Error Message Jp

Requested JSON is invalid

### Status

Requested JSON is invalid

## errorCode: 1701

### HTTP status code

400

### Error Message

Requested JSON is invalid

### Error Message Jp

Requested JSON is invalid

### Status

Requested JSON is invalid

## errorCode: 1702

### HTTP status code

400

### Error Message

Requested JSON is invalid

### Error Message Jp

Requested JSON is invalid

### Status

Requested JSON is invalid

## errorCode: 1703

### HTTP status code

400

### Error Message

Requested JSON is invalid

### Error Message Jp

Requested JSON is invalid

### Status

Requested JSON is invalid

## errorCode: 1704

### HTTP status code

400

### Error Message

Requested JSON is invalid

### Error Message Jp

Requested JSON is invalid

### Status

Requested JSON is invalid

## errorCode: 1705

### HTTP status code

400

### Error Message

Requested JSON is invalid

### Error Message Jp

Requested JSON is invalid

### Status

Requested JSON is invalid

## errorCode: 1706

### HTTP status code

400

### Error Message

Requested JSON is invalid

### Error Message Jp

Requested JSON is invalid

### Status

Requested JSON is invalid

## errorCode: 1707

### HTTP status code

400

### Error Message

Requested JSON is invalid

### Error Message Jp

Requested JSON is invalid

### Status

Requested JSON is invalid

