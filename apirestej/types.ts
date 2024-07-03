export enum animals {
    DOG,CAT,SNAKE
}

export type person = {
    name:string,
    id:string,
    mascots?:[mascot]
}

export type mascot = {
    name:string,
    description:string,
    type:animals,
    id:string
    owner?:person
}