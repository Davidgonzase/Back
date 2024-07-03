
import { GraphQLError } from "graphql";
import { contacmodel } from "../../db/schema.ts";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts"

export const addContact = async (name_surname: string, phone: string): Promise<string> => {
    try {
        const env = await load()
        const API_KEY = env.API_KEY || Deno.env.get("API_KEY")

        if(!API_KEY)throw new GraphQLError("Missing API KEY",{extensions:{code:"Missing API KEY"}})

        if (!name_surname || !phone) throw new GraphQLError("Missing parameters", { extensions: { code: "MISSING_PARAMETERS" } })
        const response = await fetch('https://api.api-ninjas.com/v1/validatephone?number=' + phone, {
            headers: {
                "X-Api-Key": API_KEY
            },
        })
        if (!response) throw new GraphQLError("API Error", { extensions: { code: "INTERNAL_ERROR" } })
        const phoneapi = await response.json();
        if (phoneapi.error) throw new GraphQLError("Phone not valid", { extensions: { code: "NOT_VALID" } })
        const country = phoneapi.country
        const countryres = await fetch('https://api.api-ninjas.com/v1/country?name=' + country, {
            headers: {
                'X-Api-Key': API_KEY
            },
        })
        if (!countryres) throw new GraphQLError("API Error", { extensions: { code: "INTERNAL_ERROR" } })
        const location = await countryres.json();
        if (location.length == 0) throw new GraphQLError("No country", { extensions: { code: "INTERNAL_ERROR" } })

        const capitallocation = await fetch('https://api.api-ninjas.com/v1/geocoding?city=' + location.capital + "&country=" + country, {
            headers: {
                'X-Api-Key': API_KEY
            },
        })
        if (!capitallocation) throw new GraphQLError("API Error", { extensions: { code: "INTERNAL_ERROR" } })
        const truelocation = await countryres.json();
        if (truelocation.length == 0) throw new GraphQLError("No city", { extensions: { code: "INTERNAL_ERROR" } })

        const longitude = truelocation[0].longitude
        const latitude = truelocation[0].latitude

        const newmodel = new contacmodel({
            name_surname: name_surname,
            phone: phone,
            country: country,
            longitude: longitude,
            latitude: latitude
        })
        await newmodel.save()
        return "Ok";
    } catch (error) {
        throw new GraphQLError(error)
    }
}
