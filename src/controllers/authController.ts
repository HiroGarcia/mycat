// src/controllers/authController.ts
import { Request, Response } from 'express';
import db from '../database/db';
import { User } from '../models/User';

export const registerUser = (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ "error": "Nome de usuário e senha são obrigatórios" });
    }

    const sql = 'INSERT INTO login (username, password) VALUES (?,?)';
    const params = [username, password]; // Em um projeto real, use bcrypt para hashear a senha

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID, username: username }
        });
    });
};

export const findUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const sql = "SELECT id, username FROM login WHERE id = ?";

    db.get(sql, [id], (err, row: User) => {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        if (!row) {
            return res.status(404).json({ "error": "Usuário não encontrado" });
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
};