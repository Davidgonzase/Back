import { GraphQLError } from "graphql"
import { contacmodel } from "../../db/schema.ts"

export const deleteContact = async (id:string):Promise<boolean> => {
    const result = await contacmodel.deleteOne({_id:id})
    console.log(result)
    if(result.deletedCount>0){return true;}else return false
}