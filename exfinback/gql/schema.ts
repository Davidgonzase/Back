export const typeDefs=`#graphql
type Contact {
    name_surname:String!
    phone:String!
    hour:String!
    country:String!
    id:ID!
}

type Query {
    getContact(id:ID!):Contact!
    getContacts:[Contact!]!
}

type Mutation {
    addContact(nameandsurname:String!,phone:String!):String!
    deleteContact(id:ID!):Boolean!
    updateContact(id:ID!,nameandsurname:String,phone:String):Contact!

}
`
