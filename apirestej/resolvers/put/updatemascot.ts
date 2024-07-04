import {Request,Response} from "express";
import { mascotmodel } from "../../db/mascotschema.ts";
import { animals } from "../../types.ts";

export const updatemascot = async (req:Request,res:Response) => {
    const {id} = req.params;
    if(!id)return res.status(400).send("Missing id")
    const current = await mascotmodel.findOne({_id:id})
    if(!current)return res.status(404).send("Mascot not found with id "+id)
    const {name,type,description} = req.body;
    current.name= name || current.name
    current.description= description || current.description
    if(type){
        if(!Object.keys(animals).includes(type))return res.status(400).send(type+" is not a valid tipe, use: "+Object.keys(animals))
        current.type = type
    }

    try {
        await current.save()
        return res.status(200).send(current)
    } catch (error) {
        return res.status(500).send(error)
    }

}