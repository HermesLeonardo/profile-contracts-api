var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PaymentRepository } from "../repositories/payment-repository.js";
export class PaymentService {
    constructor() {
        this.paymentRepository = new PaymentRepository();
    }
    createPayment(paymentData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.paymentRepository.create(paymentData);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível criar pagamento: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar criar o pagamento.");
                }
            }
        });
    }
    getAllPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.paymentRepository.findAll();
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível encontrar pagamentos: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar encontrar pagamentos.");
                }
            }
        });
    }
    getPaymentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.paymentRepository.findById(id);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível encontrar pagamento pelo ID ${id}: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar encontrar o pagamento.");
                }
            }
        });
    }
    updatePayment(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.paymentRepository.update(id, updatedData);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível atualizar pagamento com ID ${id}: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o pagamento.");
                }
            }
        });
    }
    deletePayment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.paymentRepository.delete(id);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível excluir pagamento com ID ${id}: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar excluir o pagamento.");
                }
            }
        });
    }
}
