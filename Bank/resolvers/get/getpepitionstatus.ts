import {Request,Response} from "express";
import petitionmodel from "../../db/petition.ts"
import { petition } from "../../types.ts"; 

const getpetitionstatus = (req:Request,res:Response)=>{
    const petitionid = req.paramms.id

    
    if(!petitionid){
        res.send("Invalid petition token")
        return;
    }
    try {
        const currentpetition:petition = petitionmodel.findById(petitionid) as unknown as petition
        res.send(currentpetition.status)
    } catch (error) {
        res.send(error)
    }
}

export default getpetitionstatus;