import { Sequelize, Model, DataTypes } from "sequelize";
import { Groups } from "./groups";

class Invitations extends Model {
  public id!: number;

  public groupid!: number;

  public inviteruserid!: number;

  public inviteeuserid!: number;

  public message: string;

  public createdAt!: Date;

  public updatedAt!: Date;

  public GroupId: number;

  public GroupName: string;

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
  Invitations.belongsTo(Groups);
  return Invitations;
};

export { Invitations, invitationsFactory };
