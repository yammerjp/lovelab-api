import * as express from "express";
import * as sha256 from "sha256";
import { Users } from "../../models/users";
import { Tokens } from "../../models/tokens";

const router = express.Router();

// POST https://lovelab.2n2n.ninja/api/v1/login
// APIのアクセスキーを発行。
router.post("/", (req, res) => {
  const { email, password } = req.body;
  Users.findAll({ where: { email } }).then(users => {
    if (users.length !== 1) {
      res.json({ error: true, errorMessage: "user is not found from email" });
      return;
    }
    const user = users[0];

    if (user.passwordhash !== sha256(password + user.salt)) {
      res.json({ error: true, errorMessage: "password is wrong" });
      return;
    }

    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 30);
    const token = `${user.id}-${sha256(email + password + deadline)}`;

    // セッションキーを発行して登録
    const tokenObj = { userid: user.id, token, deadline };
    Tokens.create(tokenObj)
      .then(() => {
        res.json(tokenObj);
      })
      .catch(() => {
        res.json({
          error: true,
          errorMessage: "database error. pleas retray login"
        });
      });
  });
});

// routerをモジュールとして扱う準備
export default router;
