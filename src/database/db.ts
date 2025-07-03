import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao SQLite:', err.message);
        throw err;
    }
    console.log('Conectado ao banco de dados SQLite.');
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS login (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `, (err) => {
        if (err) console.error('Erro ao criar tabela login:', err.message);
    });

    db.run(`
        CREATE TABLE IF NOT EXISTS adocao (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            telefone TEXT NOT NULL,
            email TEXT NOT NULL,
            cpf TEXT NOT NULL UNIQUE
        )
    `, (err) => {
        if (err) console.error('Erro ao criar tabela adocao:', err.message);
    });
});

export default db;