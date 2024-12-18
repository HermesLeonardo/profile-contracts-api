import { Job, JobCreationAttributes } from "../models/job-models.js";
import { JobRepository } from "../repositories/job-repository.js";
import { Payment } from "../models/Payment-models.js"
import { Op } from "sequelize";


export class JobService {
    private jobRepository: JobRepository;

    constructor() {
        this.jobRepository = new JobRepository();
    }

    public async createJob(jobData: JobCreationAttributes): Promise<Job> {
        try {
            return await this.jobRepository.create(jobData);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível criar trabalho: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar criar o trabalho.");
            }
        }
    }

    public async getAllJobs(): Promise<Job[]> {
        try {
            return await this.jobRepository.findAll();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível encontrar trabalhos: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar encontrar trabalhos.");
            }
        }
    }

    public async getJobById(id: number): Promise<Job | null> {
        try {
            return await this.jobRepository.findById(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível encontrar trabalho pelo ID ${id}: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar encontrar o trabalho.");
            }
        }
    }

    public async updateJob(id: number, updatedData: Partial<JobCreationAttributes>): Promise<Job | null> {
        try {
            return await this.jobRepository.update(id, updatedData);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível atualizar trabalho com ID ${id}: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o trabalho.");
            }
        }
    }

    public async deleteJob(id: number): Promise<void> {
        try {
            await this.jobRepository.delete(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível excluir trabalho com ID ${id}: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar excluir o trabalho.");
            }
        }
    }

     // Novo método para listar Jobs não pagos integralmente
     public async getUnpaidJobs(contractId: number): Promise<Job[]> {
        try {
            // Usando o método do repositório para buscar jobs não pagos
            const unpaidJobs = await this.jobRepository.findAllUnpaidJobsByContract(contractId);
            return unpaidJobs;
        } catch (error) {
            throw new Error(`Falha ao recuperar jobs não pagos para o contrato ${contractId}: ${error}`);
        }
    }
}
