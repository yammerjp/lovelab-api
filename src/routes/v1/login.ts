import * as express from "express";
import * as sha256 from "sha256";
import { Users } from "../../models/users";
import { Tokens } from "../../models/tokens";
import errorHandle from "../../others/error";

const router = express.Router();

// APIのアクセスキーを発行
router.post("/", (req, res) => {
  const { email, password } = req.body;
  Users.findAll({ where: { email } })
    .then(users => {
      if (users.length !== 1) {
        return Promise.reject(1101);
      }
      const user = users[0];

      if (user.passwordhash !== sha256(password + user.salt)) {
        return Promise.reject(1102);
      }

      const deadline = new Date();
      deadline.setDate(deadline.getDate() + 30);
      const token = `${user.id}-${sha256(email + password + deadline)}`;

      const tokenObj = { userid: user.id, token, deadline };
      return Tokens.create(tokenObj);
    })
    .then(tokenObj => {
      res.json(tokenObj);
    })
    .catch(e => {
      errorHandle(res, e === 1101 || e === 1102 ? e : 1103);
    });
});

// routerをモジュールとして扱う準備
export default router;
