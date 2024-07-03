import { Contactdb } from "../types.ts";
import { addContact } from "./mutations.ts/addcontact.ts";
import { deleteContact } from "./mutations.ts/deletecontact.ts";

export const Mutations={
    addContact: (_:unknown,args:{nameandsurname:string,phone:string}):Promise<string>=>{
        return addContact(args.nameandsurname,args.phone);
    },
    deleteContact: (_:unknown,args:{id:string}):Promise<boolean>=>{
        return deleteContact(args.id)
    },
    /*updateContact: (_:unknown,args:{id:string,ameandsurname:String,phone:String}):Promise<Contactdb>=>{

    }*/
}