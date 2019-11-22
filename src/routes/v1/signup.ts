import * as express from "express";
import * as sha256 from "sha256";
import * as crypto from "crypto";
import { Users } from "../../models/users";
import { userResponceObjectFilter, validate } from "../../others/users";

const router = express.Router();

// POST https://lovelab.2n2n.ninja/api/v1/signup
//  ユーザーを追加 (認証に絡む。新しいアカウントの作成)
router.post("/", (req, res) => {
  const { email, password, name } = req.body;
  if (!validate(email) || !validate(password)) {
    res.json({ error: true, errorMessage: "Invalid send json" });
    return;
  }
  Users.findAll({ where: { email } })
    .then(users => {
      if (users.length !== 0) {
        res.json({
          error: true,
          errorMessage: "the email user is already exist"
        });
        return;
      }
      const salt = crypto.randomBytes(8).toString("HEX");
      const passwordhash = sha256(password + salt);
      Users.create({ email, passwordhash, name, salt })
        .then(newUser => {
          res.json(userResponceObjectFilter(newUser));
        })
        .catch(() => {
          res.json({
            error: true,
            errorMessage: "Database error, failed to create new user"
          });
        });
    })
    .catch(() => {
      res.json({
        error: true,
        errorMessage: "Database error, searching same email user is failed"
      });
    });
});

// routerをモジュールとして扱う準備
export default router;
