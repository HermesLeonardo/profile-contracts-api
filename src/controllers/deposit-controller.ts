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
            res.status(500).json({ message: "Failed to create deposit", error: (error as Error).message });
        }
    }

    async getAllDeposits(req: Request, res: Response) {
        try {
            const deposits = await this.depositService.getAllDeposits();
            res.status(200).json(deposits);
        } catch (error) {
            res.status(500).json({ message: "Failed to retrieve deposits", error: (error as Error).message });
        }
    }

    async getDepositById(req: Request, res: Response) {
        try {
            const deposit = await this.depositService.getDepositById(Number(req.params.id));
            if (deposit) {
                res.status(200).json(deposit);
            } else {
                res.status(404).json({ message: "Deposit not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Failed to retrieve deposit", error: (error as Error).message });
        }
    }

    async updateDeposit(req: Request, res: Response) {
        try {
            const updatedDeposit = await this.depositService.updateDeposit(Number(req.params.id), req.body);
            if (updatedDeposit) {
                res.status(200).json(updatedDeposit);
            } else {
                res.status(404).json({ message: "Deposit not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Failed to update deposit", error: (error as Error).message });
        }
    }

    async deleteDeposit(req: Request, res: Response) {
        try {
            await this.depositService.deleteDeposit(Number(req.params.id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Failed to delete deposit", error: (error as Error).message });
        }
    }
}
