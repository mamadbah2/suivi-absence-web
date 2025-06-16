export interface UserModels {
  id:string;
  nom:string;
  prenom:string;
  email:string;
  role:string;
  imageUrl?: string; // Optional field for user profile image
}

export interface LoginResponse {
  message: string;
  success: boolean;
  data: UserModels|null;
}
