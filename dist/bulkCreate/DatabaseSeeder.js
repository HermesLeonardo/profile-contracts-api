var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Profile } from "../models/profile-models.js";
import { Contract } from "../models/contract-models.js";
import { Job } from "../models/job-models.js";
import { Deposit } from "../models/deposit-models.js";
import { Payment } from "../models/Payment-models.js";
export class DatabaseSeeder {
    // Método para popular a tabela Profile
    createProfiles() {
        return __awaiter(this, void 0, void 0, function* () {
            const profiles = [
                { "firstName": "Alice", "lastName": "Silva", "profession": "Engenheira", "balance": 5000, "type": "client" },
                { "firstName": "Bob", "lastName": "Santos", "profession": "Desenvolvedor", "balance": 3000, "type": "contractor" },
                { "firstName": "Carlos", "lastName": "Pereira", "profession": "Designer", "balance": 4000, "type": "contractor" },
                { "firstName": "Daniela", "lastName": "Costa", "profession": "Gerente", "balance": 5500, "type": "client" },
                { "firstName": "Eduardo", "lastName": "Melo", "profession": "Arquiteto", "balance": 2500, "type": "contractor" },
                { "firstName": "Fernanda", "lastName": "Almeida", "profession": "Consultora", "balance": 7000, "type": "client" },
                { "firstName": "Gustavo", "lastName": "Ribeiro", "profession": "Analista", "balance": 3200, "type": "contractor" },
                { "firstName": "Helena", "lastName": "Souza", "profession": "Engenheira Civil", "balance": 4800, "type": "client" },
                { "firstName": "Igor", "lastName": "Machado", "profession": "Gerente de Projetos", "balance": 6000, "type": "contractor" },
                { "firstName": "Juliana", "lastName": "Lima", "profession": "Advogada", "balance": 8000, "type": "client" }
            ];
            yield Profile.bulkCreate(profiles);
        });
    }
    // Método para popular a tabela Contract
    createContracts() {
        return __awaiter(this, void 0, void 0, function* () {
            const contracts = [
                { "terms": "Consultoria", "clientId": 1, "contractorId": 2, "operationDate": new Date("2024-11-01"), "status": "ativo" },
                { "terms": "Desenvolvimento de Software", "clientId": 3, "contractorId": 4, "operationDate": new Date("2024-11-05"), "status": "ativo" },
                { "terms": "Design de Interiores", "clientId": 5, "contractorId": 6, "operationDate": new Date("2024-11-08"), "status": "finalizado" },
                { "terms": "Projeto Arquitetônico", "clientId": 7, "contractorId": 8, "operationDate": new Date("2024-11-12"), "status": "ativo" },
                { "terms": "Gerenciamento de Projetos", "clientId": 9, "contractorId": 10, "operationDate": new Date("2024-11-15"), "status": "ativo" }
            ];
            yield Contract.bulkCreate(contracts);
        });
    }
    // Método para popular a tabela Job
    createJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = [
                { "contractId": 1, "description": "Revisão de Arquitetura", "operationDate": new Date("2024-11-02"), "paymentDate": null, "price": 2000, "paid": false },
                { "contractId": 2, "description": "Desenvolvimento Backend", "operationDate": new Date("2024-11-06"), "paymentDate": null, "price": 3500, "paid": false },
                { "contractId": 3, "description": "Elaboração de Modelos", "operationDate": new Date("2024-11-09"), "paymentDate": new Date("2024-11-10"), "price": 1500, "paid": true },
                { "contractId": 4, "description": "Análise de Desempenho", "operationDate": new Date("2024-11-13"), "paymentDate": null, "price": 2500, "paid": false },
                { "contractId": 5, "description": "Gerenciamento de Recursos", "operationDate": new Date("2024-11-16"), "paymentDate": new Date("2024-11-17"), "price": 3000, "paid": true }
            ];
            yield Job.bulkCreate(jobs);
        });
    }
    // Método para popular a tabela Deposit
    createDeposits() {
        return __awaiter(this, void 0, void 0, function* () {
            const deposits = [
                { "clientId": 1, "operationDate": new Date("2024-11-01"), "depositValue": 500 },
                { "clientId": 2, "operationDate": new Date("2024-11-03"), "depositValue": 1000 },
                { "clientId": 3, "operationDate": new Date("2024-11-05"), "depositValue": 1500 },
                { "clientId": 4, "operationDate": new Date("2024-11-07"), "depositValue": 2000 },
                { "clientId": 5, "operationDate": new Date("2024-11-09"), "depositValue": 750 }
            ];
            yield Deposit.bulkCreate(deposits);
        });
    }
    // Método para popular a tabela Payment
    createPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            const payments = [
                { "jobId": 1, "operationDate": new Date("2024-11-05"), "paymentValue": 2000 },
                { "jobId": 2, "operationDate": new Date("2024-11-09"), "paymentValue": 3500 },
                { "jobId": 3, "operationDate": new Date("2024-11-11"), "paymentValue": 1500 },
                { "jobId": 4, "operationDate": new Date("2024-11-14"), "paymentValue": 2500 },
                { "jobId": 5, "operationDate": new Date("2024-11-18"), "paymentValue": 3000 }
            ];
            yield Payment.bulkCreate(payments);
        });
    }
}
