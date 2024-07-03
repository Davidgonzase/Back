import mongoose from "mongoose";
import { mascot } from "../types.ts";
import { personmodel } from "./personschema.ts";

const schema = mongoose.Schema;

const mascotschema = new schema(
    {
        name:{type:String,required:true},
        type:{type:String,required:true},
        description:{type:String,required:true},
        owner:{type:schema.Types.ObjectId,required:true}
    },
    {timestamps:true}
)

export type mascotmodeltype = mongoose.Document & Omit<mascot,"id">

mascotschema.pre("save", function (next) {
    try {
        personmodel.findById({_id:this.owner})
        next();
    } catch (error) {
        return next(new Error("Owner not found"))
    }
})

export const mascotmodel = mongoose.model<mascotmodeltype>("Mascot",mascotschema)