var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ContractService } from "../services/contract-service.js";
export class ContractController {
    constructor() {
        this.contractService = new ContractService();
    }
    createContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContract = yield this.contractService.createContract(req.body);
                res.status(201).json(newContract);
            }
            catch (error) {
                res.status(500).json({ message: "Falha ao criar os contratos", error: error.message });
            }
        });
    }
    getAllContracts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contracts = yield this.contractService.getAllContracts();
                res.status(200).json(contracts);
            }
            catch (error) {
                res.status(500).json({ message: "Falha ao recuperar o contratos", error: error.message });
            }
        });
    }
    getContractById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contract = yield this.contractService.getContractById(Number(req.params.id));
                if (contract) {
                    res.status(200).json(contract);
                }
                else {
                    res.status(404).json({ message: "Contrato não encontrado" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Falha ao recuperar o contrato", error: error.message });
            }
        });
    }
    updateContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedContract = yield this.contractService.updateContract(Number(req.params.id), req.body);
                if (updatedContract) {
                    res.status(200).json(updatedContract);
                }
                else {
                    res.status(404).json({ message: "Contrato não encontrado" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Falha ao atualizar o contrato", error: error.message });
            }
        });
    }
    deleteContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.contractService.deleteContract(Number(req.params.id));
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: "Falha ao deletar o contrato", error: error.message });
            }
        });
    }
    getContractsByProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profileId = Number(req.params.profileId); // Obtém o ID do perfil da rota
                const contracts = yield this.contractService.getContractsByProfile(profileId); // Chama o método no serviço
                res.status(200).json(contracts); // Retorna os contratos encontrados
            }
            catch (error) {
                res.status(500).json({
                    message: "Falha ao recuperar os contratos de um profile",
                    error: error.message // Retorna o erro no caso de falha
                });
            }
        });
    }
}
