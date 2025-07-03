import db from '../database/db';
import bcrypt from 'bcrypt';
import { User } from '../models/User';

const SALT_ROUNDS = 10;

export const authService = {
    registerUser: async (username: string, password: string): Promise<Omit<User, 'password'>> => {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const sql = 'INSERT INTO login (username, password) VALUES (?, ?)';
        
        return new Promise((resolve, reject) => {
            db.run(sql, [username, hashedPassword], function (err) {
                if (err) {
                    return reject(new Error('Nome de usuário já existe.'));
                }
                resolve({ id: this.lastID, username });
            });
        });
    },

    verifyUser: async (username: string, password: string): Promise<Omit<User, 'password'> | null> => {
        const sql = 'SELECT * FROM login WHERE username = ?';

        return new Promise((resolve, reject) => {
            db.get(sql, [username], async (err, user: User) => {
                if (err) return reject(new Error('Erro no banco de dados.'));
                if (!user) return resolve(null); // Usuário não encontrado

                const match = await bcrypt.compare(password, user.password!);
                if (match) {
                    resolve({ id: user.id, username: user.username });
                } else {
                    resolve(null); // Senha incorreta
                }
            });
        });
    }
};