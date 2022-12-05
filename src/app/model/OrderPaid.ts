export interface OrderPaid {
    order_id: string;
    amount: number;
    currency: string;
    country?: string;
    status: string;
    status_code: number;
    status_detail: string;
    created_date?: Date;
}