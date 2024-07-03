import { contacmodeltype } from "../db/schema.ts";
import { getContact } from "./query/getcontact.ts";
import { getContacts } from "./query/getcontacts.ts";

export const Query ={
    getContact: async (_:unknown,args:{id:string}):Promise<contacmodeltype>=>{
        return await getContact(args.id)
    },
    getContacts:async():Promise<contacmodeltype[]>=>{
        return await getContacts()
    }
}