import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import session from 'express-session';
import { User } from './models/User'; // Importe o modelo User
import pageRoutes from './routes/pageRoutes';
import apiRoutes from './routes/apiRoutes';
import { handleLogout } from './controllers/authController';

// ====================================================================
// DECLARAÇÃO DE TIPO GLOBAL PARA A SESSÃO
// Ao colocar aqui, garantimos que o TypeScript vai enxergar.
declare module 'express-session' {
  interface SessionData {
    user?: Omit<User, 'password'>;
  }
}
// ====================================================================

const app = express();

// Configura o EJS como view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Sessão
app.use(session({
    secret: 'my-super-secret-key-for-my-cat-app',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, 
        maxAge: 1000 * 60 * 60 * 24 
    }
}));

// Middleware para passar dados da sessão para todas as views
// A linha abaixo agora funcionará sem erros.
app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.user = req.session.user;
    next();
});

// Rotas
app.use('/', pageRoutes);
app.use('/api', apiRoutes);
app.post('/logout', handleLogout);

export default app;