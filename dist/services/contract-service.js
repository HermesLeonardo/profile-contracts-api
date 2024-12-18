var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Contract } from "../models/contract-models.js";
import { Profile } from "../models/profile-models.js";
import { ContractRepository } from "../repositories/contract-repository.js";
import { Op } from "sequelize";
export class ContractService {
    constructor() {
        this.contractRepository = new ContractRepository();
    }
    createContract(contractData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.contractRepository.create(contractData);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível criar contrato: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar criar o contrato.");
                }
            }
        });
    }
    getAllContracts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.contractRepository.findAll();
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível encontrar contratos: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar encontrar contratos.");
                }
            }
        });
    }
    getContractById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.contractRepository.findById(id);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível encontrar contrato pelo ID ${id}: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar encontrar o contrato.");
                }
            }
        });
    }
    updateContract(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.contractRepository.update(id, updatedData);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível atualizar contrato com ID ${id}: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o contrato.");
                }
            }
        });
    }
    deleteContract(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.contractRepository.delete(id);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível excluir contrato com ID ${id}: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar excluir o contrato.");
                }
            }
        });
    }
    // Método para buscar contratos de um perfil
    getContractsByProfile(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield Profile.findByPk(profileId, {
                    attributes: ["id", "firstName"]
                });
                if (!profile) {
                    throw new Error(`Profile com ID ${profileId} não encontrado.`);
                }
                const contracts = yield Contract.findAll({
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
            }
            catch (error) {
                throw new Error(`Falha ao recuperar contratos para o Profile de ID ${profileId}: ${error}`);
            }
        });
    }
}
