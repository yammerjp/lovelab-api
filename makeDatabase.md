```sql
CREATE TABLE users (
  id    varchar(255) primary key,
  passwordhash    varchar(255) NOT NULL,
  updatedtimestamp    timestamp with time zone NOT NULL
);
INSERT INTO users VALUES('first_user','hashed_password','2004-10-19 10:23:54+09');
INSERT INTO users VALUES('second_user','hashed_password','2005-10-19 10:23:54+09');
```

