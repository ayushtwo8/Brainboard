import { Request, Response } from "express"

import { LinkModel } from "../models/linkModel";
import { random } from "../utils/random";
import { ContentModel } from "../models/contentModel";
import { UserModel } from "../models/userModel";

export const shareContent = async (req: Request, res: Response) => {
    try{

        const { share } = req.body;     
    
        if(share){
            const existingLink = await LinkModel.findOne({
                userId: req.userId
            })
    
            if(existingLink){
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
    
            const hash = random(10);
    
            await LinkModel.create({
                userId: req.userId,
                hash
            });
    
            res.status(200).json(hash);
        } else {
            await LinkModel.deleteOne({
                userId: req.userId
            })
            res.json({
                message: "Link removed"
            })
        }
    } catch(error){
        console.error("shareContent controller error: ", error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getSharedContent = async (req: Request, res: Response) => {
    try{
        const hash = req.params.shareLink;

        const link = await LinkModel.findOne({
            hash
        })
        if(!link){
            res.status(404).json({
                message: "Invalid link"
            });
            return;
        }

        const content = await ContentModel.find({
            userId: link.userId
        });

        const user = await UserModel.findOne({
            _id: link.userId
        })

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.json({
            name: user.name,
            content
        })
    } catch(error){
        console.error("shareContent controller error: ", error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}