import { Sequelize, Model, DataTypes } from "sequelize";

class TaskGenerators extends Model {
  /*
| id | 数字 | 定期タスクid |
| name | 文字列 |  タスクの表示名 |
| comment | 文字列またはnull |  タスクの詳細文字列 |
| groupid | 数字 | グループid |
| interval | 文字列 |  タスクの生成間隔(`oneday`または`oneweek`または`onemonth`) |
| firstdeadlinedate | 文字列 | 必須 | 初回タスクの締め切り日時(ISO8601) |
| updatedAt | 文字列 | 当該レコードの最終更新日時 |
| createdAt | 文字列 | 当該レコードの作成日時 |
   */
  public id!: number;

  public groupid!: number;

  public name: string;

  public comment: string;

  public interval: string;

  public firstdeadlinedate: Date;

  public nextgeneratingdate: Date;

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
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        comment: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null
        },
        interval: {
          type: DataTypes.STRING,
          allowNull: false
        },
        firstdeadlinedate: {
          type: DataTypes.DATE,
          allowNull: false
        },
        nextgeneratingdate: {
          type: DataTypes.DATE,
          allowNull: false
        }
      },
      {
        tableName: "taskGenerators",
        underscored: true,
        sequelize
      }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const taskGeneratorsFactory = (sequelize: Sequelize) => {
  TaskGenerators.attach(sequelize);
  return TaskGenerators;
};

export { TaskGenerators, taskGeneratorsFactory };
