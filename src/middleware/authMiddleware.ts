import { Request, Response, NextFunction } from 'express';

export const requireLogin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) {
        return res.redirect('/'); // Redireciona para home se não estiver logado
    }
    next();
};