export interface UserModels {
  id:string;
  nom:string;
  prenom:string;
  email:string;
  role:string;
}

export interface LoginResponse {
  message: string;
  success: boolean;
  data: UserModels|null;
}
