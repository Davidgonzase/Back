import mongoose from "mongoose"
import { person } from "../types.ts";
const schema = mongoose.Schema;

const personschema = new schema(
    {
      name:{type:String,required:true},
      mascots:{type:[schema.Types.ObjectId],required:true}
    },{timestamps: true}
)

export type personmodeltype  = mongoose.Document & Omit<person,"id">
export const personmodel = mongoose.model<personmodeltype>("Person",personschema)