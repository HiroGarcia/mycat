"use strict";
// // src/app.ts
// import express from 'express';
// import authRoutes from './routes/authRoutes';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// app.use(express.json()); // Para entender JSON no corpo das requisições
// app.use(express.static('public')); // Para servir seus arquivos HTML, CSS e JS
// app.use('/css', express.static('css')); // Para servir a pasta css
// app.use('/api', authRoutes); // Prefixo para as rotas da API
// export default app;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const pageRoutes_1 = __importDefault(require("./routes/pageRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use('/css', express_1.default.static('css'));
app.use('/', pageRoutes_1.default); // Rotas de páginas
app.use('/api', authRoutes_1.default); // Rotas de API
exports.default = app;
