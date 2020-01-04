import * as supertest from "supertest";
import app from "../src/startApp";
import connectDatabase from "../src/db";

const req = supertest(app);

let bearerUser1 = "";
let bearerUser2 = "";
let bearerUser3 = "";
let bearerUser4 = "";

beforeAll(() => {
  return connectDatabase(true);
});

describe("/signup", () => {
  it("x POST   /signup   user1, without name", async () => {
    const reqBody = {
      email: "user1",
      password: "hogehoge"
    };
    const res = await req.post("/api/v1/signup").send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(1201);
  });

  it("o POST   /signup   user1, with name", async () => {
    const reqBody = {
      email: "user1",
      password: "hogehoge",
      name: "user1"
    };
    const res = await req.post("/api/v1/signup").send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      groupid: null,
      picturepath: null,
      id: 1,
      email: "user1",
      name: "user1"
    });
  });

  it("o POST   /signup   user2, with name", async () => {
    const reqBody = {
      email: "user2",
      password: "hogehoge",
      name: "user2"
    };
    const res = await req.post("/api/v1/signup").send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      groupid: null,
      picturepath: null,
      id: 2,
      email: "user2",
      name: "user2"
    });
  });

  it("o POST   /signup   user3, with name", async () => {
    const reqBody = {
      email: "user3",
      password: "hogehoge",
      name: "user3"
    };
    const res = await req.post("/api/v1/signup").send(reqBody);
    expect(res.status).toBe(200);
  });

  it("x POST   /signup   lacks of password and name", async () => {
    const reqBody = {
      email: "user3"
    };
    const res = await req.post("/api/v1/signup").send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(1201);
  });

  it("o POST   /signup   user4, with name", async () => {
    const reqBody = {
      email: "user4",
      password: "hogehoge",
      name: "user4"
    };
    const res = await req.post("/api/v1/signup").send(reqBody);
    expect(res.status).toBe(200);
  });

  it("x POST   /signup   lacks of password and name", async () => {
    const reqBody = {
      email: "user3"
    };
    const res = await req.post("/api/v1/signup").send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(1201);
  });

  it("x POST   /signup   lacks of email and name", async () => {
    const reqBody = {
      password: "password"
    };
    const res = await req.post("/api/v1/signup").send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(1201);
  });

  it("x POST   /signup   conflict email", async () => {
    const reqBody = {
      email: "user1",
      password: "hoge",
      name: "hogeeeeeeeee"
    };
    const res = await req.post("/api/v1/signup").send(reqBody);
    expect(res.status).toBe(409);
    expect(res.body.errorCode).toBe(1202);
  });
});

describe("/login", () => {
  it("o POST   /login   user1", async () => {
    const reqBody = {
      email: "user1",
      password: "hogehoge"
    };
    const res = await req.post("/api/v1/login").send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      userid: 1,
      token: expect.anything(),
      deadline: expect.anything(),
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
    expect(res.body.token.length).toBe(66);
    bearerUser1 = res.body.token;
    // console.log(`bearer token user1 : ${bearerUser1}`);
  });

  it("o POST   /login   user2", async () => {
    const reqBody = {
      email: "user2",
      password: "hogehoge"
    };
    const res = await req.post("/api/v1/login").send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      userid: 2,
      token: expect.anything(),
      deadline: expect.anything(),
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
    expect(res.body.token.length).toBe(66);
    bearerUser2 = res.body.token;
    // console.log(`bearer token user2 : ${bearerUser2}`);
  });

  it("o POST   /login   user3", async () => {
    const reqBody = {
      email: "user3",
      password: "hogehoge"
    };
    const res = await req.post("/api/v1/login").send(reqBody);
    expect(res.status).toBe(200);
    bearerUser3 = res.body.token;
    // console.log(`bearer token user3 : ${bearerUser3}`);
  });

  it("o POST   /login   user4", async () => {
    const reqBody = {
      email: "user4",
      password: "hogehoge"
    };
    const res = await req.post("/api/v1/login").send(reqBody);
    expect(res.status).toBe(200);
    bearerUser4 = res.body.token;
    // console.log(`bearer token user4 : ${bearerUser4}`);
  });

  it("x POST   /login   user1, wrong password", async () => {
    const reqBody = {
      email: "user1",
      password: "hogehogehoge"
    };
    const res = await req.post("/api/v1/login").send(reqBody);
    expect(res.status).toBe(403);
    expect(res.body.errorCode).toBe(1102);
  });
});

