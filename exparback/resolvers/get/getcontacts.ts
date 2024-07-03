import {Request,Response} from "express";
import { contactmodel } from "../../db/schema.ts";

export const getcontacts = async (req:Request,res:Response) => {
    const response = await contactmodel.find()
    return res.send(response.map((e)=>{return{"DNI":e.DNI,"name":e.name}}))
}