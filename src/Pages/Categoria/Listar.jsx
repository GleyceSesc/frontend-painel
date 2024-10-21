import React from 'react';
import TableComponent from '../../Components/Listar';
export default function lista_Categoria() {
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'descricao', title: 'Descrição' },
    { key: 'status', title: 'Status' },
    {
      key: 'ações', title: 'Ações', options: [
        {
          label: "Editar",
        },
        {
          label: "Inativar",
          key: 1
        },
        {
          label: "Ativar",
          key: 0
        }
      ]
    }
  ];
  const rota = 'sub_categoria';
  const title = 'Lista de Sub-Categoria';

  return (
    <TableComponent
      get={rota}
      columns={columns}
      route={rota}
      title={title}
      type={rota}
    />
  );
};
