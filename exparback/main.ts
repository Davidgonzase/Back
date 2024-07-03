import express from "express";
import mongoose from "mongoose";
import {load} from "https://deno.land/std@0.224.0/dotenv/mod.ts"
import { addcontact } from "./resolvers/post/postcontact.ts";
import { getcontacts } from "./resolvers/get/getcontacts.ts";
import { getcontact } from "./resolvers/get/getcontact.ts";
import { deletecontact } from "./resolvers/delete/deletecontact.ts";

const env = await load();
const MONGO_KEY = env.MONGO_KEY || Deno.env.get("MONGO_KEY")

if(!MONGO_KEY||MONGO_KEY==""){
  console.log("MONGO_KEY MISSING")
  Deno.exit();
}else{
  try {
    await mongoose.connect(MONGO_KEY)
    console.log("Connected to Mongo")
  } catch (error) {
    console.log("Failed connection to Mongo")
    console.log(error)
    Deno.exit()
  }
}

const app = express();
app.use(express.json())

app.get("/api/contactos",getcontacts)
app.get("/api/contactos/:dni",getcontact)
app.post("/api/contactos",addcontact)
app.delete("/api/contactos/:dni",deletecontact)
app.listen(8000,()=>{{
  console.log("Ready and listening at port 8000")
}})