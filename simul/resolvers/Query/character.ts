import { GraphQLError } from "graphql";
import { Characterfromapi } from "../../types.ts";

export const character = async (id:string) :Promise<Characterfromapi> =>{
    const url = ("https://rickandmortyapi.com/api/character/"+id);
    const response = await fetch(url)
    if(response.status!=200)throw new GraphQLError("No character found with id:"+ id,{extensions:{code:"NOT_FOUND"}})
    return await response.json() as Characterfromapi
}