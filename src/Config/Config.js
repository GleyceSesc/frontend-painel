import { jwtDecode } from "jwt-decode";
export const token =  localStorage.getItem('token') ?? null;
export const jwt_Decode = token ? jwtDecode(token) : null;
export const modulos_ativos = token ? jwt_Decode.modules.map((item)=> item) : null;
export const id_usuario = token ? jwt_Decode[0].ID : null;



