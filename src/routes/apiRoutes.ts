// import { Router } from 'express';
// import { authController } from '../controllers/authController';
// import { adocaoController } from '../controllers/adocaoController';
// import { asyncHandler } from '../utils/asyncHandler';

// const router = Router();

// // Rotas de Autenticação
// router.post('/register', asyncHandler(authController.handleRegister));
// router.post('/login', asyncHandler(authController.handleLogin));
// router.post('/logout', asyncHandler(authController.handleLogout));

// // Rota de Adoção
// router.post('/adocao', asyncHandler(adocaoController.handleCreateAdocao));

// export default router;


import { Router } from 'express';
import { handleRegister, handleLogin, handleLogout } from '../controllers/authController';
import { adocaoController } from '../controllers/adocaoController';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/register', asyncHandler(handleRegister));
router.post('/login', asyncHandler(handleLogin));
router.post('/logout', asyncHandler(handleLogout));
router.post('/adocao', asyncHandler(adocaoController.handleCreateAdocao));

export default router;
