export type bankaccount={
    id:string,
    name:string,
    surname:string,
    password:string,
    petitions:petition[],
    balance:number,
    country:string,
    phone:string,
    idbank:string,
    idperson:string
} 

export type petition={
    id: string,
    description: string,
    idbank1: string,
    idbank2: string,
    operation: string,
    number: number,
    status: boolean
} 