"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderLogin = exports.renderHome = void 0;
const renderHome = (req, res) => {
    res.render('index');
};
exports.renderHome = renderHome;
const renderLogin = (req, res) => {
    res.render('login');
};
exports.renderLogin = renderLogin;
