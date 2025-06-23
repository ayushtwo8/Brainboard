import { Request, Response } from "express";
import { FilterQuery } from "mongoose";

import { ContentModel } from "../models/contentModel";

export const addContent = async (req: Request, res: Response) => {
    try{
        const { link, type, description, title } = req.body;

        if(!link || !type || !title){
            res.status(400).json({
                message: "All field required"
            })
            return;
        }
        const content = await ContentModel.create({
            title,
            link, 
            type,
            description,
            userId: req.userId,
            tags: []
        });

        res.status(201).json({
            message: "Content added"
        });
    }catch(error){
        console.error("addContent controller error: ", addContent);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }    
}

export const getUserContent = async (req: Request, res: Response) => {
    try{
        const userId = req.userId;
        const searchQuery = req.query.search as string;

        // dynamic filter
        const filter: FilterQuery<typeof ContentModel> = { userId };

        if(searchQuery){
            filter.title = { $regex: searchQuery, $options: "i"}; // case insensitive search
        }

        const content = await ContentModel.find(filter).populate("userId", "email");

        res.status(200).json({
            content
        })
    } catch(error){
        console.error("getUserContent controller error: ", error);
        
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const deleteContent = async (req: Request, res: Response) => {
    try{
        const contentId = req.body.id;
        const userId = req.userId;

        await ContentModel.deleteOne({
            _id: contentId,
            userId
        });
        
        res.status(200).json({ message: "Content deleted"})
    } catch(error){
        console.error("deleteContent controller error: ", error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}