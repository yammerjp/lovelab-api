import connectDataBase from "./db";
import app from "./startApp";

const port = process.env.PORT || 3000;

const forceReset =
  process.argv.findIndex(arg => {
    return arg === "--reset";
  }) !== -1;

connectDataBase(forceReset).then(() => {
  // eslint-disable-next-line no-console
  console.log("\nSuccess to connect database\n");
  // サーバ起動
  app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`listen on port ${port} in docker-network`);
  // eslint-disable-next-line no-console
  console.log(`listen on port 80 or 80,443 in local environment`);
});
