import { Sequelize, Model, DataTypes } from "sequelize";

class Tasks extends Model {
  public id!: number;

  public groupid!: number;

  public name: string;

  public isfinished: boolean;

  public comment: string;

  public deadlinedate: Date;

  public finisheddate: Date;

  public doneuserid: number;

  public whoisdoinguserid: number;

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
        whoisdoinguserid: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null,
          references: {
            model: "users",
            key: "id"
          }
        },
        isfinished: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null
        },
        comment: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null
        },
        deadlinedate: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null
        },
        finisheddate: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null
        },
        doneuserid: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null,
          references: {
            model: "users",
            key: "id"
          }
        }
      },
      {
        tableName: "tasks",
        underscored: true,
        sequelize
      }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const tasksFactory = (sequelize: Sequelize) => {
  Tasks.attach(sequelize);
  return Tasks;
};

export { Tasks, tasksFactory };
