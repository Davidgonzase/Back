
import { GraphQLError } from "graphql";
import { contacmodel, contacmodeltype } from "../../db/schema.ts";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts"

export const updateContact = async (id: string, name_surname?: string, phone?: string): Promise<contacmodeltype> => {
    try {

        const current = await contacmodel.findOne({ _id: id });

        if (!current) {
            throw new GraphQLError("User not found", { extensions: { code: "NOT_FOUND" } })
        }
        current.name_surname = name_surname || current.name_surname

        if (phone) {
            const env = await load()
            const API_KEY = env.API_KEY || Deno.env.get("API_KEY")

            if (!API_KEY) throw new GraphQLError("Missing API KEY", { extensions: { code: "Missing API KEY" } })

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

            const capitallocation = await fetch('https://api.api-ninjas.com/v1/geocoding?city=' + location[0].capital + "&country=" + country, {
                headers: {
                    'X-Api-Key': API_KEY
                },
            })
            if (!capitallocation) throw new GraphQLError("API Error", { extensions: { code: "INTERNAL_ERROR" } })
            const truelocation = await capitallocation.json();
            if (truelocation.length == 0) throw new GraphQLError("No city", { extensions: { code: "INTERNAL_ERROR" } })

            const longitude = truelocation[0].longitude
            const latitude = truelocation[0].latitude

            current.phone = phone
            current.country = country
            current.longitude = longitude
            current.latitude = latitude
        }

        await current.save()
        return current;
    } catch (error) {
        throw new GraphQLError(error)
    }
}
