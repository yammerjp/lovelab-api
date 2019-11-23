import * as express from "express";
import * as bodyParser from "body-parser";
import * as sha256 from "sha256";
import connectDataBase from "./db";
// import authorization from "./middleware/authorization";
import { Tokens } from "./models/tokens";
import routerV1 from "./routes/v1/index";
import routerV1authed from "./routes/v1/authed/index";

// sha256 テスト

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.use("/api/v1", routerV1);

app.use("/api/v1/authed", (req, res, next) => {
  console.log();
  const httpHeaderAuth = req.get("Authorization");
  if (httpHeaderAuth === undefined || /^Beaer /.test(httpHeaderAuth)) {
    res.json({ error: true, errorMessage: "Authorization type is Beaer" });
    return;
  }
  const token = httpHeaderAuth.split(" ")[1];
  Tokens.findByPk(token).then(tokenObj => {
    if (tokenObj === null) {
      res.json({ error: true, errorMessage: "token is invalid" });
      return;
      // TODO: 日付をチェック
    }
    req.body.userid = tokenObj.userid;
    console.log(`\n\n tokenObj.userid: ${tokenObj.userid}\n\n`);
    console.log(`\n\n req.body.userid: ${req.body.userid}\n\n`);
    next();

    if (false) {
      console.log(res.json());
    }
  });
});

app.use("/api/v1/authed", routerV1authed);

// サーバ起動
app.listen(port);
// eslint-disable-next-line no-console
console.log(`listen on port ${port}`);

connectDataBase();
const str = "user";
console.log(sha256(str));
