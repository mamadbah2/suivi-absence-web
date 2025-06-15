import { Observable } from 'rxjs';
import { LoginResponse } from '../models/user.models';

export interface IAuthService {
  login(username: string, password: string): Observable<LoginResponse>;
  logout(): void;
  isAuthenticated(): boolean;
  isAdmin(): boolean;
}
