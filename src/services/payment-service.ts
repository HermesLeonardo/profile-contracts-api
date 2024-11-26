import { Payment, PaymentCreationAttributes } from "../models/Payment-models.js";
import { PaymentRepository } from "../repositories/payment-repository.js";

export class PaymentService {
    private paymentRepository: PaymentRepository;

    constructor() {
        this.paymentRepository = new PaymentRepository();
    }

    public async createPayment(paymentData: PaymentCreationAttributes): Promise<Payment> {
        try {
            return await this.paymentRepository.create(paymentData);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível criar pagamento: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar criar o pagamento.");
            }
        }
    }

    public async getAllPayments(): Promise<Payment[]> {
        try {
            return await this.paymentRepository.findAll();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível encontrar pagamentos: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar encontrar pagamentos.");
            }
        }
    }

    public async getPaymentById(id: number): Promise<Payment | null> {
        try {
            return await this.paymentRepository.findById(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível encontrar pagamento pelo ID ${id}: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar encontrar o pagamento.");
            }
        }
    }

    public async updatePayment(id: number, updatedData: Partial<PaymentCreationAttributes>): Promise<Payment | null> {
        try {
            return await this.paymentRepository.update(id, updatedData);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível atualizar pagamento com ID ${id}: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o pagamento.");
            }
        }
    }

    public async deletePayment(id: number): Promise<void> {
        try {
            await this.paymentRepository.delete(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível excluir pagamento com ID ${id}: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar excluir o pagamento.");
            }
        }
    }
}
