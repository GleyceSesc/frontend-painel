
import React, { useEffect, useState } from 'react';
import Api from '../../lib/Api';
import DynamicForm from '../../Components/FormDinamico';
export default function Editar() {
    const [usuario, setUsuario] = useState([]);
    const urlParams = new URLSearchParams(window.location.search).get('dado');
    useEffect(() => {
        Api().get(`usuario/${urlParams}`, {
        }).then((response) => {
            setUsuario(response.data[0]);
        }
        );
    }, [setUsuario, urlParams]);
    const formFields = [
        { label: 'Usuário Rede', type: 'text', name: 'usuario_rede', required: true, maxLenght: 15, value: usuario['USUARIO_REDE'], disabled: true },
        { label: 'Matricula', type: 'text', name: 'matricula', maxLenght: 6, required: true, disabled: true, value: usuario["MATRICULA"] },
        { label: 'Nome', type: 'text', name: 'nome', maxLenght: 100, disabled: true, value: usuario["NOME"], required: true },
        { label: 'Email', type: 'email', name: 'email', maxLenght: 50, title: "Digite um cnae válido e nesse formato xxxx-x/xxx", disabled: true, value: usuario["EMAIL"], required: true },
        { label: 'Status', type: 'select', name: 'status', defaultValue: usuario["STATUS"], required: true },
        { label: 'Perfil', type: 'select-multiple', name: 'perfil' }
    ];
    return (
        <DynamicForm
            title={'Editar Cadastro de Usuário'}
            fields={formFields}
            post={`usuario/${usuario['UUID']}`}
        />
    )
}