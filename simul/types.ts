export type Characterf={
    id:string,
    name:string,
    episode:Episodef[]
}

export type Episodef = {
    id:string,
    name:string,
    characters:Characterf[]
}

export type Characterfromapi={
    id:string,
    name:string,
    episode:string[]
}

export type Episodefromapi = {
    id:string,
    name:string,
    characters:string[]
}