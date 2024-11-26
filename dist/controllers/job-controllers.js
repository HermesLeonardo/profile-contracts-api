var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { JobService } from "../services/job-service.js";
export class JobController {
    constructor() {
        this.jobService = new JobService();
    }
    createJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newJob = yield this.jobService.createJob(req.body);
                res.status(201).json(newJob);
            }
            catch (error) {
                res.status(500).json({ message: "Failed to create job", error: error.message });
            }
        });
    }
    getAllJobs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobs = yield this.jobService.getAllJobs();
                res.status(200).json(jobs);
            }
            catch (error) {
                res.status(500).json({ message: "Failed to retrieve jobs", error: error.message });
            }
        });
    }
    getJobById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const job = yield this.jobService.getJobById(Number(req.params.id));
                if (job) {
                    res.status(200).json(job);
                }
                else {
                    res.status(404).json({ message: "Job not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Failed to retrieve job", error: error.message });
            }
        });
    }
    updateJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedJob = yield this.jobService.updateJob(Number(req.params.id), req.body);
                if (updatedJob) {
                    res.status(200).json(updatedJob);
                }
                else {
                    res.status(404).json({ message: "Job not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Failed to update job", error: error.message });
            }
        });
    }
    deleteJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.jobService.deleteJob(Number(req.params.id));
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: "Failed to delete job", error: error.message });
            }
        });
    }
}
