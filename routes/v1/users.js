var express = require('express');
var router = express.Router();

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
router.get('/:id', function (req, res) {
//    console.log(req);
    // req.params.id ... /:idの部分
    res.json({
        id: req.params.id,
        name: "太郎",
        picturepath:"https://www.dropbox.com/s/szjeyvrmd4z047y/GettyImages-522585140.jpg?dl=0",
        groupid:0
    });
});

//routerをモジュールとして扱う準備
module.exports = router;
