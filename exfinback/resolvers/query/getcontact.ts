import { contacmodel, contacmodeltype } from "../../db/schema.ts";
import { GraphQLError } from "graphql";

export const getContact = async (id:string):Promise<contacmodeltype>=>{
    let response;
    try {
        response = await contacmodel.findById({_id:id})
        if(!response)throw new Error()
        return response;
    } catch (error) {
        throw new GraphQLError("No user found with id"+id,{extensions:{code:"NOT_FOUND"}})
    }
}