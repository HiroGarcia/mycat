"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// router.post('/register', registerUser);
router.get('/user/:id', authController_1.findUser);
exports.default = router;
