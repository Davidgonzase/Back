import {Request,Response} from "express"
import { mascotmodel } from "../../db/mascotschema.ts";

export const deletemascot = async (req:Request,res:Response) => {
    const {id} = req.params;
    const deleted = await mascotmodel.deleteOne({_id:id})
    if(deleted.deletedCount==0)return res.status(404).send("No mascot found with id: "+id)
    return res.status(200).send("OK")

}