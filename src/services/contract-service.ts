import { Contract, ContractCreationAttributes } from "../models/contract-models.js";
import { Profile } from "../models/profile-models.js";
import { ContractRepository } from "../repositories/contract-repository.js";
import { Op } from "sequelize";

export class ContractService {
    private contractRepository: ContractRepository;

    constructor() {
        this.contractRepository = new ContractRepository();
    }

    public async createContract(contractData: ContractCreationAttributes): Promise<Contract> {
        try {
            return await this.contractRepository.create(contractData);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível criar contrato: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar criar o contrato.");
            }
        }
    }

    public async getAllContracts(): Promise<Contract[]> {
        try {
            return await this.contractRepository.findAll();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível encontrar contratos: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar encontrar contratos.");
            }
        }
    }

    public async getContractById(id: number): Promise<Contract | null> {
        try {
            return await this.contractRepository.findById(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível encontrar contrato pelo ID ${id}: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar encontrar o contrato.");
            }
        }
    }

    public async updateContract(id: number, updatedData: Partial<ContractCreationAttributes>): Promise<Contract | null> {
        try {
            return await this.contractRepository.update(id, updatedData);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível atualizar contrato com ID ${id}: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o contrato.");
            }
        }
    }

    public async deleteContract(id: number): Promise<void> {
        try {
            await this.contractRepository.delete(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível excluir contrato com ID ${id}: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar excluir o contrato.");
            }
        }
    }

    // Método para buscar contratos de um perfil
    public async getContractsByProfile(profileId: number): Promise<any> {
        try {
            const profile = await Profile.findByPk(profileId, {
                attributes: ["id", "firstName"] 
            });
    
            if (!profile) {
                throw new Error(`Profile com ID ${profileId} não encontrado.`);
            }
    
            const contracts = await Contract.findAll({
                where: {
                    [Op.or]: [
                        { clientId: profileId },    
                        { contractorId: profileId } 
                    ]
                },
                attributes: ["id", "terms", "clientId", "contractorId", "operationDate", "status"] 
            });
    
            return {
                profile: {
                    id: profile.id,
                    firstName: profile.firstName
                },
                contracts
            };
        } catch (error) {
            throw new Error(`Falha ao recuperar contratos para o Profile de ID ${profileId}: ${error}`);
        }
    }
    
    
}
