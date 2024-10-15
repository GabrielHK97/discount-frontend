import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IMetadata } from '../utils/interfaces/metadata.interface';
import { environment } from '../../environments/environment';
import { ICouponList } from '../utils/interfaces/coupon-list.interface';
import { IPagination } from '../utils/interfaces/pagination.interface';
import { ICouponItem } from '../utils/interfaces/coupon-item.interface';

@Injectable({ providedIn: 'root' })
export class CouponService {
  constructor(private http: HttpClient) {}

  async findAll(pagination: IPagination): Promise<IMetadata<ICouponList>> {
    return await firstValueFrom(
      this.http.post<IMetadata<ICouponList>>(
        `${environment.apiUrl}/coupon/list`,
        pagination,
        { withCredentials: true }
      )
    );
  }

  async find(id: string): Promise<IMetadata<ICouponItem>> {
    return await firstValueFrom(
      this.http.get<IMetadata<ICouponItem>>(
        `${environment.apiUrl}/coupon/${id}`,
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
