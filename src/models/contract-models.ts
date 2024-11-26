import { Model, DataTypes, Sequelize, Optional } from "sequelize";

export interface ContractAttributes {
  id: number;
  terms: string;
  clientId: number;
  contractorId: number;
  operationDate: Date;
  status: string;
}

export interface ContractCreationAttributes extends Optional<ContractAttributes, "id"> {}

export class Contract extends Model<ContractAttributes, ContractCreationAttributes> implements ContractAttributes {
  public id!: number;
  public terms!: string;
  public clientId!: number;
  public contractorId!: number;
  public operationDate!: Date;
  public status!: string;
}

export function initializeContract(sequelize: Sequelize) {
  Contract.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      terms: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contractorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      operationDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(11),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Contract",
      tableName: "contract",
      timestamps: false,
      freezeTableName: true,
    }
  );
}
