import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ICoupon } from '../utils/interfaces/coupon.interface';
import { IMetadata } from '../utils/interfaces/metadata.interface';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CouponService {
  constructor(private http: HttpClient) {}

  async list(listCouponDto: any): Promise<IMetadata<ICoupon[]>> {
    return await firstValueFrom(
      this.http.post<IMetadata<ICoupon[]>>(
        `${environment.apiUrl}/coupon/list`,
        listCouponDto,
        { withCredentials: true }
      )
    );
  }

  async create(createCouponDto: any): Promise<IMetadata> {
    return await firstValueFrom(
      this.http.post<IMetadata>(
        `${environment.apiUrl}/coupon/create`,
        createCouponDto,
        { withCredentials: true }
      )
    );
  }
  
}
