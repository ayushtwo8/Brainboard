import { Request, Response } from "express";
import { FilterQuery } from "mongoose";

import { ContentModel } from "../models/contentModel";

export const addContent = async (req: Request, res: Response) => {
    try{
        const { link, type, title, tags } = req.body;

        if (!link || !type || !title) {
            res.status(400).json({
                message: "Title, link, and type are required fields."
            });
            return;
        }
        const newContent  = await ContentModel.create({
            title,
            link, 
            type,
            tags: tags || [],
            userId: req.userId
        });

        res.status(201).json({
            message: "Content added successfully",
            content: newContent
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

        const content = await ContentModel.find(filter).populate("userId", "email").sort({createdAt: -1});

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
        const { id: contentId } = req.params;
        const userId = req.userId;

        const result = await ContentModel.deleteOne({
            _id: contentId,
            userId: userId // ✅ CRUCIAL security check remains
        });
        
        if (result.deletedCount === 0) {
            res.status(404).json({ message: "Content not found or you don't have permission to delete it." });
            return;
        }

        res.status(204).json({ message: "Content deleted"})
    } catch(error){
        console.error("deleteContent controller error: ", error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}