var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { DatabaseSeeder } from "../bulkCreate/DatabaseSeeder.js";
const router = express.Router();
const databaseSeeder = new DatabaseSeeder();
router.post("/seed", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield databaseSeeder.createProfiles();
        yield databaseSeeder.createContracts();
        yield databaseSeeder.createJobs();
        yield databaseSeeder.createDeposits();
        yield databaseSeeder.createPayments();
        res.status(200).json({ message: "Dados inseridos com sucesso!" });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao popular o banco de dados", error: error.message });
    }
}));
export default router;
