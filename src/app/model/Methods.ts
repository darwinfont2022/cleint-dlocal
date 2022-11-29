export interface Method {
    id: string;
    logo: string; 
    name: string;
    type: string;
    allowed_flows: FLOW[]
}

export enum FLOW {
    DIRECT = 'DIRECT',
    REDIRECT = 'REDIRECT'
}