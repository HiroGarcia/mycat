import { Request, Response } from 'express';
import { adocaoService } from '../services/adocaoService';

export const pageController = {
    renderHomePage(req: Request, res: Response) {
        const { error, success } = req.query;
        res.render('index', { user: req.session.user, error, success });
    },


    renderRegisterPage(req: Request, res: Response) {
        if (req.session.user) return res.redirect('/adocoes');
        const { error } = req.query;
        res.render('register', { user: null, error, success: null });
    },

    async renderAdocoesPage(req: Request, res: Response) {
        try {
            const adocoes = await adocaoService.getAllAdocoes();
            res.render('adocoes', { user: req.session.user, adocoes });
        } catch (error) {
            res.status(500).send("Erro ao carregar a página de adoções.");
        }
    }
};