describe("/authed", () => {
  it("x GET    /authed/groups/1   without authorization", async () => {
    const res = await req.get("/api/v1/authed/groups/1").send();
    expect(res.status).toBe(401);
    expect(res.body.errorCode).toBe(1001);
  });
});

describe("/authed/groups", () => {
  it("x GET    /authed/groups/1   user1 is not exist", async () => {
    const res = await req
      .get("/api/v1/authed/groups/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(404);
    expect(res.body.errorCode).toBe(1302);
  });

  it("x POST   /authed/groups   create group. a lack of name", async () => {
    const reqBody = {};
    const res = await req
      .post("/api/v1/authed/groups")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(1304);
  });

  it("o POST   /authed/groups   create group", async () => {
    const reqBody = {
      name: "groupname"
    };
    const res = await req
      .post("/api/v1/authed/groups")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body.name).toBe("groupname");
  });

  it("o POST   /authed/groups   create group. user3 created group2", async () => {
    const reqBody = {
      name: "groupname"
    };
    const res = await req
      .post("/api/v1/authed/groups")
      .set("Authorization", `Bearer ${bearerUser3}`)
      .send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(2);
    expect(res.body.name).toBe("groupname");
  });

  it("o GET    /authed/groups/1", async () => {
    const res = await req
      .get("/api/v1/authed/groups/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "groupname",
      picturepath: null
    });
  });
});

describe("/authed/invitations", () => {
  it("o GET    /authed/invitations   no invitations", async () => {
    const res = await req
      .get("/api/v1/authed/invitations")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });

  it("x POST   /authed/invitations   invite on my own (user1 -> user1)", async () => {
    const reqBody = {
      inviteeuserid: 1,
      message: "invitation message"
    };
    const res = await req
      .post("/api/v1/authed/invitations")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(409);
    expect(res.body.errorCode).toBe(1402);
  });

  it("x POST   /authed/invitations   user2 dose not belong to any groups (user2 -> user1)", async () => {
    const reqBody = {
      inviteeuserid: 1,
      message: "invitation message"
    };
    const res = await req
      .post("/api/v1/authed/invitations")
      .set("Authorization", `Bearer ${bearerUser2}`)
      .send(reqBody);
    expect(res.status).toBe(500);
    expect(res.body.errorCode).toBe(1404);
  });

  it("o POST   /authed/invitations   (user1 -> user2)", async () => {
    const reqBody = {
      inviteeuserid: 2,
      message: "invitation message"
    };
    const res = await req
      .post("/api/v1/authed/invitations")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      groupid: 1,
      inviteruserid: 1,
      inviteeuserid: 2,
      message: "invitation message",
      createdAt: expect.anything(),
      updatedAt: expect.anything()
    });
  });

  it("o POST   /authed/invitations   without message (user1 -> user2)", async () => {
    const reqBody = {
      inviteeuserid: 2
    };
    const res = await req
      .post("/api/v1/authed/invitations")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 2,
      groupid: 1,
      inviteruserid: 1,
      inviteeuserid: 2,
      message: null,
      createdAt: expect.anything(),
      updatedAt: expect.anything()
    });
  });

  it("o GET    /authed/invitations   2 invitations", async () => {
    const res = await req
      .get("/api/v1/authed/invitations")
      .set("Authorization", `Bearer ${bearerUser2}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        groupid: 1,
        inviteruserid: 1,
        inviteeuserid: 2,
        message: "invitation message",
        createdAt: expect.anything(),
        updatedAt: expect.anything()
      },
      {
        id: 2,
        groupid: 1,
        inviteruserid: 1,
        inviteeuserid: 2,
        message: null,
        createdAt: expect.anything(),
        updatedAt: expect.anything()
      }
    ]);
  });

  it("o DELETE /authed/invitations   user2 reject a invitation", async () => {
    const res = await req
      .delete("/api/v1/authed/invitations/1")
      .set("Authorization", `Bearer ${bearerUser2}`)
      .send();
    expect(res.status).toBe(204);
  });

  it("o GET    /authed/users/2   user2 does not belong to any groups", async () => {
    const res = await req
      .get("/api/v1/authed/users/2")
      .set("Authorization", `Bearer ${bearerUser2}`)
      .send();
    expect(res.body.groupid).toBe(null);
  });

  it("o DELETE /authed/invitations   user2 accept a invitation", async () => {
    const res = await req
      .delete("/api/v1/authed/invitations/2?agreement=true")
      .set("Authorization", `Bearer ${bearerUser2}`)
      .send();
    expect(res.status).toBe(204);
  });

  it("o GET    /authed/users/2   user2 joined group1", async () => {
    const res = await req
      .get("/api/v1/authed/users/2")
      .set("Authorization", `Bearer ${bearerUser2}`)
      .send();
    expect(res.body.groupid).toBe(1);
  });

  it("o GET    /authed/invitations   user2 has no invitations", async () => {
    const res = await req
      .get("/api/v1/authed/invitations")
      .set("Authorization", `Bearer ${bearerUser2}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });
});

