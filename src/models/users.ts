import { Sequelize, Model, DataTypes } from "sequelize";

class Users extends Model {
  public id!: number;

  public email!: string;

  public passwordhash!: string;

  public salt: string;

  public name: string;

  public groupid: number;

  public picturepath: string;

  public static attach(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        passwordhash: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: ""
        },
        salt: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "ISSALT"
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "Anonymous"
        },
        groupid: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null,
          references: {
            model: "groups",
            key: "id"
          }
        },
        picturepath: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null
        }
      },
      {
        tableName: "users",
        underscored: true,
        sequelize
      }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const usersFactory = (sequelize: Sequelize) => {
  Users.attach(sequelize);
  return Users;
};

export { Users, usersFactory };
