export interface ICoupon {
    name: string;
    description: string;
    hasPeriod: boolean;
    dateStart: Date;
    dateEnd: Date;
    hasLimit: boolean;
    limit: number;
    hasValue: boolean;
    value: number;
    hasPercentage: boolean;
    percentage: number;
}