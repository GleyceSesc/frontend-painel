

import React, { useEffect, useState } from 'react';
import DynamicForm from '../../../Components/FormDinamico';
import Api from '../../../lib/Api';
const EditarJ = () => {
    const [Clientes, setClientes] = useState('');
    const urlParams = new URLSearchParams(window.location.search).get('dado'); 
    useEffect(() => {
        Api().get(`cliente/show/${urlParams}`).then((response) => {
            setClientes(response.data[0]);
        }
        );
    }, [setClientes, urlParams]);
    const endereco = Clientes['logradouro']+" nº "+Clientes['numero']+" -"+Clientes['bairro']+" "+Clientes['cidade']+"/"+Clientes['estado']+" "+Clientes['cep'];

    const formFields = [
        { label: 'CNPJ', type: 'text', name: 'cnpj', pattern: "[0-9]{2}.[0-9]{3}.[0-9]{3}/[0-9]{4}-[0-9]{2}", title: "Digite um cnpj válido e nesse formato xx.xxx.xxx/xxxx-xx", required: true, value:Clientes['cnpj'] },
        { label: 'Razão social', type: 'text', name: 'razao_social', maxLenght: 60, required: true, defaultValue:Clientes['razao_social'] },
        { label: 'Nome fantasia', type: 'text', name: 'nome_fantasia', maxLenght: 60,  disabled:true, value:Clientes['nome_fantasia'] },
        { label: 'CNAE', type: 'text', name: 'cnae', pattern: "[0-9]{4}-[0-9]{1}/[0-9]{2}", title: "Digite um cnae válido e nesse formato xxxx-x/xxx", defaultValue:Clientes['cnae'] },
        { label: 'Descrição da atividade principal', type: 'text', name: 'descricao_atividade', maxLenght: 300, disabled:true, value:Clientes['atividade_principal'] },
        { label: 'Endereço', type: 'text', name: 'endereco', maxLenght: 80, disabled:true, value:endereco },
        { label: 'Telefone', type: 'tel', name: 'Telefone', pattern: "([0-9]{2})[[0-9]{1}][0-9]{4}-[0-9]{4}", title: "O telefone deve seguir esse padrão (xx)[x]xxxx-xxxx", required: true, defaultValue:Clientes['telefone'] },
        { label: 'Email', type: 'email', name: 'Email', title: "Insira um email válido", maxLenght: 60, required: true, defaultValue:Clientes['email'] },
        { label: 'Pessoa de contato', type: 'text', name: 'pessoa_contato', maxLenght: 60, value:Clientes['pessoadecontato']},
        { label: 'Sistema de origem do dado', type: 'text', name: 'origem_dado', value: 'TOOLKIT', disabled:true},
    ];
    return (
        <DynamicForm
            title={'Editar Cadastro de Cliente Jurídico'}
            fields={formFields}
            post={'cliente/editar'}
        />
    )
};

export default EditarJ;