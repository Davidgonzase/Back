import mongoose from "mongoose";
import {contact} from "../types.ts"

const schema = mongoose.Schema;

const contactschema = new schema(
    {
        DNI:{type:String,unique:true,required:true},
        name:{type:String,required:true},
        surname:{type:String,required:true},
        email:{type:String,required:true},
        city:{type:String,required:true},
        country:{type:String,required:true},
        postalcode:{type:String,required:true},
        regioncapital:{type:String,required:true}
    },
    {timestamps:true}
)

export type contacmodeltype = mongoose.Document & Omit<contact,"id">;
export const contactmodel = mongoose.model<contacmodeltype>("Contact",contactschema);