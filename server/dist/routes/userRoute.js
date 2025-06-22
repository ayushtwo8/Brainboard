"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.Router)();
userRouter.post('/signup', userController_1.signup);
userRouter.post('/login', userController_1.login);
exports.default = userRouter;
