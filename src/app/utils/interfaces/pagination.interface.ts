import { SortDirection } from "@angular/material/sort";

export interface IPagination {
    page?: number;
    pageSize?: number;
    sort?: string;
    direction?: SortDirection;
}