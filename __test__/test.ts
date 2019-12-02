import * as supertest from "supertest";
import app from "../src/startApp";
import connectDatabase from "../src/db";

const req = supertest(app);

let bearerUser1 = "";
let bearerUser2 = "";
let bearerUser3 = "";

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
    expect(res.body).toEqual({
      groupid: null,
      picturepath: null,
      id: 1,
      email: "user1",
      name: null
    });
  });

  it("user2 with name", async () => {
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

  it("user3 with name", async () => {
    const reqBody = {
      email: "user3",
      password: "hogehoge"
    };
    const res = await req.post("/api/v1/signup").send(reqBody);
    expect(res.status).toBe(200);
  });

  it("a user only email (will fail)", async () => {
    const reqBody = {
      email: "user3"
    };
    const res = await req.post("/api/v1/signup").send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(1201);
  });

  it("a user only email (will fail)", async () => {
    const reqBody = {
      password: "password"
    };
    const res = await req.post("/api/v1/signup").send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(1201);
  });

  it("a user as same as user1's email (will fail)", async () => {
    const reqBody = {
      email: "user1",
      password: "hoge"
    };
    const res = await req.post("/api/v1/signup").send(reqBody);
    expect(res.status).toBe(409);
    expect(res.body.errorCode).toBe(1202);
  });
});

