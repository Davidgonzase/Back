import { Contactdb } from "../types.ts";
import { addContact } from "./mutations.ts/addcontact.ts";
import { deleteContact } from "./mutations.ts/deletecontact.ts";
import { updateContact } from "./mutations.ts/updatecontac.ts";

export const Mutation={
    addContact: (_:unknown,args:{nameandsurname:string,phone:string}):Promise<string>=>{
        return addContact(args.nameandsurname,args.phone);
    },
    deleteContact: (_:unknown,args:{id:string}):Promise<boolean>=>{
        return deleteContact(args.id)
    },
    updateContact: (_:unknown,args:{id:string,nameandsurname:string,phone:string}):Promise<Contactdb>=>{
        return updateContact(args.id,args.nameandsurname,args.phone)
    }

}

