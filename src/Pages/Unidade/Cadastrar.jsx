

import React from 'react';
import DynamicForm from '../../Components/FormDinamico';
const Cadastro_Unidade = () => {

    const formFields = [
        { label: 'Nome', name: 'nome', type: 'text', required: true },
        { label: 'CNPJ', name: 'cnpj', type: 'text', required: true },
        { label: 'Cidade Agendamento Visual', name: 'cidade', type: 'select', required: true },
        { label: 'Unidade Agendamento Visual', name: 'unidade', type: 'select', required: true },
        { label: 'Reserva Lazer', name: 'reserva_lazer', type: 'checkbox', required: true },
        { label: 'Faz Atendimento', name: 'faz_atendimento', type: 'checkbox', required: true },
        { label: 'Tem Academia', name: 'tem_academia', type: 'checkbox', required: true },
        { label: 'Faz Credenciamento', name: 'faz_credenciamento', type: 'checkbox', required: true },
        { label: 'Status', name: 'status', type: 'select', required: true },
        { label: 'Capacidade Estrutural', name: 'capacidade_estrutural', type: 'number' },
        { label: 'Início Check-in', name: 'inicio_checkin', type: 'time' },
        { label: 'Fim Check-in', name: 'fim_checkin', type: 'time' },
        { label: 'Sistema de origem do dado', name: 'sca', type: 'text', value: 'SCA', required: true, disabled: true },
    ];
    return (
        <DynamicForm
            title={'Cadastro de Unidade'}
            fields={formFields}
            post={`unidade`}
        />
    )
};

export default Cadastro_Unidade;