

import React from 'react';
import DynamicForm from '../../Components/FormDinamico';
const Cadastro_SubCategoria = () => {
    const formFields = [
        { label: 'Descrição', type: 'text', name: 'descricao', maxLenght: 60, required: true },
        { label: 'Categoria ID', type: 'select', name: 'categoria_id', required: true},
        { label: 'Status', type: 'select', name: 'status', maxLenght: 60, required: true},
        { label: 'Idade Mínima', type: 'number', name: 'idade_minima', required: true },
        { label: 'Validade (em meses)', type: 'text', name: 'validade', required: true}
    ];
    return (
        <DynamicForm
            title={'Cadastro de Sub-Categoria'}
            fields={formFields}
            post={`sub_categoria`}
        />
    )
};

export default Cadastro_SubCategoria;