import { Model, DataTypes } from "sequelize";
export class Job extends Model {
}
// Inicialização do modelo
export function initializeJob(sequelize) {
    Job.init({
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
            allowNull: true, // Permite null para paymentDate
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
    }, {
        sequelize,
        modelName: "Job",
        tableName: "job",
        timestamps: false,
        freezeTableName: true,
    });
}
