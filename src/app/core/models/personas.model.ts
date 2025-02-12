export interface GetPersonasModel {
    Id:number;
    Nombre:string;
    ApPaterno:string;
    ApMaterno:string;
    Direccion:string;
    Usuario:string;
    FechaAct:Date;
    FechaReg:Date;
}

export interface InsertPersonasModel {
    Nombre:string;
    ApPaterno:string
    ApMaterno:string;
    Direccion:string;
    Sucursal:number;
    Usuario:number;
}

export interface UpdatePersonasModel {
    Id:number
    Nombre:string;
    ApPaterno:string
    ApMaterno:string;
    Direccion:string;
    Usuario:number;
}
