import { Request, Response } from "express";
import { DepositService } from "../services/deposit-service.js";

export class DepositController {
    private depositService: DepositService;

    constructor() {
        this.depositService = new DepositService();
    }

    async createDeposit(req: Request, res: Response) {
        try {
            const newDeposit = await this.depositService.createDeposit(req.body);
            res.status(201).json(newDeposit);
        } catch (error) {
            res.status(500).json({ message: "Falha ao criar um deposito", error: (error as Error).message });
        }
    }

    async getAllDeposits(req: Request, res: Response) {
        try {
            const deposits = await this.depositService.getAllDeposits();
            res.status(200).json(deposits);
        } catch (error) {
            res.status(500).json({ message: "Falha ao recuperar depositos", error: (error as Error).message });
        }
    }

    async getDepositById(req: Request, res: Response) {
        try {
            const deposit = await this.depositService.getDepositById(Number(req.params.id));
            if (deposit) {
                res.status(200).json(deposit);
            } else {
                res.status(404).json({ message: "Deposito não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ message: "Falha ao recuperar o deposito", error: (error as Error).message });
        }
    }

    async updateDeposit(req: Request, res: Response) {
        try {
            const updatedDeposit = await this.depositService.updateDeposit(Number(req.params.id), req.body);
            if (updatedDeposit) {
                res.status(200).json(updatedDeposit);
            } else {
                res.status(404).json({ message: "Deposito não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ message: "Falha ao atualizar o deposito", error: (error as Error).message });
        }
    }

    async deleteDeposit(req: Request, res: Response) {
        try {
            await this.depositService.deleteDeposit(Number(req.params.id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "falha ao excluir o deposito", error: (error as Error).message });
        }
    }

     // Novo método para realizar depósito
     async makeDeposit(req: Request, res: Response) {
        try {
            const profileId = Number(req.params.profileId);
            const amount = Number(req.body.amount);
            const deposit = await this.depositService.makeDeposit(profileId, amount);
            res.status(201).json(deposit);
        } catch (error) {
            res.status(500).json({ message: "falha ao fazer um deposito", error: (error as Error).message });
        }
    }
}
