import { Model, DataTypes } from "sequelize";
export class Contract extends Model {
}
export function initializeContract(sequelize) {
    Contract.init({
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
    }, {
        sequelize,
        modelName: "Contract",
        tableName: "contract",
        timestamps: false,
        freezeTableName: true,
    });
}
