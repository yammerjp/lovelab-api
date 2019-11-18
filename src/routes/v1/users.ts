import * as express from "express";
import pool from "../../database/database";

const router = express.Router();

// /users ユーザーに関する操作

// GET https://lovelab.2n2n.ninja/api/v1/users?groups=:groupid
//  グループに所属するユーザーを取得
// GET https://lovelab.2n2n.ninja/api/v1/users/user:id
//  ユーザー情報を取得
// POST https://lovelab.2n2n.ninja/api/v1/users
//  ユーザーを追加 (認証に絡む。新しいアカウントの作成)

// /users/:userid/invitations 招待に関する操作

// POST https://lovelab.2n2n.ninja/api/v1/users/:userid/invitations
//  グループへの招待を追加 自分の所属するグループへの招待のみ可能
// GET https://lovelab.2n2n.ninja/api/v1/users/:userid/invitations
//  招待をすべて取得 自分への招待のみ取得可能
// PUT https://lovelab.2n2n.ninja/api/v1/users/:userid/invitations/:invitationid
//  招待を承諾/拒否 自分への招待のみ編集可能

// 以下 仮実装

// POST  https://lovelab.2n2n.ninja/api/v1/users/:userid/invitations
// GET https://lovelab.2n2n.ninja/api/v1/users/:userid/invitations
// PUT https://lovelab.2n2n.ninja/api/v1/users/:userid/invitations/:invitationid

// GET  http://localhost:3000/api/v1/user/:id

const validateId = (str: string): boolean => {
  // 半角英数と_の組み合わせのみ許可
  return /^[a-zA-Z0-9_]+$/.test(str);
};

router.get("/:id", (req, res) => {
  const { id } = req.params;
  //  console.log(`access: GET http://localhost:3000/api/v1/user/${id}`)
  if (!validateId(id)) {
    res.json({ error: true, errorMessage: "invalid id" });
    return;
  }
  pool.connect((err, client) => {
    // eslint-disable-next-line no-console
    if (err) console.log(err);
    client
      .query(`SELECT id FROM users WHERE id = '${id}'`)
      .then(result => {
        // idは主キーなので result.rows.length=0 or 1
        if (result.rows.length === 0) {
          res.json({ error: true, errorMessage: "the id's user is not exist" });
          return;
        }
        res.json(result.rows[0]);
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log(e);
        res.json({ error: true, errorMessage: "SQL query Error" });
      });
  });
  /*
    res.json({
      id: req.params.id,
      name: "太郎",
      picturepath:
        "https://www.dropbox.com/s/szjeyvrmd4z047y/GettyImages-522585140.jpg?dl=0",
      groupid: 0
    });
 */
});

// routerをモジュールとして扱う準備

export default router;