describe("/login", () => {
  it("user1", async () => {
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
    console.log(`bearer token user1 : ${bearerUser1}`);
  });

  it("user2", async () => {
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
    console.log(`bearer token user2 : ${bearerUser2}`);
  });

  it("user3", async () => {
    const reqBody = {
      email: "user3",
      password: "hogehoge"
    };
    const res = await req.post("/api/v1/login").send(reqBody);
    expect(res.status).toBe(200);
    bearerUser3 = res.body.token;
    console.log(`bearer token user3 : ${bearerUser3}`);
  });

  it("user1 wrong password (will fail)", async () => {
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
  it("GET /groups/1 (no authorization)", async () => {
    const res = await req.get("/api/v1/authed/groups/1").send();
    expect(res.status).toBe(401);
    expect(res.body.errorCode).toBe(1001);
  });
});

describe("/groups", () => {
  it("GET /groups/1 (no resouce)", async () => {
    const res = await req
      .get("/api/v1/authed/groups/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(404);
    expect(res.body.errorCode).toBe(1302);
  });

  it("POST /groups , create group (no-name, wrong)", async () => {
    const reqBody = {};
    const res = await req
      .post("/api/v1/authed/groups")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(1304);
  });

  it("POST /groups , create group", async () => {
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

  it("GET /groups/1", async () => {
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

describe("/invitations", () => {
  it("GET /invitations (no-invitations)", async () => {
    const res = await req
      .get("/api/v1/authed/invitations")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });

  it("POST /invitations (wrong, user1 -> user1)", async () => {
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

  it("POST /invitations (wrong, user2 -> user1)", async () => {
    const reqBody = {
      inviteeuserid: 1,
      message: "invitation message"
    };
    const res = await req
      .post("/api/v1/authed/invitations")
      .set("Authorization", `Bearer ${bearerUser2}`)
      .send(reqBody);
    expect(res.status).toBe(409);
    expect(res.body.errorCode).toBe(1405);
  });

  it("POST /invitations (user1 -> user2)", async () => {
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

  it("POST /invitations (user1 -> user2)", async () => {
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

  it("GET /invitations (2 invitations)", async () => {
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

  it("DELETE /invitations (reject)", async () => {
    const res = await req
      .delete("/api/v1/authed/invitations/1")
      .set("Authorization", `Bearer ${bearerUser2}`)
      .send();
    expect(res.status).toBe(204);
  });

  it("GET /users/2 (not joined any groups", async () => {
    const res = await req
      .get("/api/v1/authed/users/2")
      .set("Authorization", `Bearer ${bearerUser2}`)
      .send();
    expect(res.body.groupid).toBe(null);
  });

  it("DELETE /invitations (accept)", async () => {
    const res = await req
      .delete("/api/v1/authed/invitations/2?agreement=true")
      .set("Authorization", `Bearer ${bearerUser2}`)
      .send();
    expect(res.status).toBe(204);
  });

  it("GET /users/2 (joined group 1", async () => {
    const res = await req
      .get("/api/v1/authed/users/2")
      .set("Authorization", `Bearer ${bearerUser2}`)
      .send();
    expect(res.body.groupid).toBe(1);
  });

  it("GET /invitations (no-invitations)", async () => {
    const res = await req
      .get("/api/v1/authed/invitations")
      .set("Authorization", `Bearer ${bearerUser2}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });
});

describe("/users", () => {
  it("GET /authed/users?groupid=1", async () => {
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
        name: null
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

  it("GET /authed/users?mygroup=true", async () => {
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
        name: null
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

  it("GET /authed/users?groupid=2", async () => {
    const res = await req
      .get("/api/v1/authed/users?groupid=2")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });
  it("GET /authed/users", async () => {
    const res = await req
      .get("/api/v1/authed/users")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(1501);
  });
  it("GET /authed/users/1", async () => {
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
      name: null
    });
  });
  it("GET /authed/users/4", async () => {
    const res = await req
      .get("/api/v1/authed/users/4")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(404);
    expect(res.body.errorCode).toBe(1505);
  });
});

describe("/tasks", () => {
  it("GET /authed/tasks", async () => {
    const res = await req
      .get("/api/v1/authed/tasks")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("GET /authed/tasks/1", async () => {
    const res = await req
      .get("/api/v1/authed/tasks/1")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send();
    expect(res.status).toBe(404);
    expect(res.body.errorCode).toBe(1610);
  });

  it("POST /authed/tasks", async () => {
    const reqBody = {
      name: "taskName"
    };
    const res = await req
      .post("/api/v1/authed/tasks")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(400);
    expect(res.body.errorCode).toBe(1605);
  });

  it("POST /authed/tasks", async () => {
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

  it("POST /authed/tasks", async () => {
    const reqBody = {
      name: "taskName",
      comment: "taskComment"
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
      id: 1,
      name: "taskName",
      comment: "taskComment",
      groupid: 1,
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });

  it("POST /authed/tasks (wrong, user3, not belonged to any group)", async () => {
    const reqBody = {
      name: "taskName",
      comment: "taskComment"
    };
    const res = await req
      .post("/api/v1/authed/tasks")
      .set("Authorization", `Bearer ${bearerUser3}`)
      .send(reqBody);
    expect(res.status).toBe(500);
    expect(res.body.errorCode).toEqual(1607);
  });

  it("GET /authed/tasks", async () => {
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
        id: 1,
        name: "taskName",
        comment: "taskComment",
        groupid: 1,
        updatedAt: expect.anything(),
        createdAt: expect.anything()
      }
    ]);
  });

  it("GET /authed/tasks/1", async () => {
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
      id: 1,
      name: "taskName",
      comment: "taskComment",
      groupid: 1,
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });

  it("PUT /authed/tasks/1", async () => {
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
      id: 1,
      name: "newTaskName",
      comment: "taskComment",
      groupid: 1,
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });

  it("PUT /authed/tasks/2 (wrong, not found)", async () => {
    const reqBody = {
      name: "newTaskName",
      comment: "taskComment"
    };
    const res = await req
      .put("/api/v1/authed/tasks/2")
      .set("Authorization", `Bearer ${bearerUser1}`)
      .send(reqBody);
    expect(res.status).toBe(404);
    expect(res.body.errorCode).toEqual(1617);
  });

  it("PUT /authed/tasks/1", async () => {
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
      finisheddate: null,
      id: 1,
      name: "newTaskName",
      comment: "newTaskComment",
      groupid: 1,
      updatedAt: expect.anything(),
      createdAt: expect.anything()
    });
  });
});
