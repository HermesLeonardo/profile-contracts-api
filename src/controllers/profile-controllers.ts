import { Request, Response } from "express";
import { ProfileService } from "../services/profile-service.js";

export class ProfileController {
    private profileService: ProfileService;

    constructor() {
        this.profileService = new ProfileService();
    }

    async createProfile(req: Request, res: Response) {
        try {
            const newProfile = await this.profileService.createProfile(req.body);
            res.status(201).json(newProfile);
        } catch (error) {
            res.status(500).json({ message: "Failed to create profile", error: (error as Error).message });
        }
    }

    async getAllProfiles(req: Request, res: Response) {
        try {
            const profiles = await this.profileService.getAllProfiles();
            res.status(200).json(profiles);
        } catch (error) {
            res.status(500).json({ message: "Failed to retrieve profiles", error: (error as Error).message });
        }
    }

    async getProfileById(req: Request, res: Response) {
        try {
            const profile = await this.profileService.getProfileById(Number(req.params.id));
            if (profile) {
                res.status(200).json(profile);
            } else {
                res.status(404).json({ message: "Profile not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Failed to retrieve profile", error: (error as Error).message });
        }
    }

    async updateProfile(req: Request, res: Response) {
        try {
            const updatedProfile = await this.profileService.updateProfile(Number(req.params.id), req.body);
            if (updatedProfile) {
                res.status(200).json(updatedProfile);
            } else {
                res.status(404).json({ message: "Profile not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Failed to update profile", error: (error as Error).message });
        }
    }

    async deleteProfile(req: Request, res: Response) {
        try {
            await this.profileService.deleteProfile(Number(req.params.id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Failed to delete profile", error: (error as Error).message });
        }
    }
}