describe("/authed/users", () => {
  it("o GET    /authed/users?groupid=1", async () => {
    const res = await req
      .get("/api/v1/authed/users?groupid=1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        groupid: 1,
        picturepath: null,
        id: 1,
        email: "user1",
        name: "user1"
      },
      {
        groupid: 1,
        picturepath: null,
        id: 2,
        email: "user2",
        name: "user2"
      }
    ]);
  });

  it("o GET    /authed/users?mygroup=true", async () => {
    const res = await req
      .get("/api/v1/authed/users?mygroup=true")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        groupid: 1,
        picturepath: null,
        id: 1,
        email: "user1",
        name: "user1"
      },
      {
        groupid: 1,
        picturepath: null,
        id: 2,
        email: "user2",
        name: "user2"
      }
    ]);
  });

  it("o GET    /authed/users?groupid=3", async () => {
    const res = await req
      .get("/api/v1/authed/users?groupid=3")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });
  it("x GET     /authed/users   need groupid or mygroupid=true", async () => {
    const res = await req
      .get("/api/v1/authed/users")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(1502);
  });
  it("o GET     /authed/users/1", async () => {
    const res = await req
      .get("/api/v1/authed/users/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      groupid: 1,
      picturepath: null,
      id: 1,
      email: "user1",
      name: "user1"
    });
  });
  it("x GET    /authed/users/5   not exist", async () => {
    const res = await req
      .get("/api/v1/authed/users/5")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(404);
    expect(res.body.errorCode).toBe(1505);
  });
});

