import { GraphQLError } from "graphql";
import { Characterfromapi, Episodefromapi } from "../types.ts";

export const Character = {
    episode: async(parent:Characterfromapi):Promise<Episodefromapi[]>=>{
        const results = await Promise.all(parent.episode.map(async (e)=>{
            const response = await fetch(e);
            if(response.status!=200)throw new GraphQLError("No character found with id:"+ e,{extensions:{code:"NOT_FOUND"}});
            return await response.json() as Episodefromapi   
        }))
        return results;
    }
}