import { Router } from 'express';
import { pageController } from '../controllers/pageController';
import { requireLogin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', pageController.renderHomePage);
router.get('/login', pageController.renderLoginPage);
router.get('/register', pageController.renderRegisterPage);
router.get('/adocoes', requireLogin, pageController.renderAdocoesPage);

export default router;