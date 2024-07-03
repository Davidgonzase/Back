import {Request,Response} from "express";
import { contactmodel } from "../../db/schema.ts";

export const addcontact = async (req:Request,res:Response) => {
    const {DNI,name,surname,email,postalcode,isocode} = req.body;
    if(!DNI||!name||!surname||!email||!postalcode||!isocode){
        return res.status(500).send("Missing properties")
    }

    const url = "https://zip-api.eu/api/v1/info/"+isocode+"-"+postalcode;
    const response = await fetch(url)
    if(response.status != 200)return res.status(500).send("Postalcode or isocode not valid")
    const content = await response.json();
    const region = await fetch("https://restcountries.com/v3.1/alpha/"+isocode)
    const regionres = await region.json()
    const newcontact = new contactmodel({DNI,name,surname,email,postalcode,country:content.country_code,city:content.place_name,regioncapital:regionres[0].region+"/"+regionres[0].capital[0]})
    try {
        await newcontact.save()
        res.status(200).send("OK")
    } catch (error) {
        return res.status(400).send("DNI already exists")
    }
}