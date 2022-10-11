const express = require("express");
const router = express.Router();
const userController = require('../controller/userControllers');
const userMiddleware = require('../middleware/userMiddleware');

// Middlewares
const validationsRegister = require('../middleware/validateRegistreMiddleware');
const validationsLogin = require('../middleware/validateLoginMiddeware');
const guestMiddleware = require('../middleware/guessMiddleware');

// Login
router.get("/login", guestMiddleware, userController.login);
router.post("/login", validationsLogin, userController.loginProcess);

// Register
router.get("/register", guestMiddleware, userController.register);
router.post("/register", validationsRegister, userController.registerProcess);

// Logout
router.get("/logout", userController.logout);

// Config
router.post("/config", userController.updateUser);
router.get("/config", userMiddleware, userController.config);

module.exports = router;
