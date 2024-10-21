import React from 'react';
import DynamicForm from '../../../Components/FormDinamico';

const CadastroF = () => {
  const formFields = [
    { label: 'Nome Completo', type: 'text', name: 'nome', placeholder: 'Insira um nome', maxLenght: 60, tab: 'Formulário', required: true, pattern: '^([A-Za-záéíóúçâêîôûâêîôû]+\\s[A-Za-záéíóúçâêîôûâêîôû]+)$', title: 'O nome deve ter pelo menos 2 nomes' },
    { label: 'Nome Social', type: 'text', name: 'nomeSocial', placeholder: 'Insira um nome social', maxLenght: 50, tab: 'Formulário', title: "A senha deve ter pelo menos 8 caracteres." },
    { label: 'CPF', type: 'text', name: 'cpf', placeholder: 'Insira um cpf válido', pattern: "[0-9]{11}", tab: 'Formulário', title: "Digite somente o número do CPF", required: true },
    { label: 'Data de Nascimento', type: 'date', name: 'dataNascimento', required: true, tab: 'Formulário' },
    { label: 'Telefone', type: 'tel', name: 'telefone', pattern: "([0-9]{2})[0-9]{5}-[0-9]{4}", tab: 'Formulário', title: "O telefone deve seguir esse padrão (xx)xxxxx-xxxx", required: (values) => !values.Email },
    { label: 'Email', type: 'email', name: 'email', maxLenght: 60, title: "Insira um email válido", tab: 'Formulário', required: (values) => !values.Telefone ? true : false, },
    { label: 'Endereço', type: 'text', name: 'endereco', tab: 'Formulário', maxLenght: 80, required: false },
    { label: 'Sistema de origem do dado', type: 'text', name: 'sistemaDeOrigem', value: 'TOOLKIT', tab: 'Formulário', disabled: true },
    { label: 'Insira um documento', type: 'file', name: 'file', tab: 'Upload', required: true }
  ];

  return (
    <DynamicForm
      title={'Cadastro de Cliente Físico'}
      fields={formFields}
      post={'cliente/cadastrar'}
      apiUpload={'cliente/cadastrar/upload'}
    />
  )
};

export default CadastroF;