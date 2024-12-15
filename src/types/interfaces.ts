
// export interface User {
//     first_name: string;
//     last_name: string;
//     email: string;
//     password: string;
//     created_at: Date;
//     updated_at: Date;
// }

export interface JwtPayload {
    email: string;
    type: string;
}