

import React, { useState } from 'react';
import DynamicForm from '../../../Components/FormDinamico';

const CadastroJ = () => {
    const [resposta, setResposta] = useState([]);

    const formFields = [
            { label: 'CNPJ', type: 'search', name: 'cnpj', pattern: "[0-9]{2}.[0-9]{3}.[0-9]{3}/[0-9]{4}-[0-9]{2}", title: "Digite um cnpj válido e nesse formato xx.xxx.xxx/xxxx-xx", tab: 'Formulário', required: true, request: true, },
            { label: 'Razão social', type: 'text', name: 'razao_social', maxLenght: 60, required: true, tab: 'Formulário', disabled: true, value:resposta.length === 0 ? null: resposta['fantasia']},
            { label: 'Nome fantasia', type: 'text', name: 'nome_fantasia', maxLenght: 60, tab: 'Formulário', disabled: true,value:resposta.length === 0 ? null: resposta['fantasia'] },
            { label: 'CNAE', type: 'text', name: 'cnae', pattern: "[0-9]{4}-[0-9]{1}/[0-9]{2}", title: "Digite um cnae válido e nesse formato xxxx-x/xxx", tab: 'Formulário', disabled: true, value:resposta.length === 0 ? null: resposta['atividade_principal'][0]['code'] },
            { label: 'Descrição da atividade principal', type: 'text', name: 'descricao_atividade', tab: 'Formulário', maxLenght: 300, disabled: true,value:resposta.length === 0 ? null: resposta['atividade_principal'][0]['text']},
            { label: 'Logradouro', type: 'text', name: 'logradouro', tab: 'Formulário', maxLenght: 80, disabled: true, value:resposta.length === 0 ? null: resposta['logradouro'] + " n° " + resposta['numero']},
            { label: 'Bairro', type: 'text', name: 'bairro', tab: 'Formulário', maxLenght: 80, disabled: true,value:resposta.length === 0 ? null: resposta['bairro']},
            { label: 'Cep', type: 'text', name: 'cep', tab: 'Formulário', maxLenght: 80, disabled: true,value:resposta.length === 0 ? null: resposta['cep'] },
            { label: 'Municipio', type: 'text', name: 'municipio', tab: 'Formulário', maxLenght: 80, disabled: true, value:resposta.length === 0 ? null: resposta['municipio']},
            { label: 'Estado', type: 'text', name: 'estado', tab: 'Formulário', maxLenght: 80, disabled: true,  value:resposta.length === 0 ? null: resposta['uf'] },
            { label: 'Telefone', type: 'tel', name: 'Telefone', pattern: "([0-9]{2})[[0-9]{1}][0-9]{4}-[0-9]{4}", title: "O telefone deve seguir esse padrão (xx)[x]xxxx-xxxx", required: true, tab: 'Formulário', disabled: true,  value:resposta.length === 0 ? null: resposta['telefone']},
            { label: 'Email', type: 'email', name: 'Email', title: "Insira um email válido", tab: 'Formulário', maxLenght: 60, required: true, disabled: true,value:resposta.length === 0 ? null: resposta['email']},        
            { label: 'Sistema de origem do dado', type: 'text', name: 'origem_dado', value: 'TOOLKIT', disbaled: true, tab: 'Formulário', disabled: true },
            { label: 'Insira um documento', type: 'file', name: 'file', tab: 'Upload', required: true }
    ];
    const handleRequest = (response) => {
        setResposta('');
        if(response){
            setResposta(response);
        }
    };
    return (
        <DynamicForm
            title={'Cadastro de Cliente Jurídico'}
            fields={formFields}
            onRequest={handleRequest}
            get={"cliente/receitaWS"}
            apiUpload={"cliente/cadastrar/upload"}
            post={"cliente/cadastrar"}
        />
    )
};

export default CadastroJ;