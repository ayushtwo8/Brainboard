"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = require("../schemas/userSchema");
const userModel_1 = require("../models/userModel");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = userSchema_1.userSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            message: result.error.errors
        });
        return;
    }
    try {
        const existingUser = yield userModel_1.UserModel.findOne({ email: (_a = result.data) === null || _a === void 0 ? void 0 : _a.email });
        if (existingUser) {
            res.status(409).json({
                message: "User already exists"
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(result.data.password, 10);
        yield userModel_1.UserModel.create({
            name: result.data.name,
            email: result.data.email,
            password: hashedPassword
        });
        res.status(201).json({
            message: "User signed up successfully"
        });
    }
    catch (error) {
        console.error("Signup controller error: ", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = userSchema_1.userSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            message: result.error.errors
        });
        return;
    }
    try {
        const user = yield userModel_1.UserModel.findOne({ email: (_a = result.data) === null || _a === void 0 ? void 0 : _a.email });
        if (!user) {
            res.status(401).json({
                message: "No user found"
            });
            return;
        }
        const matched = yield bcrypt_1.default.compare(result.data.password, user.password);
        if (!matched) {
            res.status(400).json({
                message: "Invalid credentials"
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ email: result.data.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            token: token
        });
    }
    catch (error) {
        console.error("Login controller error: ", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.login = login;
