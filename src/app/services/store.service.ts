import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "../../environments/environment";
import { ILogin } from "../interfaces/login.interface";
import { IMetadata } from "../interfaces/metadata.interface";
import { IToken } from "../interfaces/token.interface";
import { IStatus } from "../interfaces/status.interface";
import { ITwoFA } from "../interfaces/twofa.interface";
import { IQRCode } from "../interfaces/qrcode.interface";
import { IRegister } from "../interfaces/register.interface";

@Injectable({ providedIn: 'root' })
export class StoreService {
  constructor(private http: HttpClient) {}

  async authenticate(): Promise<boolean> {
    try {
      await firstValueFrom(
        this.http.get(`${environment.apiUrl}/store/authenticate`, { withCredentials: true })
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async register(registerDto: IRegister): Promise<IMetadata> {
    return await firstValueFrom(
      this.http.post<IMetadata>(
        `${environment.apiUrl}/store/login`,
        registerDto,
        { withCredentials: true }
      )
    );
  }

  async login(loginDto: ILogin): Promise<IMetadata<IToken | IStatus>> {
    return await firstValueFrom(
      this.http.post<IMetadata<IToken | IStatus>>(
        `${environment.apiUrl}/store/login`,
        loginDto,
        { withCredentials: true }
      )
    );
  }

  async logout(): Promise<IMetadata<IToken>> {
    return await firstValueFrom(
      this.http.get<IMetadata<IToken>>(`${environment.apiUrl}/store/logout`, {
        withCredentials: true,
      })
    );
  }

  async enableQRCode(): Promise<IMetadata> {
    return await firstValueFrom(
      this.http.get<IMetadata>(`${environment.apiUrl}/store/qrcode/enable`, {
        withCredentials: true,
      })
    );
  }

  async disableQRCode(twofa: ITwoFA): Promise<IMetadata> {
    return await firstValueFrom(
      this.http.post<IMetadata>(`${environment.apiUrl}/store/qrcode/disable`, twofa, {
        withCredentials: true,
      })
    );
  }

  async statusQRCode(): Promise<IMetadata<IStatus>> {
    return await firstValueFrom(
      this.http.get<IMetadata<IStatus>>(`${environment.apiUrl}/store/qrcode/status`, {
        withCredentials: true,
      })
    );
  }

  async generateQRCode(): Promise<IMetadata<IQRCode>> {
    return await firstValueFrom(
      this.http.get<IMetadata<IQRCode>>(`${environment.apiUrl}/store/qrcode`, {
        withCredentials: true,
      })
    );
  }
}
