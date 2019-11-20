import { Sequelize } from "sequelize";
import configfunc from "./config/config";
import { Users, factory } from "./models/users";
// database接続

const connectDataBase = (): void => {
  const config = configfunc();
  const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
      port: config.port
    }
  );
  factory(sequelize);

  sequelize
    .authenticate()
    .then(() => {
      console.log("authenticate().then ...");
    })
    .then(() => {
      Users.sync({
        /* force: true */
      });
    })
    .catch(() => {
      console.log("authenticate().catch");
    });
};

export default connectDataBase;
