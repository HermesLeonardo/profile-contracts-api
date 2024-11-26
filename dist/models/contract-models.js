import { Model, DataTypes } from "sequelize";
// Classe do modelo Contract
export class Contract extends Model {
    // Método estático para inicializar associações
    static associate(models) {
        Contract.belongsTo(models.Profile, { foreignKey: "clientId", as: "client" });
        Contract.belongsTo(models.Profile, { foreignKey: "contractorId", as: "contractor" });
    }
}
// Função de inicialização do modelo Contract
export function initializeContract(sequelize) {
    Contract.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        terms: {
            type: DataTypes.STRING(45), // Limite de 45 caracteres para os termos
            allowNull: false,
        },
        clientId: {
            type: DataTypes.INTEGER, // Relacionado ao cliente
            allowNull: false,
        },
        contractorId: {
            type: DataTypes.INTEGER, // Relacionado ao contratante
            allowNull: false,
        },
        operationDate: {
            type: DataTypes.DATE, // Data da operação
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(11), // Status (ativo, finalizado, etc.)
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Contract",
        tableName: "contract",
        timestamps: false, // Não usar timestamps automáticos
        freezeTableName: true, // Impede o Sequelize de pluralizar o nome da tabela
    });
}
