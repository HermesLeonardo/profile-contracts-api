var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PaymentService } from "../services/payment-service.js";
export class PaymentController {
    constructor() {
        this.paymentService = new PaymentService();
    }
    createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPayment = yield this.paymentService.createPayment(req.body);
                res.status(201).json(newPayment);
            }
            catch (error) {
                res.status(500).json({ message: "Failed to create payment", error: error.message });
            }
        });
    }
    getAllPayments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payments = yield this.paymentService.getAllPayments();
                res.status(200).json(payments);
            }
            catch (error) {
                res.status(500).json({ message: "Failed to retrieve payments", error: error.message });
            }
        });
    }
    getPaymentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payment = yield this.paymentService.getPaymentById(Number(req.params.id));
                if (payment) {
                    res.status(200).json(payment);
                }
                else {
                    res.status(404).json({ message: "Payment not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Failed to retrieve payment", error: error.message });
            }
        });
    }
    updatePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedPayment = yield this.paymentService.updatePayment(Number(req.params.id), req.body);
                if (updatedPayment) {
                    res.status(200).json(updatedPayment);
                }
                else {
                    res.status(404).json({ message: "Payment not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Failed to update payment", error: error.message });
            }
        });
    }
    deletePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.paymentService.deletePayment(Number(req.params.id));
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: "Failed to delete payment", error: error.message });
            }
        });
    }
}
