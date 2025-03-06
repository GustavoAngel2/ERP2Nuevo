export interface cfgColaboradores {
    Id: number;
    NUM_EMPLEADO: string;
    ID_PERSONA: string;
    ID_SEDE: string;
    ID_PERIODO: string;
    ID_DEPARTAMENTO: string;
    ID_PUESTO: string;
    TIPO_PERSONA: string;
    FECHA_INGRESO: string;
    UsuarioActualiza: string;
}

export interface insertCfgColaboradores {
    numEmpleado: string,
    idPersona: number,
    idSede: number,
    idPeriodo: number,
    idDepartamento: number,
    idPuesto: number,
    tipoPersona: number,
    usuarioActualiza: number
}

export interface updateCfgColaboradores {
    id:number;
    numEmpleado: string,
    idPersona: number,
    idSede: number,
    idPeriodo: number,
    idDepartamento: number,
    idPuesto: number,
    tipoPersona: number,
    usuarioActualiza: number
}