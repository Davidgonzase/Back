import {Request,Response} from "express";
import { contactmodel } from "../../db/schema.ts";
import {contactresponse} from "../../types.ts"
import {load} from "https://deno.land/std@0.224.0/dotenv/mod.ts"

export const deletecontact = async (req:Request,res:Response) => {
    const {dni} = req.params;
    const response = await contactmodel.findOneAndDelete({"DNI":dni})
    if(!response)return res.status(404).send("DNI not found")
    return res.status(200).send("OK")
}