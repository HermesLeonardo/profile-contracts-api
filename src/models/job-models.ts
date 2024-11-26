import { Model, DataTypes, Sequelize, Optional } from "sequelize";

// Interfaces de atributos do Job
export interface JobAttributes {
  id: number;
  contractId: number;
  description: string;
  operationDate: Date;
  paymentDate: Date | null; // Permite que paymentDate seja null
  price: number;
  paid: boolean;
}

export interface JobCreationAttributes extends Optional<JobAttributes, "id"> {}

export class Job extends Model<JobAttributes, JobCreationAttributes> implements JobAttributes {
  public id!: number;
  public contractId!: number;
  public description!: string;
  public operationDate!: Date;
  public paymentDate!: Date | null; // Permite que paymentDate seja null
  public price!: number;
  public paid!: boolean;
}

// Inicialização do modelo
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
        allowNull: true,  // Permite null para paymentDate
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
