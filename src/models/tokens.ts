import { Sequelize, Model, DataTypes } from "sequelize";

class Tokens extends Model {
  public userid!: number;

  public token!: string;

  public deadline!: Date;

  public static attach(sequelize: Sequelize): void {
    this.init(
      {
        userid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id"
          }
        },
        token: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true
        },
        deadline: {
          type: DataTypes.DATE,
          allowNull: false
        }
      },
      {
        tableName: "tokens",
        underscored: true,
        sequelize
      }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const tokensFactory = (sequelize: Sequelize) => {
  Tokens.attach(sequelize);
  return Tokens;
};

export { Tokens, tokensFactory };
