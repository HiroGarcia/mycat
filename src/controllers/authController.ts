// import { Request, Response } from 'express';
// import { authService } from '../services/authService';

// export const authController = {
//     async handleRegister(req: Request, res: Response) {
//         const { username, password, confirmPassword } = req.body;

//         if (!username || !password || !confirmPassword) {
//             return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
//         }

//         if (password !== confirmPassword) {
//             return res.status(400).json({ message: 'As senhas não coincidem.' });
//         }

//         try {
//             const newUser = await authService.registerUser(username, password);
//             res.status(201).json({ message: 'Cadastro realizado com sucesso!', user: newUser });
//         } catch (error: any) {
//             res.status(400).json({ message: error.message });
//         }
//     }, // <-- Verifique se esta vírgula existe no seu código

//     async handleLogin(req: Request, res: Response) {
//         const { username, password } = req.body;
//         if (!username || !password) {
//             return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
//         }
//         try {
//             const user = await authService.verifyUser(username, password);
//             if (!user) {
//                 return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
//             }
//             req.session.user = user;
//             res.status(200).json({ message: 'Login realizado com sucesso!' });
//         } catch (error: any) {
//             res.status(500).json({ message: 'Erro interno no servidor.' });
//         }
//     }, // <-- Verifique se esta vírgula existe no seu código

//     handleLogout(req: Request, res: Response) {
//         req.session.destroy((err) => {
//             if (err) {
//                 // Em uma API, é melhor retornar um erro JSON
//                 return res.status(500).json({ message: "Não foi possível fazer logout." });
//             }
//             res.clearCookie('connect.sid');
//             // Em vez de redirecionar, a API deve apenas confirmar o logout
//             res.status(200).json({ message: "Logout realizado com sucesso." });
//         });
//     }
// };

import { Request, Response } from 'express';
import { authService } from '../services/authService';

export const handleRegister = async (req: Request, res: Response): Promise<void> => {
    const { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword) {
        res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        return;
    }

    if (password !== confirmPassword) {
        res.status(400).json({ message: 'As senhas não coincidem.' });
        return;
    }

    try {
        const newUser = await authService.registerUser(username, password);
        res.status(201).json({ message: 'Cadastro realizado com sucesso!', user: newUser });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const handleLogin = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
        return;
    }

    try {
        const user = await authService.verifyUser(username, password);
        if (!user) {
            res.status(401).json({ message: 'Usuário ou senha inválidos.' });
            return;
        }
        req.session.user = user;
        res.status(200).json({ message: 'Login realizado com sucesso!' });
    } catch (error: any) {
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};

export const handleLogout = async (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Erro ao fazer logout');
        }
        res.clearCookie('connect.sid'); // Opcional: limpa o cookie da sessão
        res.redirect('/'); // Redireciona para a home após logout
    });
};
