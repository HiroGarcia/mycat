"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = exports.registerUser = void 0;
const db_1 = __importDefault(require("../database/db"));
const registerUser = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ "error": "Nome de usuário e senha são obrigatórios" });
    }
    const sql = 'INSERT INTO login (username, password) VALUES (?,?)';
    const params = [username, password]; // Em um projeto real, use bcrypt para hashear a senha
    db_1.default.run(sql, params, function (err) {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID, username: username }
        });
    });
};
exports.registerUser = registerUser;
const findUser = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT id, username FROM login WHERE id = ?";
    db_1.default.get(sql, [id], (err, row) => {
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
exports.findUser = findUser;
