// src/@types/express-session/index.d.ts
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: number;
      nome: string;
      email: string;
      // adicione outros campos que você armazenar em `req.session.user`
    };
  }
}
