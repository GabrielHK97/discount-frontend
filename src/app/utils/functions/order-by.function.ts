import { OrderByEnum } from "../enums/order-by.enum";

export function orderBy<T = any>(array: T[], order: OrderByEnum, field: string): T[]{
    let sortFunction: (a: T, b: T) => number;
    switch (order) {
        case OrderByEnum.ALPHABET:
          sortFunction = (a: any, b: any) => a[field].localeCompare(b[field]);
          break;
        case OrderByEnum.NUMBER_ASC:
          sortFunction = (a: any, b: any) => a - b;
          break;
        case OrderByEnum.NUMBER_DESC:
          sortFunction = (a: any, b: any) => b - a;
          break;
      }
      return array.sort(sortFunction);
}