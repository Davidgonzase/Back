import { Document, model, Schema } from "mongoose";
import { petition } from "../types.ts"

const petitionschema = new Schema(
  {
    description: { type: String, required: true },
    idbank1: { type: Schema.Types.ObjectId,ref:"Account",required: true },
    idbank2: { type: Schema.Types.ObjectId,ref:"Account",required: true },
    operation: { type: String, required: true },
    number: { type: Number, required: true },
    status: { type: Boolean, default: false, required: false }
  },
  { timestamps: true },
);

export type petitionmodeltype = Document & Omit<petition,"id">

export default model<petitionmodeltype>("Petition", petitionschema);