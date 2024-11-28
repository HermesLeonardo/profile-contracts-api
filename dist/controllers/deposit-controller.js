var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DepositService } from "../services/deposit-service.js";
export class DepositController {
    constructor() {
        this.depositService = new DepositService();
        // Vincular o contexto correto aos métodos
        this.makeDeposit = this.makeDeposit.bind(this);
    }
    createDeposit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newDeposit = yield this.depositService.createDeposit(req.body);
                res.status(201).json(newDeposit);
            }
            catch (error) {
                res.status(500).json({ message: "Falha ao criar um deposito", error: error.message });
            }
        });
    }
    getAllDeposits(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deposits = yield this.depositService.getAllDeposits();
                res.status(200).json(deposits);
            }
            catch (error) {
                res.status(500).json({ message: "Falha ao recuperar depositos", error: error.message });
            }
        });
    }
    getDepositById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deposit = yield this.depositService.getDepositById(Number(req.params.id));
                if (deposit) {
                    res.status(200).json(deposit);
                }
                else {
                    res.status(404).json({ message: "Deposito não encontrado" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Falha ao recuperar o deposito", error: error.message });
            }
        });
    }
    updateDeposit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedDeposit = yield this.depositService.updateDeposit(Number(req.params.id), req.body);
                if (updatedDeposit) {
                    res.status(200).json(updatedDeposit);
                }
                else {
                    res.status(404).json({ message: "Deposito não encontrado" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Falha ao atualizar o deposito", error: error.message });
            }
        });
    }
    deleteDeposit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.depositService.deleteDeposit(Number(req.params.id));
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: "falha ao excluir o deposito", error: error.message });
            }
        });
    }
    // Novo método para realizar depósito
    makeDeposit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profileId = Number(req.params.profileId); // Extrai o profileId da URL
                const { depositValue } = req.body; // Obtém o valor do depósito do corpo da requisição
                if (!depositValue || depositValue <= 0) {
                    return res.status(400).json({ message: "O valor do depósito deve ser maior que zero." });
                }
                const result = yield this.depositService.makeDeposit(profileId, depositValue); // Chama o serviço
                res.status(201).json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: "falha ao fazer um deposito",
                    error: error.message,
                });
            }
        });
    }
}
