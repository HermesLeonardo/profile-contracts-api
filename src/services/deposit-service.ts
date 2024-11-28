import { Deposit, DepositCreationAttributes } from "../models/deposit-models.js";
import { DepositRepository } from "../repositories/deposit-repository.js";
import { Profile } from "../models/profile-models.js";

export class DepositService {
    private depositRepository: DepositRepository;

    constructor() {
        this.depositRepository = new DepositRepository();
    }

    public async createDeposit(depositData: DepositCreationAttributes): Promise<Deposit> {
        try {
            return await this.depositRepository.create(depositData);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível criar depósito: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar criar o depósito.");
            }
        }
    }

    public async getAllDeposits(): Promise<Deposit[]> {
        try {
            return await this.depositRepository.findAll();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível encontrar depósitos: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar encontrar depósitos.");
            }
        }
    }

    public async getDepositById(id: number): Promise<Deposit | null> {
        try {
            return await this.depositRepository.findById(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível encontrar depósito pelo ID ${id}: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar encontrar o depósito.");
            }
        }
    }

    public async updateDeposit(id: number, updatedData: Partial<DepositCreationAttributes>): Promise<Deposit | null> {
        try {
            return await this.depositRepository.update(id, updatedData);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível atualizar depósito com ID ${id}: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o depósito.");
            }
        }
    }

    public async deleteDeposit(id: number): Promise<void> {
        try {
            await this.depositRepository.delete(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível excluir depósito com ID ${id}: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar excluir o depósito.");
            }
        }
    }

    public async makeDeposit(profileId: number, depositValue: number): Promise<any> {
        try {
            const profile = await Profile.findByPk(profileId);
            if (!profile) {
                throw new Error(`Perfil com ID ${profileId} não encontrado.`);
            }

            const deposit = await Deposit.create({
                clientId: profileId,
                depositValue: depositValue,
                operationDate: new Date(), 
            });

            profile.balance += depositValue;
            await profile.save(); 

            return {
                message: "Depósito realizado com sucesso.",
                deposit,
                updatedProfile: {
                    id: profile.id,
                    balance: profile.balance, 
                },
            };
        } catch (error) {
            throw new Error(`Falha ao realizar o depósito: ${error}`);
        }
    }
}
