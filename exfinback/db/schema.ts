import mongoose from "mongoose"
import { Contactdb } from "../types.ts";
import {GraphQLError} from "graphql"

const schema = mongoose.Schema;

const contactschema = new schema(
    {
        name_surname:{type:String,required:true},
        phone:{type:String,required:true},
        country:{type:String,required:true},
        latitude:{type:String,required:true},
        longitude:{type:String,required:true}
    },
    {timestamps:true}
) 

export type contacmodeltype = mongoose.Document & Omit<Contactdb, "id">

contactschema.pre("save",async function (next){
    const result = await mongoose.models.Contact.findOne({phone:this.phone})
    if(result){
        if(result.phone == this.phone)next(new GraphQLError("Ya existe un usuario con mismo telefono",{extensions:{code:"ALREADY_EXISTS"}}))
    }

    next()
})

export const contacmodel = mongoose.model<contacmodeltype>("Contact",contactschema)