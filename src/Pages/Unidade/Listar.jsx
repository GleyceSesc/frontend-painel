import React from 'react';
import TableComponent from '../../Components/Listar';

export default function ListUnidade() {
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'nome', title: 'Nome' },
    { key: 'cnpj', title: 'CNPJ' },
    { key: 'ativo', title: 'Status'},
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

  const rota = 'unidade';
  const title = 'Lista de Unidades';
  const type = 'unidade';

  return (
    <TableComponent
      get={type}
      columns={columns}
      route={rota}
      title={title}
      type={type}
    />
  );
};
