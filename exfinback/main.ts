import mongoose from "mongoose"
import {startStandaloneServer} from "@apollo/server/standalone"
import {ApolloServer} from "@apollo/server"
import {load} from "https://deno.land/std@0.224.0/dotenv/mod.ts"
import { typeDefs } from "./gql/schema.ts";
import { Query } from "./resolvers/Query.ts";
import { Mutations } from "./resolvers/Mutations.ts";
import { Contact } from "./resolvers/Contact.ts";

const env = await load()
const MONGO_KEY = env.MONGO_KEY || Deno.env.get("MONGO_KEY")

if(!MONGO_KEY||MONGO_KEY==""){
  console.log("MONGO_KEY missing")
  Deno.exit()
}else{
  try {
    await mongoose.connect(MONGO_KEY)
    console.log("Connected to MONGO")
  } catch (error) {
    console.log("Failed to connect to MONGO")
    console.log(error)
    Deno.exit()
  }
}

const server = new ApolloServer({typeDefs,resolvers:{
  Query,
  Mutations,
  Contact
}})

const {url} = await startStandaloneServer(server)
console.log("Running at " +url)
