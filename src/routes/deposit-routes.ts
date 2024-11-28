import { Router } from "express";
import { DepositController } from "../controllers/deposit-controller.js";

const router = Router();
const depositController = new DepositController();

router.post("/deposits", (req, res) => depositController.createDeposit(req, res));
router.get("/deposits", (req, res) => depositController.getAllDeposits(req, res));
router.get("/deposits/:id", (req, res) => depositController.getDepositById(req, res));
router.delete("/deposits/:id", (req, res) => depositController.deleteDeposit(req, res));
router.put("/deposits/:id", (req, res) => depositController.updateDeposit(req, res));

//  "2. Realizar Deposit para Profile" 
router.post("/profile/:profileId", depositController.makeDeposit);

export default router;
