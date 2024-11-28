import { Router } from "express";
import { JobController } from "../controllers/job-controllers.js";

const router = Router();
const jobController = new JobController();

router.post("/jobs", (req, res) => jobController.createJob(req, res));
router.get("/jobs", (req, res) => jobController.getAllJobs(req, res));
router.get("/jobs/:id", (req, res) => jobController.getJobById(req, res));
router.put("/jobs/:id", (req, res) => jobController.updateJob(req, res));
router.delete("/jobs/:id", (req, res) => jobController.deleteJob(req, res));


// 3 Novo endpoint para listar Jobs não pagos integralmente
router.get("/contract/:contractId/unpaid", (req, res) => jobController.getUnpaidJobs(req, res));


export default router;
