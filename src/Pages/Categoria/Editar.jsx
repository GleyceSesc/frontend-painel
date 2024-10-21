

import React, { useEffect, useState } from 'react';
import DynamicForm from '../../Components/FormDinamico';
import Api from '../../lib/Api';
const Editar = () => {
    const [sub_categoria, setSub_categoria] = useState('');
    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get('dado');
        Api().get(`sub_categoria/${id}`).then((response) => {
            setSub_categoria(response.data[0]);
        }
        );
    }, [setSub_categoria]);

    const formFields = [
        { label: 'Descrição', type: 'text', name: 'descricao', maxLenght: 60, required: true, defaultValue: sub_categoria["descricao"] },
        { label: 'Categoria ID', type: 'select', name: 'categoria_id', required: true, disabled: false, value: sub_categoria["categoria_id"] },
        { label: 'Status', type: 'select', name: 'status', maxLenght: 60, defaultValue: sub_categoria["status"] },
        { label: 'Idade Mínima', type: 'number', name: 'idade_minima', required: true, defaultValue: sub_categoria["idade_minima"] },
        { label: 'Validade (em meses)', type: 'text', name: 'validade', disabled: true, value: sub_categoria["validade"] },
        { label: 'Data de Criação', type: 'datetime', name: 'createdAt', disabled: true, value: sub_categoria["createdAt"] },
        { label: 'Data de Atualização', type: 'datetime', name: 'updatedAt', disabled: true, value: sub_categoria["updatedAt"] },
        { label: 'Data de Exclusão', type: 'datetime', name: 'deletedAt', disabled: true, value: sub_categoria["deletedAt"] },
    ];
    return (
        <DynamicForm
            title={'Editar Cadastro de Sub-Categoria'}
            fields={formFields}
            post={`sub_categoria/${sub_categoria["id"]}`}
        />
    )
};

export default Editar;