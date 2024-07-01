import express from "express";
import mongoose from "mongoose";

const MONGO_KEY = Deno.env.get("MONGO_KEY");

console.log(MONGO_KEY)

if(!MONGO_KEY||MONGO_KEY==""){
  console.log("Missing MONGO_KEY")
  Deno.exit();
}

try {
  await mongoose.connect(MONGO_KEY)
} catch (error) {
  console.log("Unable to connect to mongoose")
  console.log(error)
  Deno.exit()
}


const app = express();

app.listen(8000, ()=>{console.log("API/REST ")})