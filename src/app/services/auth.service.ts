import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { ILogin } from '../interfaces/login.interface';
import { environment } from '../../environments/environment';
import { IMetadata } from '../interfaces/metadata.interface';
import { IToken } from '../interfaces/token.interface';
import { IQRCode } from '../interfaces/qrcode.interface';
import { ITwoFA } from '../interfaces/twofa.interface';
import { IStatus } from '../interfaces/status.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  async authenticate(): Promise<boolean> {
    try {
      await firstValueFrom(
        this.http.get(`${environment.apiUrl}/admin/authenticate`, { withCredentials: true })
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(loginDto: ILogin): Promise<IMetadata<IToken | IStatus>> {
    return await firstValueFrom(
      this.http.post<IMetadata<IToken | IStatus>>(
        `${environment.apiUrl}/admin/login`,
        loginDto,
        { withCredentials: true }
      )
    );
  }

  async logout(): Promise<IMetadata<IToken>> {
    return await firstValueFrom(
      this.http.get<IMetadata<IToken>>(`${environment.apiUrl}/admin/logout`, {
        withCredentials: true,
      })
    );
  }

  async enableQRCode(): Promise<IMetadata> {
    return await firstValueFrom(
      this.http.get<IMetadata>(`${environment.apiUrl}/admin/qrcode/enable`, {
        withCredentials: true,
      })
    );
  }

  async disableQRCode(twofa: ITwoFA): Promise<IMetadata> {
    return await firstValueFrom(
      this.http.post<IMetadata>(`${environment.apiUrl}/admin/qrcode/disable`, twofa, {
        withCredentials: true,
      })
    );
  }

  async statusQRCode(): Promise<IMetadata<IStatus>> {
    return await firstValueFrom(
      this.http.get<IMetadata<IStatus>>(`${environment.apiUrl}/admin/qrcode/status`, {
        withCredentials: true,
      })
    );
  }

  async generateQRCode(): Promise<IMetadata<IQRCode>> {
    return await firstValueFrom(
      this.http.get<IMetadata<IQRCode>>(`${environment.apiUrl}/admin/qrcode`, {
        withCredentials: true,
      })
    );
  }
}
