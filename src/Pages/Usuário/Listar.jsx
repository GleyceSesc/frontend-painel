import React from 'react';
import TableComponent from '../../Components/Listar';
export default function ListUser(){
  const columns = [
    { key: 'ID', title: 'ID' },
    { key: 'USUARIO_REDE', title: 'Usuário Rede' },
    { key: 'NOME', title: 'Nome' },
    { key: 'EMAIL', title: 'Email' },
    { key: 'MATRICULA', title: 'Matricula' },
    { key: 'STATUS', title: 'Status' },
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
  
  const title = 'Lista de Usuários'; 
  const type = 'usuario'; 
  return (
    <TableComponent
      get={type}
      columns={columns}
      route={type}
      title={title}
      type={type}
    />
  );
};
