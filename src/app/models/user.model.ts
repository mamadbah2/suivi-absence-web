export interface UserModel {
    id: number;
    email: string;
    roles: string[];
    // Ajoutez d'autres champs selon vos besoins
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: UserModel;
} 