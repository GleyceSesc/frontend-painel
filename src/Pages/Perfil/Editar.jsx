

import React, { useEffect, useState } from 'react';
import DynamicForm from '../../Components/FormDinamico';
import Api from '../../lib/Api';
const Editar = () => {
    const [Perfil, setPerfil] = useState('');
    const urlParams = new URLSearchParams(window.location.search).get('dado');
    useEffect(() => {
        Api().get(`perfil/${urlParams}`).then((response) => {
            setPerfil(response.data[0]);}
        );
    }, [setPerfil, urlParams]);


    const formFields = [
        { label: 'Perfil', type: 'text', name: 'perfil', maxLenght: 60, required: true, disabled: true, value: Perfil['PERFIL'] },
        { label: 'Status', type: 'select', name: 'status', maxLenght: 60, defaultValue: Perfil['STATUS'] },
        { label: 'Modulos', name: 'modulos', type: 'multiple_checkbox' }
    ]
    return (
        <DynamicForm
            title={'Editar Cadastro de Perfil'}
            fields={formFields}
            post={`perfil/${Perfil['UUID']}`}
        />
    )
};

export default Editar;