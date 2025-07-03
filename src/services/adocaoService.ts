import db from '../database/db';
import { Adocao } from '../models/Adocao';

type AdocaoPayload = Omit<Adocao, 'id'>;

export const adocaoService = {
    createAdocao: async (payload: AdocaoPayload): Promise<Adocao> => {
        const { nome, telefone, email, cpf } = payload;
        const sql = 'INSERT INTO adocao (nome, telefone, email, cpf) VALUES (?, ?, ?, ?)';

        return new Promise((resolve, reject) => {
            db.run(sql, [nome, telefone, email, cpf], function (err) {
                if (err) {
                    return reject(new Error('CPF já cadastrado ou dados inválidos.'));
                }
                resolve({ id: this.lastID, ...payload });
            });
        });
    },

    getAllAdocoes: async (): Promise<Adocao[]> => {
        const sql = 'SELECT * FROM adocao ORDER BY nome';
        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows: Adocao[]) => {
                if (err) {
                    return reject(new Error('Erro ao buscar lista de adoções.'));
                }
                resolve(rows);
            });
        });
    }
};