export interface Method {
    id: string;
    logo: string; 
    name: string;
    type: string;
    allowed_flows: string[]
}

export enum FLOW {
    DIRECT = 'DIRECT',
    REDIRECT = 'REDIRECT'
}
