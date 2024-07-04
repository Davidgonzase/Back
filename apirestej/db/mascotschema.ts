import mongoose from "mongoose";
import { mascot } from "../types.ts";

const schema = mongoose.Schema;

const mascotschema = new schema(
    {
        name:{type:String,required:true},
        type:{type:String,required:true},
        description:{type:String,required:true},
    },
    {timestamps:true}
)

export type mascotmodeltype = mongoose.Document & Omit<mascot,"id">
export const mascotmodel = mongoose.model<mascotmodeltype>("Mascot",mascotschema)