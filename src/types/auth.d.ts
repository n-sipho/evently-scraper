export interface TokenPayload {
    id: number;
    first_name?: string;
    last_name?: string;
    email: string;
    password?: string;
    type?: string;
}