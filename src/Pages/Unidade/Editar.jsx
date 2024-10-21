
import React, { useEffect, useState } from 'react';
import Api from '../../lib/Api';
import DynamicForm from '../../Components/FormDinamico';
export default function Editar() {
    const [unidade, setUnidade] = useState([]);
    const urlParams = new URLSearchParams(window.location.search).get('dado'); 
    useEffect(() => {
        Api().get(`unidade/${urlParams}`).then((response) => {
            setUnidade(response.data[0]);
        }
        );
    }, [setUnidade, urlParams]);
    const formFields = [
        { label: 'CNPJ', name: 'cnpj', type: 'text', value: unidade['cnpj'], disabled: true, required: true },
        { label: 'Nome', name: 'nome', type: 'text', defaultValue: unidade['nome'] },
        { label: 'Cidade Agendamento Visual', name: 'cidade', type: 'select', defaultValue: unidade['cidade_agendamento_visual'] },
        { label: 'Unidade Agendamento Visual', name: 'unidade', type: 'select', defaultValue: unidade['unidade_agendamento_visual'] },
        { label: 'Faz Atendimento', name: 'faz_atendimento', type: 'checkbox', required: true, selected: unidade['faz_atendimento'] },
        { label: 'Reserva Lazer', name: 'reserva_lazer', type: 'checkbox', required: true, selected: unidade['reserva_lazer'] },
        { label: 'Tem Academia', name: 'tem_academia', type: 'checkbox', required: true, selected: unidade['tem_academia'] },
        { label: 'Faz Credenciamento', name: 'faz_credenciamento', type: 'checkbox', required: true, selected: unidade['faz_credenciamento'] },
        { label: 'Criado em', name: 'created_at', type: 'datetime', value: unidade['created_at'] },
        { label: 'Atualizado em', name: 'updated_at', type: 'datetime', value: unidade['updated_at'] },
        { label: 'Deletado em', name: 'deleted_at', type: 'datetime', value: unidade['deleted_at'] },
        { label: 'Status', name: 'ativo', type: 'select', defaultValue: unidade['ativo'] },
        { label: 'Capacidade Estrutural', name: 'capacidade_estrutural', type: 'number', defaultValue: unidade['capacidade_estrutural'] },
        { label: 'Início Check-in', name: 'inicio_checkin', type: 'time', value: unidade['inicio_checkin'] },
        { label: 'Fim Check-in', name: 'fim_checkin', type: 'time', value: unidade['fim_checkin'] },
        { label: 'SCA ID', name: 'sca_id', type: 'number', value: unidade['sca_id'] },
    ]


    return (
        <DynamicForm
            title={'Editar Cadastro de Unidade'}
            fields={formFields}
            post={`unidade/${unidade['uuid']}`}
        />
    )
}