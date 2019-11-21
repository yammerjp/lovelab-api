import { Sequelize, Model, DataTypes } from "sequelize";

class Groups extends Model {
  public id!: number;

  public name: string;

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
        name: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null
        },
        picturepath: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null
        }
      },
      {
        tableName: "groups",
        underscored: true,
        sequelize
      }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const groupsFactory = (sequelize: Sequelize) => {
  Groups.attach(sequelize);
  return Groups;
};

export { Groups, groupsFactory };
