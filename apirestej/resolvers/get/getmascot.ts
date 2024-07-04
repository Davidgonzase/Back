import {Request,Response} from "express";
import { mascotmodel } from "../../db/mascotschema.ts";
import { mascot} from "../../types.ts";

export const getmascot = async(req:Request,res:Response) =>{
    const {id} = req.params;
    try {
        const response = await mascotmodel.findById(id) as mascot;
        if(!response)throw new Error;

        const mascot:mascot = {
            name:response.name,
            id:response.id,
            description:response.description,
            type:response.type,
        }
        res.status(200).send(mascot)
    } catch (error) {
        res.status(404).send("Mascot not found")
    }
}