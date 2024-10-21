
import React, { useEffect, useState } from 'react';
import Api from '../../../lib/Api';
import DynamicForm from '../../../Components/FormDinamico';
export default function EditarClienteF({ api }) {
    const [Clientes, setClientes] = useState('');
    const urlParams = new URLSearchParams(window.location.search).get('dado');
    useEffect(() => {
        Api().get(`cliente/show/${urlParams}`,).then((response) => {
            setClientes(response.data[0]);
        }
        );
    }, [setClientes, urlParams]);
    const endereco = Clientes['dslogradou'] + " nº " + Clientes['nuimovel'] + " -" + Clientes['dsbairro'] + " " + Clientes['cdmunicip'] + "/" + Clientes['siestado'] + " " + Clientes['nucep'];
    const formFields = [
        { label: 'Nome Completo', type: 'text', name: 'nome_completo', maxLenght: 60, required: true, pattern: '^([A-Za-záéíóúçâêîôûâêîôû]+\\s[A-Za-záéíóúçâêîôûâêîôû]+)$', title: 'O nome deve ter pelo menos 2 nomes', defaultValue: Clientes['nome'] },
        { label: 'Nome Social', type: 'text', name: 'nome_social', maxLenght: 50, title: "A senha deve ter pelo menos 8 caracteres.", defaultValue: Clientes['nome_social'] },
        { label: 'CPF', type: 'text', name: 'cpf', pattern: "[0-9]{11}", title: "Digite somente o número do CPF", required: true, value: Clientes['cpf'], disabled: true },
        { label: 'Data de Nascimento', type: 'date', name: 'data_nascimento', required: true, value: Clientes['data_nascimento'], disabled: true },
        { label: 'Telefone', type: 'tel', name: 'telefone', pattern: "([0-9]{2})[[0-9]{1}][0-9]{4}-[0-9]{4}", title: "O telefone deve seguir esse padrão (xx)[x]xxxx-xxxx", required: (values) => !values.Email ? true : false, defaultValue: Clientes['telefone'] },
        { label: 'Email', type: 'email', name: 'email', maxLenght: 60, title: "Insira um email válido", required: (values) => !values.Telefone ? true : false, defaultValue: Clientes['email'] },
        { label: 'Endereço', type: 'text', name: 'endereco', maxLenght: 80, defaultValue: endereco },
        {
            label: 'Sistema de origem do dado',
            type: 'select',
            name: 'origem_dado',
            options: Clientes && Clientes.sistemadeorigem && Clientes.sistemadeorigem.map((item, index) => ({
              label: item,
              value: index
            }))
          }
    ];

    return (
        <DynamicForm
            title={'Editar Cadastro de Pessoa Física'}
            fields={formFields}
            post={'cliente/editar'}
        />
    );
}