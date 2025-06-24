// src/app.ts
import express from 'express';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(express.json()); // Para entender JSON no corpo das requisições
app.use(express.static('public')); // Para servir seus arquivos HTML, CSS e JS
app.use('/css', express.static('css')); // Para servir a pasta css

app.use('/api', authRoutes); // Prefixo para as rotas da API

export default app;