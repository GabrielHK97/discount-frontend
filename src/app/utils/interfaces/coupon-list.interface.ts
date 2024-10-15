import { ICoupon } from "./coupon.interface";

export interface ICouponList {
    coupons: ICoupon[];
    totalItems: number;
    page: number;
}