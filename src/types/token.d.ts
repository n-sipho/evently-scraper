export type SpotifyToken = {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
}

export interface Token {
    id: number;
    token: string;
    user_id: number;
}