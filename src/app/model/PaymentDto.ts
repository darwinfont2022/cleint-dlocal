export interface PaymentDto {
    // User Information 
    name: string;
    email: string;
    document: string;
    user_reference: string;
    order_id: string;
    // Order information
    amount: number;
    currency: string;
    country: string;
    // Card information
    holder_name?: string;
    number?: string;
    cvv?: string;
    expiration_month?: string;
    expiration_year?: string;
    // Method information
    method_id: string;
    type: string;
    token?: string;
}

export type PaymentCardInfo = Omit<PaymentDto, 'name' | 'user_reference' | 'token' | 'type'> 

export type PayCardToken = Omit<PaymentDto, 'holder_name' | 'number' | 'cvv' | 'expiration_month' | 'expiration_year'>

