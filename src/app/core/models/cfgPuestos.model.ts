export interface cfgPuestos {
    Id:number;
    PUESTO:string;
    DESCRIPCION:string;
    FECHAHORA:string;
    USUARIO:string;
}

export interface insertCfgPuestos {
    puesto:string;
    descripcion:string;
    usuario:number;
}

export interface updateCfgPuestos {
    id:number;
    puesto:string;
    descripcion:string;
    usuario:number;
}