import express from "express";
import mongoose from "mongoose";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import { getall } from "./resolvers/get/getallmascots.ts";
import { getmascot } from "./resolvers/get/getmascot.ts";
import { createmascot } from "./resolvers/post/createmascot.ts";
import { updatemascot } from "./resolvers/put/updatemascot.ts";
import { deletemascot } from "./resolvers/delete/deletemascot.ts";

const env = await load();
const MONGO_KEY = env.MONGO_KEY || Deno.env.get("MONGO_KEY")

if(!MONGO_KEY||MONGO_KEY==""){
  console.log("Missing MONGO_KEY")
  Deno.exit();
}

try {
  await mongoose.connect(MONGO_KEY)
  console.log("Connected to Mongoose...")
} catch (error) {
  console.log("Unable to connect to mongoose")
  console.log(error)
  Deno.exit()
}

const app = express();
app.use(express.json())

app.get("/api/mascotas",getall)
app.get("/api/mascotas/:id",getmascot)

app.post("/api/mascotas",createmascot)

app.put("/api/mascotas/:id",updatemascot)

app.delete("/api/mascotas/:id",deletemascot)

app.listen(8000, ()=>{console.log("API/REST on port 8000")})