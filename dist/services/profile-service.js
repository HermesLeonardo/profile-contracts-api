var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ProfileRepository } from "../repositories/profile-repository.js";
export class ProfileService {
    constructor() {
        this.profileRepository = new ProfileRepository();
    }
    createProfile(profileData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.profileRepository.create(profileData);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível criar perfil: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar criar o perfil.");
                }
            }
        });
    }
    getAllProfiles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.profileRepository.findAll();
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível encontrar perfis: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar encontrar perfis.");
                }
            }
        });
    }
    getProfileById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.profileRepository.findById(id);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível encontrar perfil pelo ID ${id}: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar encontrar o perfil.");
                }
            }
        });
    }
    updateProfile(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.profileRepository.update(id, updatedData);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível atualizar perfil com ID ${id}: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o perfil.");
                }
            }
        });
    }
    deleteProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.profileRepository.delete(id);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Impossível excluir perfil com ID ${id}: ${error.message}`);
                }
                else {
                    throw new Error("Um erro desconhecido ocorreu ao tentar excluir o perfil.");
                }
            }
        });
    }
}
