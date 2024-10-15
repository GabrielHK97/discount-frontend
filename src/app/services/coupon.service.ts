import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IMetadata } from '../utils/interfaces/metadata.interface';
import { environment } from '../../environments/environment';
import { ICouponList } from '../utils/interfaces/coupon-list.interface';
import { IPagination } from '../utils/interfaces/pagination.interface';

@Injectable({ providedIn: 'root' })
export class CouponService {
  constructor(private http: HttpClient) {}

  async list(pagination: IPagination): Promise<IMetadata<ICouponList>> {
    return await firstValueFrom(
      this.http.post<IMetadata<ICouponList>>(
        `${environment.apiUrl}/coupon/list`,
        pagination,
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
