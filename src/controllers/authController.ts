import { Request, Response } from 'express';
import { authService } from '../services/authService';

export const authController = {
    async handleRegister(req: Request, res: Response) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.redirect('/register?error=Todos os campos são obrigatórios.');
        }
        try {
            await authService.registerUser(username, password);
            res.redirect('/login?success=Cadastro realizado com sucesso!');
        } catch (error: any) {
            res.redirect(`/register?error=${encodeURIComponent(error.message)}`);
        }
    },

    async handleLogin(req: Request, res: Response) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.redirect('/login?error=Todos os campos são obrigatórios.');
        }
        try {
            const user = await authService.verifyUser(username, password);
            if (!user) {
                return res.redirect('/login?error=Usuário ou senha inválidos.');
            }
            req.session.user = user;
            res.redirect('/adocoes');
        } catch (error: any) {
            res.redirect(`/login?error=${encodeURIComponent(error.message)}`);
        }
    },

    handleLogout(req: Request, res: Response) {
        req.session.destroy((err) => {
            if (err) {
                return res.redirect('/');
            }
            res.clearCookie('connect.sid'); // Limpa o cookie da sessão
            res.redirect('/');
        });
    }
};