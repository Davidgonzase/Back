import { GraphQLError } from "graphql";
import { Characterfromapi } from "../../types.ts";

export const characters = async (ids:string[]) :Promise<Characterfromapi[]> =>{
    const result = await Promise.all(ids.map(async (e)=>{
        const url = ("https://rickandmortyapi.com/api/character/"+e);
        const response = await fetch(url);
        if(response.status!=200)throw new GraphQLError("No character found with id:"+ e,{extensions:{code:"NOT_FOUND"}});
        return await response.json() as Characterfromapi
    }))
    return result
}