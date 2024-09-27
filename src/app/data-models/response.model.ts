export interface defaultApiResponse {
    StatusCode: number;
    success: boolean;
    fecha: string;
    message: string;
    response: {
        data: any;
        msg: string;
    };
}