import { Sequelize } from "sequelize";
import configfunc from "./config/config";
import { Users, usersFactory } from "./models/users";
import { Invitations, invitationsFactory } from "./models/invitations";
import { Groups, groupsFactory } from "./models/groups";
import { Tasks, tasksFactory } from "./models/tasks";
import { Tokens, tokensFactory } from "./models/tokens";
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
  tokensFactory(sequelize);

  sequelize
    .authenticate()
    .then(() => {
      return Groups.sync({});
    })
    .then(() => {
      return Users.sync({
        /* force: true */
      });
    })
    .then(() => {
      return Invitations.sync({});
    })
    .then(() => {
      return Tasks.sync({});
    })
    .then(() => {
      return Tokens.sync({});
    })
    .catch(() => {
      // eslint-disable-next-line no-console
      console.log("create or connect database is failed.");
      process.exit(1);
    });
};

export default connectDataBase;
