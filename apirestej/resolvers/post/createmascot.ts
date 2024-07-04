import {Request,Response} from "express"
import {animals} from "../../types.ts"
import { mascotmodel } from "../../db/mascotschema.ts";

export const createmascot = async (req:Request,res:Response)=>{
    const {name,type,description} = req.body;
    if(!name||!type||!description)return res.status(400).send("Missingm parameters")
    if(!Object.keys(animals).includes(type))return res.status(400).send(type+" is not a valid tipe, use: "+Object.keys(animals))
    const newmascot = new mascotmodel({
        name:name,
        type:type,
        description:description
    })

    try {
        await newmascot.save()
        return res.status(200).send(newmascot)
    } catch (error) {
        return res.status(500).send(error)
    }
}