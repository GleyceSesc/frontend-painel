

import React, { useState } from 'react';
import DynamicForm from '../../Components/FormDinamico';
const Cadastro = () => {
    const [resposta, setResposta] = useState([]);
    //Colocar o campo como defaultValue enquanto não fizer outra requisição
    const formFields = [
        { label: 'Usuário Rede', type: 'text', name: 'usuario_rede', required: true, request: true, maxLenght: 15, disabled: resposta.length === 0 ? false : true },
        { label: 'Matricula', type: 'text', name: 'matricula', maxLenght: 6, required: true, value: resposta.length === 0 ? null : resposta['matricula'] },
        { label: 'Nome', type: 'text', name: 'nome', maxLenght: 100, value: resposta.length === 0 || resposta['status'] ? null : resposta['nome'], required: true },
        { label: 'Email', type: 'email', name: 'email', maxLenght: 50, title: "Digite um email válido", value: resposta.length === 0 ? null : resposta['email'], required: true },
        {
            label: 'Status', type: 'select', name: 'status', required: true, options: [
                {
                    value: '1',
                    label: 'Ativo'
                },
                {
                    value: '0',
                    label: 'Inativo'
                }
            ]
        },
        { label: 'Perfil', type: 'select-multiple', name: 'perfil' }
    ];
    const handleRequest = (response) => {
        setResposta('')
        if (response !== null) {
            console.log(response)
            setResposta(response);
        }
    };
    return (
        <DynamicForm
            title={'Cadastro de Usuário'}
            fields={formFields}
            onRequest={handleRequest}
            get="validar/usuario"
            post="usuario"
        />
    )
};

export default Cadastro;