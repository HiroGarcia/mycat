// src/models/User.ts
export interface User {
    id?: number;
    username: string;
    password?: string; // A senha não deve ser exposta em todas as operações
}