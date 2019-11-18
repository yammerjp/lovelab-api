import * as express from "express";
import * as bodyParser from "body-parser";

import routerV1 from "./routes/v1/index";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use("/api/v1/", routerV1);

// サーバ起動
app.listen(port);
// eslint-disable-next-line no-console
console.log(`listen on port ${port}`);