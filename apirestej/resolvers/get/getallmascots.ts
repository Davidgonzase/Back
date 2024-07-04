import {Request,Response} from "express";
import { mascotmodel } from "../../db/mascotschema.ts";

export const getall= async (req:Request,res:Response) => {
    const results = await mascotmodel.find();
    res.status(200).send(results);
}