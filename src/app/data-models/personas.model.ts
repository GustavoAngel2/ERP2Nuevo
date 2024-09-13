export interface GetPersonasModel {
    Id:number;
    Nombre:string;
    ApPaterno:string;
    ApMaterno:string;
    Direccion:string;
    Usuario:string;
    FechaAct:Date;
    FechaReg:Date;
    Mensaje:string;
}
export interface InsertPersonasModel {
    Nombre:string;
    ApPaterno:string
    ApMaterno:string;
    Direccion:string;
    Usuario:number;
    Pass:string;
}