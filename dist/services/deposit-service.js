var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Deposit } from "../models/deposit-models.js";
import { DepositRepository } from "../repositories/deposit-repository.js";
import { Profile } from "../models/profile-models.js";
export class DepositService {
    constructor() {
        this.depositRepository = new DepositRepository();
    }
    createDeposit(depositData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.depositRepository.create(depositData);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível criar depósito: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar criar o depósito.");
                }
            }
        });
    }
    getAllDeposits() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.depositRepository.findAll();
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível encontrar depósitos: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar encontrar depósitos.");
                }
            }
        });
    }
    getDepositById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.depositRepository.findById(id);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível encontrar depósito pelo ID ${id}: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar encontrar o depósito.");
                }
            }
        });
    }
    updateDeposit(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.depositRepository.update(id, updatedData);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível atualizar depósito com ID ${id}: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o depósito.");
                }
            }
        });
    }
    deleteDeposit(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.depositRepository.delete(id);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível excluir depósito com ID ${id}: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar excluir o depósito.");
                }
            }
        });
    }
    makeDeposit(profileId, depositValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield Profile.findByPk(profileId);
                if (!profile) {
                    throw new Error(`Perfil com ID ${profileId} não encontrado.`);
                }
                const deposit = yield Deposit.create({
                    clientId: profileId,
                    depositValue: depositValue,
                    operationDate: new Date(),
                });
                profile.balance += depositValue;
                yield profile.save();
                return {
                    message: "Depósito realizado com sucesso.",
                    deposit,
                    updatedProfile: {
                        id: profile.id,
                        balance: profile.balance,
                    },
                };
            }
            catch (error) {
                throw new Error(`Falha ao realizar o depósito: ${error}`);
            }
        });
    }
}
