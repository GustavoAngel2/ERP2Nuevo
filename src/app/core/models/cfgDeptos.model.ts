export interface cfgDeptos {
  Id: number;
  NOMBRE: string;
  EXTENCION: string;
  ID_PERSONA: string;
  ABREVIATURA: string;
  HORA: string;
  FECHA: string;
  UsuarioActualiza:string;
}

export interface insertCfgDeptos {
    nombre: string,
    extension: number,
    idPersona: number,
    abreviatura: string,
    usuarioActualiza: number
}

export interface updateCfgDeptos {
    id: number,
    nombre: string,
    extension: number,
    idPersona: number,
    abreviatura: string,
    usuarioActualiza: number
}