import { GraphQLError } from "graphql"
import { contacmodel } from "../../db/schema.ts"

export const deleteContact = async (id:string):Promise<boolean> => {
    const result = await contacmodel.deleteOne({_id:id})
    if(result){return true;}else return false
}