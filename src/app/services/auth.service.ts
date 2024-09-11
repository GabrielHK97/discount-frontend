import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { ILogin } from '../interfaces/login.interface';
import { environment } from '../../environments/environment';
import { IMetadata } from '../interfaces/metadata.interface';
import { IToken } from '../interfaces/token.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  async authenticate(): Promise<boolean> {
    try {
      await firstValueFrom(
        this.http.get(`${environment.apiUrl}/auth`, { withCredentials: true })
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(loginDto: ILogin): Promise<IMetadata<IToken>> {
    return await firstValueFrom(this.http.post<IMetadata<IToken>>(
      `${environment.apiUrl}/auth/login`,
      loginDto,
      { withCredentials: true }
    ));
  }

  async logout(): Promise<IMetadata<IToken>> {
    return await firstValueFrom(this.http.get<IMetadata<IToken>>(
      `${environment.apiUrl}/auth/logout`,
      { withCredentials: true }
    ));
  }
}
