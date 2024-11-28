var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Job } from "../models/job-models.js";
import { Payment } from "../models/Payment-models.js";
export class JobRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Job.create(data);
            }
            catch (error) {
                throw new Error(`Erro ao criar Job: ${error.message}`);
            }
        });
    }
    findAll(p0) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Job.findAll();
            }
            catch (error) {
                throw new Error(`Erro ao encontrar Jobs: ${error.message}`);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Job.findByPk(id);
            }
            catch (error) {
                throw new Error(`Erro ao encontrar Job com ID ${id}: ${error.message}`);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const job = yield Job.findByPk(id);
                if (!job)
                    return null;
                yield job.update(data);
                return job;
            }
            catch (error) {
                throw new Error(`Erro ao atualizar Job com ID ${id}: ${error.message}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Job.destroy({ where: { id } });
                if (result === 0)
                    throw new Error(`Job com ID ${id} não encontrado`);
            }
            catch (error) {
                throw new Error(`Erro ao excluir Job com ID ${id}: ${error.message}`);
            }
        });
    }
    findAllUnpaidJobsByContract(contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const jobs = yield Job.findAll({
                    where: { contractId },
                    include: [{ model: Payment, as: "payments" }]
                });
                for (const job of jobs) {
                    const totalPaid = ((_a = job.payments) === null || _a === void 0 ? void 0 : _a.reduce((sum, payment) => sum + payment.paymentValue, 0)) || 0;
                    if (totalPaid >= job.price && !job.paid) {
                        job.paid = true;
                        yield job.save();
                    }
                }
                // Retorna apenas os jobs onde paid é false
                return jobs.filter((job) => !job.paid);
            }
            catch (error) {
                throw new Error(`Erro ao buscar Jobs não pagos para o contrato ${contractId}: ${error.message}`);
            }
        });
    }
}
