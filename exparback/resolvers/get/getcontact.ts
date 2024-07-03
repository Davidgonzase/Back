import {Request,Response} from "express";
import { contactmodel } from "../../db/schema.ts";
import {contactresponse} from "../../types.ts"
import {load} from "https://deno.land/std@0.224.0/dotenv/mod.ts"

export const getcontact = async (req:Request,res:Response) => {
    const {dni} = req.params;
    const response = await contactmodel.findOne({"DNI":dni})
    if(!response)return res.send(404).send("No person with such DNI")
    const env = await load();
    const weatherkey = env.WEATHER_KEY
    if(!weatherkey) return res.send(500).send("No WEATHER_KEY")
    const weatheresponse = await fetch("http://api.weatherapi.com/v1/current.json?key="+weatherkey+"&q="+response.city)
    const timeresponse = await fetch("http://worldtimeapi.org/api/timezone/"+response.regioncapital)
    const weather = await weatheresponse.json()
    const time = await timeresponse.json()
    const newresponse:contactresponse = {
        DNI:response.DNI,
        name:response.name,
        surname:response.surname,
        email:response.email,
        postalcode:response.postalcode,
        city:response.city,
        country:response.country,
        weather:weather.current.condition.text,
        hour:time.datetime
    }
    return res.status(200).send(newresponse)
}