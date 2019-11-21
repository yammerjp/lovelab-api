import { Sequelize, Model, DataTypes } from "sequelize";

class Invitations extends Model {
  public id!: number;

  public groupid!: number;

  public inviteruserid!: number;

  public inviteeuserid!: number;

  public message: string;

  public static attach(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        groupid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "groups",
            key: "id"
          }
        },
        inviteruserid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id"
          }
        },
        inviteeuserid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id"
          }
        },
        message: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null
        }
      },
      {
        tableName: "invitations",
        underscored: true,
        sequelize
      }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const invitationsFactory = (sequelize: Sequelize) => {
  Invitations.attach(sequelize);
  return Invitations;
};

export { Invitations, invitationsFactory };
