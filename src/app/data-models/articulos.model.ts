export interface articulosModel {
    Id: number;
    Codigo: string;
    Descripcion: string;
    Familia:string;
    UM: string;
    UltimoCosto:string;
    PrecioVenta: string;
    Iva:string;
    Ieps:string;
    Usuario: String;
    FechaAct:Date;
    FechaReg:Date;
  }

  export interface insertArticuloModel{
    Codigo: string;
    Descripcion: string;
    Familia:number;
    UM: number;
    UltimoCosto:number;
    PrecioVenta: number;
    Iva:  number;
    Ieps:number;
    Usuario: number;
  }

  export interface updateArticuloModel{
    Id:number;
    Codigo: string;
    Descripcion: string;
    Familia:number;
    UM: number;
    UltimoCosto:number;
    PrecioVenta: number;
    Iva:  number;
    Ieps:number;
    Usuario: number;
  }
  