var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ProfileService } from "../services/profile-service.js";
export class ProfileController {
    constructor() {
        this.profileService = new ProfileService();
    }
    createProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProfile = yield this.profileService.createProfile(req.body);
                res.status(201).json(newProfile);
            }
            catch (error) {
                res.status(500).json({ message: "Failed to create profile", error: error.message });
            }
        });
    }
    getAllProfiles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profiles = yield this.profileService.getAllProfiles();
                res.status(200).json(profiles);
            }
            catch (error) {
                res.status(500).json({ message: "Failed to retrieve profiles", error: error.message });
            }
        });
    }
    getProfileById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield this.profileService.getProfileById(Number(req.params.id));
                if (profile) {
                    res.status(200).json(profile);
                }
                else {
                    res.status(404).json({ message: "Profile not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Failed to retrieve profile", error: error.message });
            }
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedProfile = yield this.profileService.updateProfile(Number(req.params.id), req.body);
                if (updatedProfile) {
                    res.status(200).json(updatedProfile);
                }
                else {
                    res.status(404).json({ message: "Profile not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Failed to update profile", error: error.message });
            }
        });
    }
    deleteProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.profileService.deleteProfile(Number(req.params.id));
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: "Failed to delete profile", error: error.message });
            }
        });
    }
}
