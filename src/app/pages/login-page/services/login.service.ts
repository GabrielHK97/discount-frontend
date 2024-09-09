import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginDto } from "../dto/login.dto";
import { environment } from "../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class LoginService {
  constructor(private http: HttpClient) {}
  login(loginDto: LoginDto): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, loginDto);
  }
}