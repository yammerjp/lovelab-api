import { Sequelize } from "sequelize";
import configfunc from "./config/config";
import { Users, usersFactory } from "./models/users";
import { Invitations, invitationsFactory } from "./models/invitations";
import { Groups, groupsFactory } from "./models/groups";
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
  usersFactory(sequelize);
  invitationsFactory(sequelize);
  groupsFactory(sequelize);

  sequelize
    .authenticate()
    .then(() => {
      console.log("authenticate().then ...");
    })
    .then(() => {
      Users.sync({
        /* force: true */
      });
      Invitations.sync({});
      Groups.sync({});
    })
    .then(() => {})
    .catch(() => {
      console.log("authenticate().catch");
    });
};

export default connectDataBase;
