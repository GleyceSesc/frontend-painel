import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import Login from '../Pages/Login';
import Dashboard from '../Components/Comum/Dashboard';
import { Styles, all } from '../Services/Style';
import Layout from '../Components/Layout';

//Usuario
import ListarUsuario from '../Pages/Usuário/Listar';
import CadastrarUsuario from '../Pages/Usuário/Cadastrar';
import EditarUsuario from '../Pages/Usuário/Editar';


//Clientes
import ListarCliente from '../Pages/Cliente/Listar';
import CadastrarClienteFisico from '../Pages/Cliente/Fisico/Cadastro';
import CadastrarClienteJuridico from '../Pages/Cliente/Juridico/Cadastro';
import EditarClienteJuridico from '../Pages/Cliente/Juridico/Editar';
import EditarClienteFisico from '../Pages/Cliente/Fisico/Editar';


//Perfil
import ListarPerfil from '../Pages/Perfil/Listar';
import CadastrarPerfil from '../Pages/Perfil/Cadastrar';
import EditarPerfil from '../Pages/Perfil/Editar';

//Unidade
import ListarUnidade from '../Pages/Unidade/Listar';
import EditarUnidade from '../Pages/Unidade/Editar';
import CadastrarUnidade from '../Pages/Unidade/Cadastrar';

//Categoria
import ListarCategoria from '../Pages/Categoria/Listar';
import EditarCategoria from '../Pages/Categoria/Editar';
import CadastrarCategoria from '../Pages/Categoria/Cadastrar';

//Active
import ActiveUsuario from '../Pages/Active/Cadastrar';
import LiberarAcesso from '../Pages/Active/Liberar-Acesso';
import IdentificadorGrupo from '../Pages/Active/Identificador-Grupo';

const addCssLink = (href) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    document.head.appendChild(link);
}

