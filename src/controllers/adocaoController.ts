import { Request, Response } from 'express';
import { adocaoService } from '../services/adocaoService';

export const adocaoController = {
    async handleCreateAdocao(req: Request, res: Response) {
        const { nome, telefone, email, cpf } = req.body;

        if (!nome || !telefone || !email || !cpf) {
            return res.redirect('/?error=Todos os campos do formulário são obrigatórios.');
        }

        try {
            await adocaoService.createAdocao({ nome, telefone, email, cpf });
            res.redirect('/?success=Pedido de adoção enviado com sucesso!');
        } catch (error: any) {
            res.redirect(`/?error=${encodeURIComponent(error.message)}`);
        }
    }
};