import { Profile, ProfileCreationAttributes } from "../models/profile-models.js";
import { ProfileRepository } from "../repositories/profile-repository.js";

export class ProfileService {
    private profileRepository: ProfileRepository;

    constructor() {
        this.profileRepository = new ProfileRepository();
    }

    public async createProfile(profileData: ProfileCreationAttributes): Promise<Profile> {
        try {
            return await this.profileRepository.create(profileData);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível criar perfil: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar criar o perfil.");
            }
        }
    }

    public async getAllProfiles(): Promise<Profile[]> {
        try {
            return await this.profileRepository.findAll();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível encontrar perfis: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar encontrar perfis.");
            }
        }
    }

    public async getProfileById(id: number): Promise<Profile | null> {
        try {
            return await this.profileRepository.findById(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível encontrar perfil pelo ID ${id}: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar encontrar o perfil.");
            }
        }
    }

    public async updateProfile(id: number, updatedData: Partial<ProfileCreationAttributes>): Promise<Profile | null> {
        try {
            return await this.profileRepository.update(id, updatedData);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível atualizar perfil com ID ${id}: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o perfil.");
            }
        }
    }

    public async deleteProfile(id: number): Promise<void> {
        try {
            await this.profileRepository.delete(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível excluir perfil com ID ${id}: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar excluir o perfil.");
            }
        }
    }
}
