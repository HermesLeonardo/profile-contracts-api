import express from "express";
import { DatabaseSeeder } from "../bulkCreate/DatabaseSeeder.js";


const router = express.Router();
const databaseSeeder = new DatabaseSeeder();

// Rota para popular o banco com todos os dados
router.post("/seed", async (req, res) => {
    try {
        // Chama os métodos de criação de dados
        await databaseSeeder.createProfiles();
        await databaseSeeder.createContracts();
        await databaseSeeder.createJobs();
        await databaseSeeder.createDeposits();
        await databaseSeeder.createPayments();

        res.status(200).json({ message: "Dados inseridos com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao popular o banco de dados", error: (error as Error).message });
    }
});

export default router;
