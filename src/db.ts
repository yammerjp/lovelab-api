import { Sequelize } from "sequelize";
import configfunc from "./config/config";
import { Users, usersFactory } from "./models/users";
import { Invitations, invitationsFactory } from "./models/invitations";
import { Groups, groupsFactory } from "./models/groups";
import { Tasks, tasksFactory } from "./models/tasks";
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
  groupsFactory(sequelize);
  usersFactory(sequelize);
  invitationsFactory(sequelize);
  tasksFactory(sequelize);

  sequelize
    .authenticate()
    .then(() => {
      // eslint-disable-next-line no-console
      console.log("authenticate().then ...");
    })
    .then(() => {
      Users.sync({
        /* force: true */
      });
      Invitations.sync({});
      Groups.sync({});
      Tasks.sync({});
    })
    .then(() => {})
    .catch(() => {
      // eslint-disable-next-line no-console
      console.log("authenticate().catch");
    });
};

export default connectDataBase;
