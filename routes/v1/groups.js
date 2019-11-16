var express = require('express');
var router = express.Router();

// /groups グループに関する操作

// GET https://lovelab.2n2n.ninja/api/v1/groups/:groupid
//  グループの情報を取得
// POST https://lovelab.2n2n.ninja/api/v1/groups
//  グループを追加 自分が強制的にそのグループに所属することになる 

// /groups:groupid/tasks タスクに関する操作

// GET https://lovelab.2n2n.ninja/api/v1/groups/:groupid/tasks
//  グループのタスク一覧を取得 自分の所属するグループのみ取得可能
// POST https://lovelab.2n2n.ninja/api/v1/groups/:groupid/tasks
//  タスクを追加 自分の所属するグループのみ追加可能
// GET https://lovelab.2n2n.ninja/api/v1/groups/:groupid/tasks/:taskid
//  タスクの詳細を取得 自分の所属するグループのみ取得可能
// PUT https://lovelab.2n2n.ninja/api/v1/groups/:groupid/tasks/:taskid
//  タスクを完了 自分の所属するグループのみ編集可能

// 以下 仮実装

// GET  http://localhost:3000/api/v1/article/test
router.get('/:id', function (req, res) {
    res.json({
        id: req.params.id,
        name: "group name",
        groupid: 0,
        updatedtimestamp: 0,
        picturepath: "https://www.dropbox.com/s/szjeyvrmd4z047y/GettyImages-522585140.jpg?dl=0"
    });
});

//routerをモジュールとして扱う準備
module.exports = router;
