import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { userSchema } from "../schemas/userSchema";
import { UserModel } from "../models/userModel";

export const signup = async (req: Request, res:Response) => {
    const result = userSchema.safeParse(req.body);
    if(!result.success){
        res.status(400).json({
            message: result.error.errors
        })
        return;
    }
    try {

        const existingUser = await UserModel.findOne({email: result.data?.email});
        if(existingUser){
            res.status(409).json({
                message: "User already exists"
            })
            return;
        }
    
        const hashedPassword = await bcrypt.hash(result.data.password, 10);
    
        await UserModel.create({
            name: result.data.name,
            email: result.data.email,
            password: hashedPassword
        })
    
        res.status(201).json({
            message: "User signed up successfully"
        })
    } catch(error){
        console.error("Signup controller error: ",error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const login = async (req: Request, res: Response) => {
    const result = userSchema.safeParse(req.body);
    if(!result.success){
        res.status(400).json({
            message: result.error.errors
        })
        return;
    }

    try{
        const user = await UserModel.findOne({email: result.data?.email});
        if(!user){
            res.status(401).json({
                message: "No user found"
            })
            return;
        }

        const matched = await bcrypt.compare(result.data.password, user.password);
        if(!matched){
            res.status(400).json({
                message: "Invalid credentials"
            })
            return;
        }

        const token = jwt.sign({email: result.data.email}, process.env.JWT_SECRET as string, { expiresIn: "1h"});

        res.status(200).json({
            token: token
        })

    } catch(error){
        console.error("Login controller error: ",error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}