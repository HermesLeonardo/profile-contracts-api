var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { JobRepository } from "../repositories/job-repository.js";
export class JobService {
    constructor() {
        this.jobRepository = new JobRepository();
    }
    createJob(jobData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.jobRepository.create(jobData);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível criar trabalho: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar criar o trabalho.");
                }
            }
        });
    }
    getAllJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.jobRepository.findAll();
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível encontrar trabalhos: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar encontrar trabalhos.");
                }
            }
        });
    }
    getJobById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.jobRepository.findById(id);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível encontrar trabalho pelo ID ${id}: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar encontrar o trabalho.");
                }
            }
        });
    }
    updateJob(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.jobRepository.update(id, updatedData);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível atualizar trabalho com ID ${id}: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o trabalho.");
                }
            }
        });
    }
    deleteJob(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.jobRepository.delete(id);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível excluir trabalho com ID ${id}: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar excluir o trabalho.");
                }
            }
        });
    }
    // Novo método para listar Jobs não pagos integralmente
    getUnpaidJobs(contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Usando o método do repositório para buscar jobs não pagos
                const unpaidJobs = yield this.jobRepository.findAllUnpaidJobsByContract(contractId);
                return unpaidJobs;
            }
            catch (error) {
                throw new Error(`Falha ao recuperar jobs não pagos para o contrato ${contractId}: ${error}`);
            }
        });
    }
}
