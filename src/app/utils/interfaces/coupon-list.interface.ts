import { ICouponItem } from "./coupon-item.interface";

export interface ICouponList {
    coupons: ICouponItem[];
    totalItems: number;
    page: number;
}