import * as express from "express";
import * as sha256 from "sha256";
import * as crypto from "crypto";
import { Users } from "../../models/users";
import userResponceObjectFilter from "../../others/users";
import errorHandle from "../../others/error";

const router = express.Router();

//  ユーザーを追加 (認証に絡む。新しいアカウントの作成)
router.post("/", (req, res) => {
  const { email, password, name } = req.body;
  /*
  if (!validate(email) || !validate(password)) {
    errorHandle(res, 1201);
    return;
  }
 */
  if (
    email === null ||
    email === undefined ||
    password === null ||
    password === undefined ||
    name === null ||
    name === undefined
  ) {
    errorHandle(res, 1201);
    return;
  }

  Users.findOne({ where: { email } })
    .then(user => {
      if (user !== null) {
        return Promise.reject(1202);
      }
      const salt = crypto.randomBytes(8).toString("HEX");
      const passwordhash = sha256(password + salt);
      return Users.create({ email, passwordhash, name, salt });
    })
    .then(newUser => {
      res.json(userResponceObjectFilter(newUser));
    })
    .catch(e => {
      errorHandle(res, e === 1202 ? e : 1205);
    });
});

// routerをモジュールとして扱う準備
export default router;
