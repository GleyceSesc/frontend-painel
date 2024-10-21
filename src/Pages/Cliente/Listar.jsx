import React from 'react';
import Listar from '../../Components/Listar';

const ListarUsuario = () => {
  const columns1 = [
    { key: 'matricula', title: 'Matrícula' },
    { key: 'cpf', title: 'CPF' },
    { key: 'email', title: 'Email' },
    { key: 'nome', title: 'Nome' },
    { key: 'situacaomatricula', title: 'Status' },
    {
      key: 'ações', title: 'Ações', options: [
        {
          label: "Editar",
        },
        {
          label: "Excluir",
        }
      ]
    }
  ];

  const columns2 = [
    { key: 'matricula', title: 'Matrícula' },
    { key: 'cnpj', title: 'CPNJ' },
    { key: 'email', title: 'Email' },
    { key: 'nome', title: 'Nome' },
    { key: 'situacaomatricula', title: 'Status' },
    {
      key: 'ações', title: 'Ações', options: [
        {
          label: "Editar",
        },
        {
          label: "Excluir",
        }
      ]
    }
  ];

  const apiUrl = 'cliente/index';
  const data = 'cliente';
  return (
    <>
      <Listar title={'Clientes Fisicos'} columns={columns1} get={apiUrl} type={data} route={'cliente-fisico'} />
      <Listar title={'Clientes Juridicos'} columns={columns2} get={apiUrl} type={data} route={'cliente-juridico'} />
    </>
  );
};

export default ListarUsuario;

