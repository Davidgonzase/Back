import { Document, model, Schema } from "mongoose";
import { bankaccount } from "../types.ts"

const accountschema = new Schema(
  {
    idbank: { type: String, required: true },
    idperson: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    balance: { type: Number, required: false, default: 0},
    phone: { type: String, required: true },
    country: { type: String, required: true },
    petitions: { type: [Schema.Types.ObjectId],ref:"Petition",required:false,default: []}
  },
  { timestamps: true },
);

export type accountmodeltype = Document & Omit<bankaccount,"id">

export default model<accountmodeltype>("Account", accountschema);