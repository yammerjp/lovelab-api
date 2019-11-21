import { Sequelize, Model, DataTypes } from "sequelize";

class Users extends Model {
  public id!: number;

  public email!: string;

  public passwordhash!: string;

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
          defaultValue: ""
        },
        passwordhash: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: ""
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null
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

const usersFactory = (sequelize: Sequelize) => {
  Users.attach(sequelize);
  return Users;
};

export { Users, usersFactory };
