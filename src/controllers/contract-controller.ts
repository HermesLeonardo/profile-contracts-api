import { Request, Response } from "express";
import { ContractService } from "../services/contract-service.js";

export class ContractController {
    private contractService: ContractService;

    constructor() {
        this.contractService = new ContractService();
    }

    async createContract(req: Request, res: Response) {
        try {
            const newContract = await this.contractService.createContract(req.body);
            res.status(201).json(newContract);
        } catch (error) {
            res.status(500).json({ message: "Falha ao criar os contratos", error: (error as Error).message });
        }
    }

    async getAllContracts(req: Request, res: Response) {
        try {
            const contracts = await this.contractService.getAllContracts();
            res.status(200).json(contracts);
        } catch (error) {
            res.status(500).json({ message: "Falha ao recuperar o contratos", error: (error as Error).message });
        }
    }

    async getContractById(req: Request, res: Response) {
        try {
            const contract = await this.contractService.getContractById(Number(req.params.id));
            if (contract) {
                res.status(200).json(contract);
            } else {
                res.status(404).json({ message: "Contrato não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ message: "Falha ao recuperar o contrato", error: (error as Error).message });
        }
    }

    async updateContract(req: Request, res: Response) {
        try {
            const updatedContract = await this.contractService.updateContract(Number(req.params.id), req.body);
            if (updatedContract) {
                res.status(200).json(updatedContract);
            } else {
                res.status(404).json({ message: "Contrato não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ message: "Falha ao atualizar o contrato", error: (error as Error).message });
        }
    }

    async deleteContract(req: Request, res: Response) {
        try {
            await this.contractService.deleteContract(Number(req.params.id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Falha ao deletar o contrato", error: (error as Error).message });
        }
    }
    async getContractsByProfile(req: Request, res: Response) {
        try {
            const profileId = Number(req.params.profileId); // Obtém o ID do perfil da rota
            const contracts = await this.contractService.getContractsByProfile(profileId); // Chama o método no serviço
            res.status(200).json(contracts); // Retorna os contratos encontrados
        } catch (error) {
            res.status(500).json({ 
                message: "Falha ao recuperar os contratos de um profile", 
                error: (error as Error).message // Retorna o erro no caso de falha
            });
        }
    }
    
}
