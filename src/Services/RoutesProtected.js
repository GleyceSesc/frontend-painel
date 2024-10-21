import { useRoutes } from "react-router-dom";
import { routes } from "../Config/Routes";
import { token, jwt_Decode, modulos_ativos } from "../Config/Config";
const validateToken = () => {
    if (token) {
        if (!(new Date > new Date(jwt_Decode.exp * 1000)))
            return true;
        else {
            alert("Token Inválido!");
            setTimeout(() => {
                localStorage.clear();
                window.location.href = '/';
            }, 2000)
        }
    }
}

const IsLogin = validateToken();
const Modules = (key = null) => {
    return modulos_ativos && modulos_ativos.filter((item) => item?.modulo_id === key)[0];
}

const Rotas = (key = null) => {
    const currentRoute = GetRotas(key);
    return currentRoute[1]?.key;
}

const GetRotas = (pathName) => {
    const element = useRoutes(routes);
    const currentRoute = element ? routes.find((route) => route.path === pathName) : null;
    return [element, currentRoute];
};

const RoutesProtected = () => {
    const [element, currentRoute] = GetRotas(window.location.pathname);
    return element ? (getTypeRoute(currentRoute.type, currentRoute.key) ? element : window.location.pathname = '/') : window.location.pathname = '/';
};

function getTypeRoute(type, key = null) {
    return type === 'all' || type === 'logged' && IsLogin || type === 'protected' && permission(key) && IsLogin
}

const permission = (key) => {
    if (typeof key === 'string') {
        return Modules(GetRotas(key)[1]?.key);
    }
    else return Modules(key);
};

export { RoutesProtected, permission, Rotas, GetRotas, validateToken };