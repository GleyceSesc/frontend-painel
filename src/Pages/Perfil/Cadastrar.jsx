

import React from 'react';
import DynamicForm from '../../Components/FormDinamico';

const Cadastro = () => {
    const formFields = [
        { label: 'Nome', type: 'text', name: 'perfil', required: true, maxLenght: 15 },
        { label: 'Status', type: 'select', name: 'status', required: true },
        { label: 'Modulos',  name: 'modulos', type:'multiple_checkbox' }
    ];
    return (
        <DynamicForm
            title={'Cadastro de Perfil'}
            fields={formFields}
            post="perfil"
        />
    )
};

export default Cadastro;