describe("/authed/tasks", () => {
  it("o GET    /authed/tasks", async () => {
    const res = await req
      .get("/api/v1/authed/tasks")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("x GET    /authed/tasks/1   not exist", async () => {
    const res = await req
      .get("/api/v1/authed/tasks/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(404);
    expect(res.body.errorCode).toBe(1610);
  });

  it("x POST   /authed/tasks   a lack of name", async () => {
    const reqBody = {
      comment: "taskComment"
    };
    const res = await req
      .post("/api/v1/authed/tasks")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(1605);
  });

  it("x POST   /authed/tasks   deadlinedate's format is not ISO8601", async () => {
    const reqBody = {
      name: "taskName",
      comment: "taskComment",
      deadlinedate: "notISO8601String"
    };
    const res = await req
      .post("/api/v1/authed/tasks")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(1706);
  });

  it("x POST   /authed/tasks   user4 does not belong to any groups", async () => {
    const reqBody = {
      name: "taskName",
      comment: "taskComment"
    };
    const res = await req
      .post("/api/v1/authed/tasks")
      .set("Authorization", `Bearer ${bearerUser4}`)
      .send(reqBody);
    expect(res.status).toBe(500);
    expect(res.body.errorCode).toEqual(1607);
  });

  it("o POST   /authed/tasks   with name", async () => {
    const reqBody = {
      name: "taskName"
    };
    const res = await req
      .post("/api/v1/authed/tasks")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      whoisdoinguserid: null,
      isfinished: false,
      deadlinedate: null,
      finisheddate: null,
      doneuserid: null,
      id: 1,
      name: "taskName",
      comment: null,
      groupid: 1,
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });

  it("o POST   /authed/tasks   with name, comment, whoisdoinguserid", async () => {
    const reqBody = {
      name: "taskName",
      comment: "taskComment",
      whoisdoinguserid: 1
    };
    const res = await req
      .post("/api/v1/authed/tasks")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      whoisdoinguserid: 1,
      isfinished: false,
      deadlinedate: null,
      finisheddate: null,
      doneuserid: null,
      id: 2,
      name: "taskName",
      comment: "taskComment",
      groupid: 1,
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });

  it("o POST   /authed/tasks   with name, comment, whoisdoinguserid, deadlinedate", async () => {
    const reqBody = {
      name: "taskName",
      comment: "taskComment",
      whoisdoinguserid: 2,
      deadlinedate: "2020-02-03T04:05:06.078Z"
    };
    const res = await req
      .post("/api/v1/authed/tasks")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      whoisdoinguserid: 2,
      isfinished: false,
      deadlinedate: "2020-02-03T04:05:06.078Z",
      finisheddate: null,
      doneuserid: null,
      id: 3,
      name: "taskName",
      comment: "taskComment",
      groupid: 1,
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });

  it("o GET    /authed/tasks", async () => {
    const res = await req
      .get("/api/v1/authed/tasks")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        whoisdoinguserid: null,
        isfinished: false,
        deadlinedate: null,
        finisheddate: null,
        doneuserid: null,
        id: 1,
        name: "taskName",
        comment: null,
        groupid: 1,
        updatedAt: expect.anything(),
        createdAt: expect.anything()
      },
      {
        whoisdoinguserid: 1,
        isfinished: false,
        deadlinedate: null,
        finisheddate: null,
        doneuserid: null,
        id: 2,
        name: "taskName",
        comment: "taskComment",
        groupid: 1,
        updatedAt: expect.anything(),
        createdAt: expect.anything()
      },
      {
        whoisdoinguserid: 2,
        isfinished: false,
        deadlinedate: "2020-02-03T04:05:06.078Z",
        finisheddate: null,
        doneuserid: null,
        id: 3,
        name: "taskName",
        comment: "taskComment",
        groupid: 1,
        updatedAt: expect.anything(),
        createdAt: expect.anything()
      } /* ,
      {
        whoisdoinguserid: 2,
        isfinished: false,
        deadlinedate: "2020-02-03T04:05:06.078Z",
        finisheddate: null,
        id: 4,
        name: "taskName",
        comment: "taskComment",
        groupid: 1,
        updatedAt: expect.anything(),
        createdAt: expect.anything()
      } */
    ]);
  });

  it("o GET    /authed/tasks/1", async () => {
    const res = await req
      .get("/api/v1/authed/tasks/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      whoisdoinguserid: null,
      isfinished: false,
      deadlinedate: null,
      finisheddate: null,
      doneuserid: null,
      id: 1,
      name: "taskName",
      comment: null,
      groupid: 1,
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });

  it("x PUT    /authed/tasks/100   not exist", async () => {
    const reqBody = {
      name: "newTaskName",
      comment: "taskComment"
    };
    const res = await req
      .put("/api/v1/authed/tasks/100")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(404);
    expect(res.body.errorCode).toEqual(1617);
  });

  it("o PUT    /authed/tasks/1   change name", async () => {
    const reqBody = {
      name: "newTaskName"
    };
    const res = await req
      .put("/api/v1/authed/tasks/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      whoisdoinguserid: null,
      isfinished: false,
      deadlinedate: null,
      finisheddate: null,
      doneuserid: null,
      id: 1,
      name: "newTaskName",
      comment: null,
      groupid: 1,
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });

  it("o PUT    /authed/tasks/1   change comment,isfinished", async () => {
    const reqBody = {
      comment: "newTaskComment",
      isfinished: true
    };
    const res = await req
      .put("/api/v1/authed/tasks/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      whoisdoinguserid: null,
      isfinished: true,
      deadlinedate: null,
      finisheddate: expect.anything(),
      doneuserid: 1,
      id: 1,
      name: "newTaskName",
      comment: "newTaskComment",
      groupid: 1,
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });

  it("x PUT    /authed/tasks/1   whoisdoinguserid is not number", async () => {
    const reqBody = {
      whoisdoinguserid: "isNotNumber"
    };
    const res = await req
      .put("/api/v1/authed/tasks/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(1703);
  });

  it("x PUT    /authed/tasks/1   whoisdoinguserid 's user is exist", async () => {
    const reqBody = {
      whoisdoinguserid: 100
    };
    const res = await req
      .put("/api/v1/authed/tasks/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(409);
    expect(res.body.errorCode).toBe(1621);
  });

  it("x PUT    /authed/tasks/1   whoisdoinguserid 's user does not belong to any groups", async () => {
    const reqBody = {
      whoisdoinguserid: 4
    };
    const res = await req
      .put("/api/v1/authed/tasks/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(409);
    expect(res.body.errorCode).toBe(1621);
  });

  it("x PUT    /authed/tasks/1  whoisdoinguserid 's user belongs to another group", async () => {
    const reqBody = {
      whoisdoinguserid: 3
    };
    const res = await req
      .put("/api/v1/authed/tasks/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(409);
    expect(res.body.errorCode).toBe(1621);
  });

  it("o PUT    /authed/tasks/1   change whoisdoinguserid", async () => {
    const reqBody = {
      whoisdoinguserid: 1
    };
    const res = await req
      .put("/api/v1/authed/tasks/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      whoisdoinguserid: 1,
      isfinished: true,
      deadlinedate: null,
      finisheddate: expect.anything(),
      doneuserid: 1,
      id: 1,
      name: "newTaskName",
      comment: "newTaskComment",
      groupid: 1,
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });

  it("o PUT    /authed/tasks/1   change whoisdoinguserid to null", async () => {
    const reqBody = {
      whoisdoinguserid: null
    };
    const res = await req
      .put("/api/v1/authed/tasks/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      whoisdoinguserid: null,
      isfinished: true,
      deadlinedate: null,
      finisheddate: expect.anything(),
      doneuserid: 1,
      id: 1,
      name: "newTaskName",
      comment: "newTaskComment",
      groupid: 1,
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });

  it("x PUT    /authed/tasks/1   deadlinedate is not string", async () => {
    const reqBody = {
      deadlinedate: 0
    };
    const res = await req
      .put("/api/v1/authed/tasks/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(1705);
  });

  it("x PUT    /authed/tasks/1   deadlinedate's format is not ISO8601", async () => {
    const reqBody = {
      deadlinedate: "isNotDateString(ISO8601)"
    };
    const res = await req
      .put("/api/v1/authed/tasks/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(1706);
  });

  it("o PUT    /authed/tasks/1  change deadlinedate", async () => {
    const reqBody = {
      deadlinedate: "2021-02-03T04:05:06.078Z"
    };
    const res = await req
      .put("/api/v1/authed/tasks/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      whoisdoinguserid: null,
      isfinished: true,
      deadlinedate: "2021-02-03T04:05:06.078Z",
      finisheddate: expect.anything(),
      doneuserid: 1,
      id: 1,
      name: "newTaskName",
      comment: "newTaskComment",
      groupid: 1,
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });

  it("o PUT    /authed/tasks/1   change deadlinedate to null", async () => {
    const reqBody = {
      deadlinedate: null
    };
    const res = await req
      .put("/api/v1/authed/tasks/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      whoisdoinguserid: null,
      isfinished: true,
      deadlinedate: null,
      finisheddate: expect.anything(),
      doneuserid: 1,
      id: 1,
      name: "newTaskName",
      comment: "newTaskComment",
      groupid: 1,
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });

  it("o POST   /authed/tasks?auto=true", async () => {
    const reqBody = {
      name: "taskNameAuto"
    };
    const res = await req
      .post("/api/v1/authed/tasks?auto=true")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      whoisdoinguserid: 2,
      isfinished: false,
      deadlinedate: null,
      finisheddate: null,
      doneuserid: null,
      id: 4,
      name: "taskNameAuto",
      comment: null,
      groupid: 1,
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });

  it("x PUT    /authed/tasks/2   finish task", async () => {
    const reqBody = {
      isfinished: true
    };
    const res = await req
      .put("/api/v1/authed/tasks/2")
      .set("Authorization", `Bearer ${bearerUser2}`)
      .send(reqBody);
    expect(res.status).toBe(200);
  });

  it("o PUT    /authed/tasks/3    finish task", async () => {
    const reqBody = {
      isfinished: true
    };
    const res = await req
      .put("/api/v1/authed/tasks/3")
      .set("Authorization", `Bearer ${bearerUser2}`)
      .send(reqBody);
    expect(res.status).toBe(200);
  });

  it("o POST    /authed/tasks?auto=true", async () => {
    const reqBody = {
      name: "taskNameAuto"
    };
    const res = await req
      .post("/api/v1/authed/tasks?auto=true")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      whoisdoinguserid: 1,
      isfinished: false,
      deadlinedate: null,
      finisheddate: null,
      doneuserid: null,
      id: 5,
      name: "taskNameAuto",
      comment: null,
      groupid: 1,
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });

  it("x DELETE /authed/tasks/1   user3 does not belong to task1's group", async () => {
    const res = await req
      .delete("/api/v1/authed/tasks/1")
      .set("Authorization", `Bearer ${bearerUser3}`)
      .send();
    expect(res.status).toBe(403);
    expect(res.body.errorCode).toBe(1622);
  });

  it("x DELETE /authed/tasks/1   user4 does no belong to task1's group", async () => {
    const res = await req
      .delete("/api/v1/authed/tasks/1")
      .set("Authorization", `Bearer ${bearerUser4}`)
      .send();
    expect(res.status).toBe(403);
    expect(res.body.errorCode).toBe(1622);
  });

  it("x DELETE /authed/tasks/100   not exist", async () => {
    const res = await req
      .delete("/api/v1/authed/tasks/100")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(500);
    expect(res.body.errorCode).toBe(1620);
  });

  it("o DELETE /authed/tasks/1", async () => {
    const res = await req
      .delete("/api/v1/authed/tasks/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(204);
  });

  it("x GET    /authed/tasks/1   not exist", async () => {
    const res = await req
      .get("/api/v1/authed/tasks/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(404);
    expect(res.body.errorCode).toBe(1610);
  });
});

describe("/authed/taskgenerators", () => {
  it("x POST   /authed/taskgenerators   a lack of name", async () => {
    const reqBody = {
      comment: "taskgenerator's comment",
      interval: "oneday",
      firstgeneratedate: "2020-02-03T04:00:00.000Z",
      firstdeadlinedate: "2020-02-09T04:00:00.000Z"
    };
    const res = await req
      .post("/api/v1/authed/taskgenerators")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(9999);
  });

  it("x POST   /authed/taskgenerators   a lack of interval", async () => {
    const reqBody = {
      name: "task generator name",
      comment: "taskgenerator's comment",
      firstgeneratedate: "2020-02-03T04:00:00.000Z",
      firstdeadlinedate: "2020-02-09T04:00:00.000Z"
    };
    const res = await req
      .post("/api/v1/authed/taskgenerators")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(9999);
  });

  it("x POST   /authed/taskgenerators   interval is invalid string", async () => {
    const reqBody = {
      name: "task generator name",
      comment: "taskgenerator's comment",
      interval: "invalidstring",
      firstgeneratedate: "2020-02-03T04:00:00.000Z",
      firstdeadlinedate: "2020-02-09T04:00:00.000Z"
    };
    const res = await req
      .post("/api/v1/authed/taskgenerators")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(9999);
  });

  it("x POST   /authed/taskgenerators   a lack of firstgeneratedate", async () => {
    const reqBody = {
      name: "task generator name",
      comment: "taskgenerator's comment",
      interval: "oneday",
      firstdeadlinedate: "2020-02-09T04:00:00.000Z"
    };
    const res = await req
      .post("/api/v1/authed/taskgenerators")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(9999);
  });

  it("x POST   /authed/taskgenerators   a lack of firstdeadlinedate", async () => {
    const reqBody = {
      name: "task generator name",
      comment: "taskgenerator's comment",
      interval: "oneday",
      firstgeneratedate: "2020-02-03T04:00:00.000Z"
    };
    const res = await req
      .post("/api/v1/authed/taskgenerators")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(9999);
  });

  it("x POST   /authed/taskgenerators   firstgeneratedate's format is not ISO8601", async () => {
    const reqBody = {
      name: "task generator name",
      comment: "taskgenerator's comment",
      interval: "oneday",
      firstgeneratedate: "invalidstring",
      firstdeadlinedate: "2020-02-09T04:00:00.000Z"
    };
    const res = await req
      .post("/api/v1/authed/taskgenerators")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(9999);
  });

  it("x POST   /authed/taskgenerators   firstdeadlinedate's format is not ISO8601", async () => {
    const reqBody = {
      name: "task generator name",
      comment: "taskgenerator's comment",
      interval: "oneday",
      firstgeneratedate: "2020-02-03T04:00:00.000Z",
      firstdeadlinedate: "invalidstring"
    };
    const res = await req
      .post("/api/v1/authed/taskgenerators")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(9999);
  });

  it("o POST   /authed/taskgenerators   oneday", async () => {
    const reqBody = {
      name: "task generator name",
      comment: "taskgenerator's comment",
      interval: "oneday",
      firstgeneratedate: "2020-02-03T04:00:00.000Z",
      firstdeadlinedate: "2020-02-09T04:00:00.000Z"
    };
    const res = await req
      .post("/api/v1/authed/taskgenerators")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "task generator name",
      comment: "taskgenerator's comment",
      interval: "oneday",
      firstgeneratedate: "2020-02-03T04:00:00.000Z",
      firstdeadlinedate: "2020-02-09T04:00:00.000Z",
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });

  it("o POST   /authed/taskgenerators   oneweek", async () => {
    const reqBody = {
      name: "task generator name",
      comment: "taskgenerator's comment",
      interval: "oneweek",
      firstgeneratedate: "2020-02-03T04:00:00.000Z",
      firstdeadlinedate: "2020-02-09T04:00:00.000Z"
    };
    const res = await req
      .post("/api/v1/authed/taskgenerators")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 2,
      name: "task generator name",
      comment: "taskgenerator's comment",
      interval: "oneweek",
      firstgeneratedate: "2020-02-03T04:00:00.000Z",
      firstdeadlinedate: "2020-02-09T04:00:00.000Z",
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });

  it("o POST   /authed/taskgenerators   onemonth", async () => {
    const reqBody = {
      name: "task generator name",
      comment: "taskgenerator's comment",
      interval: "onemonth",
      firstgeneratedate: "2020-02-03T04:00:00.000Z",
      firstdeadlinedate: "2020-02-09T04:00:00.000Z"
    };
    const res = await req
      .post("/api/v1/authed/taskgenerators")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 3,
      name: "task generator name",
      comment: "taskgenerator's comment",
      interval: "onemonth",
      firstgeneratedate: "2020-02-03T04:00:00.000Z",
      firstdeadlinedate: "2020-02-09T04:00:00.000Z",
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });

  it("o GET    /authed/taskgenerators", async () => {
    const res = await req
      .get("/api/v1/authed/taskgenerators")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        name: "task generator name",
        comment: "taskgenerator's comment",
        interval: "oneday",
        firstgeneratedate: "2020-02-03T04:00:00.000Z",
        firstdeadlinedate: "2020-02-09T04:00:00.000Z",
        updatedAt: expect.anything(),
        createdAt: expect.anything()
      },
      {
        id: 2,
        name: "task generator name",
        comment: "taskgenerator's comment",
        interval: "oneweek",
        firstgeneratedate: "2020-02-03T04:00:00.000Z",
        firstdeadlinedate: "2020-02-09T04:00:00.000Z",
        updatedAt: expect.anything(),
        createdAt: expect.anything()
      },
      {
        id: 3,
        name: "task generator name",
        comment: "taskgenerator's comment",
        interval: "onemonth",
        firstgeneratedate: "2020-02-03T04:00:00.000Z",
        firstdeadlinedate: "2020-02-09T04:00:00.000Z",
        updatedAt: expect.anything(),
        createdAt: expect.anything()
      }
    ]);
  });

  it("o GET    /authed/taskgenerators/1", async () => {
    const res = await req
      .get("/api/v1/authed/taskgenerators/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "task generator name",
      comment: "taskgenerator's comment",
      interval: "oneday",
      firstgeneratedate: "2020-02-03T04:00:00.000Z",
      firstdeadlinedate: "2020-02-09T04:00:00.000Z",
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });

  it("x GET    /authed/taskgenerators/100   not exist", async () => {
    const res = await req
      .get("/api/v1/authed/taskgenerators/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(404);
    expect(res.body.errorCode).toBe(9999);
  });
});
