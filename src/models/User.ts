export interface User {
    id: number;
    username: string;
    password?: string; // O hash da senha
}