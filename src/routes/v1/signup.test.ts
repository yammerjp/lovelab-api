import * as supertest from "supertest";
import app from "../../startApp";
import connectDatabase from "../../db";

const req = supertest(app);

beforeAll(() => {
  return connectDatabase(true, true);
});

describe("/signup", () => {
  it("user1 without name", async () => {
    const reqBody = {
      email: "user1",
      password: "hogehoge"
    };
    const res = await req.post("/api/v1/signup").send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body.name).toBe(null);
  });

  it("user2 with name", async () => {
    const reqBody = {
      email: "user2",
      password: "hogehoge",
      name: "user2"
    };
    const res = await req.post("/api/v1/signup").send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(2);
    expect(res.body.name).toBe("user2");
  });

  it("a user only email (will fail)", async () => {
    const reqBody = {
      email: "user3"
    };
    const res = await req.post("/api/v1/signup").send(reqBody);
    expect(res.status).toBe(400);
  });

  it("a user only email (will fail)", async () => {
    const reqBody = {
      password: "password"
    };
    const res = await req.post("/api/v1/signup").send(reqBody);
    expect(res.status).toBe(400);
  });

  it("a user as same as user1's email (will fail)", async () => {
    const reqBody = {
      email: "user1",
      password: "hoge"
    };
    const res = await req.post("/api/v1/signup").send(reqBody);
    expect(res.status).toBe(409);
  });
});
/*
| ユーザ | [新規ユーザ登録](#新規ユーザ登録) | 無し | POST | `/signup` |
| 認証系 | [既存ユーザログイン](#既存ユーザログイン) | 無し | POST | `/login` |
| ユーザ | [特定のグループに所属するユーザ達の情報を取得](#特定のグループに所属するユーザ達の情報を取得) | 有り | GET | `/authed/users?groupid=:id` |
| ユーザ | [特定のユーザの情報を取得](#特定のユーザの情報を取得) | 有り | GET | `/authed/users/:id` |
| 招待 | [新しい招待を作成](#新しい招待を作成) | 有り | POST | `/authed/invitations` |
| 招待 | [特定の招待を拒否](#特定の招待を拒否)| 有り | DELETE | `/authed/invitations/:id` |
| 招待 | [特定の招待を承諾](#特定の招待を承諾) | 有り | DELETE | `/authed/invitations/:id?agreement=true` |
| グループ | [グループの情報を取得](#グループの情報を取得) | 有り | GET | `/authed/groups/:id` |
| グループ | [新規グループ作成](#新規グループ作成)| 有り | POST | `/authed/groups` |
| グループ | [グループのタスクをすべて取得](#グループのタスクをすべて取得) | 有り | GET | `/authed/tasks` |
| タスク | [新規タスクの作成](#新規タスクの作成) | 有り | POST | `/authed/tasks` |
| タスク | [特定のタスクの情報を取得](#特定のタスクの情報を取得)| 有り | GET | `/authed/tasks/:id` |
| タスク | [特定のタスクの内容を変更](#特定のタスクの内容を変更)| 有り | PUT | `/authed/tasks/:id` |


 */
