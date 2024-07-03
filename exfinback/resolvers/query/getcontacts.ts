import { contacmodel, contacmodeltype } from "../../db/schema.ts";

export const getContacts= async ():Promise<contacmodeltype[]> => {
    return await contacmodel.find()
}