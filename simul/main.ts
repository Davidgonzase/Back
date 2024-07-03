import { startStandaloneServer } from "@apollo/server/standalone"
import { ApolloServer } from "@apollo/server"
import { typeDefs } from "./gql/schema.ts";
import { Query } from "./resolvers/Query.ts";
import { Character } from "./resolvers/Character.ts";
import { Episode } from "./resolvers/Episode.ts";

const server = new ApolloServer({
  typeDefs, 
  resolvers: {
    Query,
    Character,
    Episode
  }
})

const {url} = await startStandaloneServer(server);
console.log("Server running at " + url)