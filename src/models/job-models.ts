import { Model, DataTypes, Sequelize, Optional, Association } from "sequelize";
import { Payment } from "./Payment-models.js";

export interface JobAttributes {
  id: number;
  contractId: number;
  description: string;
  operationDate: Date;
  paymentDate: Date | null;
  price: number;
  paid: boolean;
}

export interface JobCreationAttributes extends Optional<JobAttributes, "id"> {}

export class Job extends Model<JobAttributes, JobCreationAttributes> implements JobAttributes {
  public id!: number;
  public contractId!: number;
  public description!: string;
  public operationDate!: Date;
  public paymentDate!: Date | null;
  public price!: number;
  public paid!: boolean;

  // Associação com pagamentos
  public payments?: Payment[];

  public static associations: {
    payments: Association<Job, Payment>;
  };
}

export function initializeJob(sequelize: Sequelize) {
  Job.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      contractId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      operationDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      paymentDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Job",
      tableName: "job",
      timestamps: false,
      freezeTableName: true,
    }
  );
}
