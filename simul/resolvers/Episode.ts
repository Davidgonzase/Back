import { GraphQLError } from "graphql";
import {Characterfromapi, Episodefromapi } from "../types.ts";

export const Episode={
    characters: async(parent:Episodefromapi):Promise<Characterfromapi[]>=>{
        return await Promise.all(parent.characters.map(async (e)=>{
            const response = await fetch(e);
            if(response.status!=200)throw new GraphQLError("No character found with id:"+ e,{extensions:{code:"NOT_FOUND"}});
            return await response.json() as Characterfromapi   
        }))
    }
}