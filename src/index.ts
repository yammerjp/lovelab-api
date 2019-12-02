import connectDataBase from "./db";
import app from "./startApp";

const port = process.env.PORT || 3000;

const forceReset =
  process.argv.findIndex(arg => {
    return arg === "--reset";
  }) !== -1;
const isTest =
  process.argv.findIndex(arg => {
    return arg === "--testDB";
  }) !== -1;

connectDataBase(forceReset, isTest).then(() => {
  // eslint-disable-next-line no-console
  console.log("\nSuccess to connect database\n");
  // サーバ起動
  app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`listen on port ${port}`);
});
