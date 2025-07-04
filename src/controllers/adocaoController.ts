import { Request, Response } from 'express';
import { adocaoService } from '../services/adocaoService';

export const adocaoController = {
    async handleCreateAdocao(req: Request, res: Response) {
        const { nome, telefone, email, cpf } = req.body;

        if (!nome || !telefone || !email || !cpf) {
            return res.status(400).json({ message: 'Todos os campos do formulário são obrigatórios.' });
        }

        try {
            await adocaoService.createAdocao({ nome, telefone, email, cpf });
            res.json({ message: 'Pedido de adoção enviado com sucesso!' });
        } catch (error: any) {
            res.status(400).json({ message: error.message || 'Erro ao salvar adoção.' });
        }
    }
};