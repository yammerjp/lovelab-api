// ライブラリ読み込み
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; // port番号を指定


// GET http://localhost:3000/api/v1/
app.get('/api/v1/',function(req,res){
    res.json({
        message:"Hello,world"
    });
});

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);
