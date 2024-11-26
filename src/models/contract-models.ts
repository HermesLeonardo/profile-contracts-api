import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import { Profile } from "./profile-models.js"; // Importando para futuras associações, se necessário

// Definição dos atributos da tabela Contract
export interface ContractAttributes {
  id: number;
  terms: string;
  clientId: number; // ID do cliente
  contractorId: number; // ID do contratante
  operationDate: Date; // Data da operação
  status: string;
}

// Atributos para criação (ID será gerado automaticamente)
export interface ContractCreationAttributes extends Optional<ContractAttributes, "id"> {}

// Classe do modelo Contract
export class Contract
  extends Model<ContractAttributes, ContractCreationAttributes>
  implements ContractAttributes
{
  public id!: number;
  public terms!: string;
  public clientId!: number;
  public contractorId!: number;
  public operationDate!: Date;
  public status!: string;

  // Timestamp padrão do Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Método estático para inicializar associações
  public static associate(models: any) {
    Contract.belongsTo(models.Profile, { foreignKey: "clientId", as: "client" });
    Contract.belongsTo(models.Profile, { foreignKey: "contractorId", as: "contractor" });
  }
}

// Função de inicialização do modelo Contract
export function initializeContract(sequelize: Sequelize) {
  Contract.init(
    {
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
    },
    {
      sequelize,
      modelName: "Contract",
      tableName: "contract",
      timestamps: false, // Não usar timestamps automáticos
      freezeTableName: true, // Impede o Sequelize de pluralizar o nome da tabela
    }
  );
}
