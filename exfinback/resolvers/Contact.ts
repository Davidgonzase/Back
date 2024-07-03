import { contacmodeltype } from "../db/schema.ts";
import { GraphQLError } from "graphql";
import {load} from "https://deno.land/std@0.224.0/dotenv/mod.ts"

export const Contact={
    hour: async (parent:contacmodeltype):Promise<string> => {

        const env = await load()
        const API_KEY = env.API_KEY || Deno.env.get("API_KEY")

        if(!API_KEY)throw new GraphQLError("Missing API KEY",{extensions:{code:"Missing API KEY"}})

        const hourres = await fetch('https://api.api-ninjas.com/v1/worldtime?lat=' +parent.latitude+ "&lon=" + parent.longitude, {
            headers: {
                'X-Api-Key': API_KEY
            },
        })
        if (!hourres) return "";
        const truelocation = await hourres.json();
        return truelocation.datetime;;
    }
}