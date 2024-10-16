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
    Familia:string;
    UM: string;
    UltimoCosto:string;
    PrecioVenta: string;
    Iva:string;
    Ieps:string;
    Usuario: String;
  }

  export interface updateArticuloModel{
    Id:number;
    Codigo: string;
    Descripcion: string;
    Familia:string;
    UM: string;
    UltimoCosto:string;
    PrecioVenta: string;
    Iva:string;
    Ieps:string;
    Usuario: String;
  }
  