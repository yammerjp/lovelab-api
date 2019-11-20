```sql
CREATE TABLE users (
  id    varchar(255) primary key,
  passwordhash    varchar(255) NOT NULL,
  updatedtimestamp    timestamp with time zone NOT NULL
);
INSERT INTO users VALUES('first_user','hashed_password','2004-10-19 10:23:54+09');
INSERT INTO users VALUES('second_user','hashed_password','2005-10-19 10:23:54+09');
```

```sql
CREATE TABLE groups (
  id             SERIAL PRIMARY KEY,
  created_at     DATE NOT NULL,
  updated_at     DATE NOT NULL,
  name           TEXT DEFAULT '',
  picturepath    TEXT DEFAULT ''
); 
CREATE TABLE users (
  id             SERIAL PRIMARY KEY,
  email          TEXT NOT NULL UNIQUE,
  passwordhash   TEXT NOT NULL,
  created_at     DATE NOT NULL,
  updated_at     DATE NOT NULL,
  name           TEXT DEFAULT '',
  picturepath    TEXT DEFAULT '',
  groupid        BIGINT REFERENCES groups
);
CREATE TABLE invitations (
  id             SERIAL PRIMARY KEY,
  created_at     DATE NOT NULL,
  updated_at     DATE NOT NULL,
  groupid        BIGINT NOT NULL REFERENCES groups,
  inviteruserid  BIGINT NOT NULL REFERENCES users,
  inviteeuserid  BIGINT NOT NULL REFERENCES users
); 
CREATE TABLE tasks (
  id             SERIAL PRIMARY KEY,
  created_at     DATE NOT NULL,
  updated_at     DATE NOT NULL,
  groupid        INTEGER NOT NULL REFERENCES groups,
  name           TEXT DEFAULT '',
  isfinished     BOOLEAN NOT NULL,
  comment        TEXT DEFAULT '',
  deadlinedate   DATE,
  finisheddate   DATE,
  whoisdoinguserid BIGINT REFERENCES users
); 


```