const addScripts = (src) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    document.head.appendChild(script);
}
export const routes = [
    {
        path: "/",
        to: "/login",
        element: <Login />,
        exact: true,
        type: "all",
        css: [],
    },
    {
        path: "/dashboard",
        element: <Layout children={<Dashboard />} title={'Dashboard'} />,
        type: "logged",
        css: [],
        script: []
    },
    {
        path: "/usuario-listar",
        element: <Layout children={<ListarUsuario />} title={'Lista de Usuários'} />,
        key: 1,
        type: "protected",
        css: [],
    },
    {
        path: "/usuario-cadastrar",
        element: <Layout children={<CadastrarUsuario />} title={'Cadastro de Usuários'} />,
        key: 2,
        type: "protected",
        css: [],
    },
    {
        path: "/usuario-editar",
        element: <Layout children={<EditarUsuario />} title={'Editar Usuários'} />,
        key: 3,
        type: "protected",
        css: [],
    },
    {
        path: "/usuario-deletar",
        key: 4,
        type: "protected",
    },
    {
        path: "/cliente-listar",
        element: <Layout children={<ListarCliente />} title={'Lista de Clientes'} />,
        key: 5,
        type: "protected",
        css: [],
    },
    {
        path: "/cliente-fisico-cadastrar",
        element: <Layout children={<CadastrarClienteFisico />} title={'Cadastro de Clientes'} />,
        key: 6,
        type: "protected",
        css: [],
    },
    {
        path: "/cliente-juridico-cadastrar",
        element: <Layout children={<CadastrarClienteJuridico />} title={'Cadastro de Clientes'} />,
        key: 6,
        type: "protected",
        css: [],
    },
    {
        path: "/cliente-juridico-editar",
        element: <Layout children={<EditarClienteJuridico />} title={'Editar Cliente'} />,
        key: 7,
        type: "protected",
        css: [],
    },
    {
        path: "/cliente-fisico-editar",
        element: <Layout children={<EditarClienteFisico />} title={'Editar Cliente'} />,
        key: 7,
        type: "protected",
        css: [],
    },
    {
        path: "/cliente-fisico-deletar",
        key: 8,
        type: "protected",
    },
    {
        path: "/cliente-juridico-deletar",
        key: 8,
        type: "protected",
    },
    {
        path: "/unidade-listar",
        element: <Layout children={<ListarUnidade />} title={'Lista de Unidades'} />,
        key: 9,
        type: "protected",
        css: [],
    },
    {
        path: "/unidade-cadastrar",
        element: <Layout children={<CadastrarUnidade />} title={'Cadastro de Unidades'} />,
        key: 10,
        type: "protected",
        css: [],
    },
    {
        path: "/unidade-editar",
        element: <Layout children={<EditarUnidade />} title={'Editar Unidades'} />,
        key: 11,
        type: "protected",
        css: [],
    },
    {
        path: "/unidade-deletar",
        key: 12,
        type: "protected",
        css: [],
    },
    {
        path: "/sub_categoria-listar",
        element: <Layout children={<ListarCategoria />} title={'Lista de Sub-Categoria'} />,
        key: 13,
        type: "protected",
        css: [],
    },
    {
        path: "/sub_categoria-cadastrar",
        element: <Layout children={<CadastrarCategoria />} title={'Cadastro de Sub-Categoria'} />,
        key: 14,
        type: "protected",
        css: [],
    },
    {
        path: "/sub_categoria-editar",
        element: <Layout children={<EditarCategoria />} title={'Editar Sub-Categoria'} />,
        key: 15,
        type: "protected",
        css: [],
    },
    {
        path: "/sub_categoria-inativar",
        key: 16,
        type: "protected",
        css: [],
    },
    {
        path: "/sub_categoria-ativar",
        key: 16,
        type: "protected",
        css: [],
    },
    {
        path: "/perfil-listar",
        element: <Layout children={<ListarPerfil />} title={'Lista de Perfis'} />,
        key: 17,
        type: "protected",
        css: [],
    },
    {
        path: "/perfil-cadastrar",
        element: <Layout children={<CadastrarPerfil />} title={'Cadastro de Perfil'} />,
        key: 18,
        type: "protected",
        css: [],
    },
    {
        path: "/perfil-editar",
        element: <Layout children={<EditarPerfil />} title={'Editar Perfil'} />,
        key: 19,
        type: "protected",
        css: [],
    },
    {
        path: "/perfil-deletar",
        key: 20,
        type: "protected",
    },
    {
        path: "/relatorio/:uuid",
        element: <Layout children={<Dashboard />} title={'Dashboard'} />,
        type: "logged",
        css: [],
        script: []
    },
    {
        path: "/grafico/:uuid",
        element: <Layout children={<Dashboard />} title={'Dashboard'} />,
        type: "logged",
        css: [],
        script: []
    },
    {
        path: "/active-usuario",
        element: <Layout children={<ActiveUsuario />} title={'Editar Perfil'} />,
        key: 21,
        type: "protected",
        css: [],
    },
    {
        path: "/liberar-acesso",
        element: <Layout children={<LiberarAcesso />} title={'Editar Perfil'} />,
        key: 22,
        type: "protected",
        css: [],
    },
    {
        path: "/identificador",
        element: <Layout children={<IdentificadorGrupo />} title={'Editar Perfil'} />,
        key: 23,
        type: "protected",
        css: [],
    },
]

const Rotas = () => {
    const element = useRoutes(routes);
    useEffect(() => {
        const currentRoute = routes.find((route) => route.path === window.location.pathname);
        if (currentRoute) {
            currentRoute.css.forEach((href) => addCssLink(href));
            Styles.concat(all).forEach((styleHref) => addCssLink(styleHref));
            // currentRoute.script.forEach((src) => addScripts(src));
            // Script_all.forEach((styleHref) => addScripts(styleHref));
        }

        return () => {
            const links = document.head.querySelectorAll('link[rel="stylesheet"]');
            links.forEach((link) => link.remove());

            // const scripts = document.head.querySelectorAll('script[type="text/javascript"]');
            // scripts.forEach((script) => script.remove());
        };
    }, [element]);

};

export default Rotas;
