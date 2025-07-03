// import { Router } from 'express';
// import { authController } from '../controllers/authController';
// import { adocaoController } from '../controllers/adocaoController';

// const router = Router();

// // Rotas de Autenticação
// router.post('/register', authController.handleRegister);
// router.post('/login', authController.handleLogin);
// router.post('/logout', authController.handleLogout);

// // Rota de Adoção
// router.post('/adocao', adocaoController.handleCreateAdocao);

// export default router;


import { Router } from 'express';
import { handleRegister, handleLogin, handleLogout } from '../controllers/authController';
import { adocaoController } from '../controllers/adocaoController';

const router = Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.post('/logout', handleLogout);

router.post('/adocao', adocaoController.handleCreateAdocao);

export default router;
