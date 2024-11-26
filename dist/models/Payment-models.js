import { Model, DataTypes } from "sequelize";
export class Payment extends Model {
}
export function initializePayment(sequelize) {
    Payment.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        operationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        paymentValue: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Payment",
        tableName: "payment",
        timestamps: false,
        freezeTableName: true,
    });
}
