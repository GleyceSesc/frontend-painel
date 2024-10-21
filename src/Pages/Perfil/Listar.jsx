import React from 'react';
import Listar from '../../Components/Listar';

const ListarUsuario = () => {
  const columns = [
    { key: 'ID', title: 'ID' },
    { key: 'PERFIL', title: 'Perfil' },
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
  const rota = 'perfil';
  const title = 'Lista de Perfis';
  const type = 'perfil';

  const apiUrl = 'perfil';
  return (
    <Listar get={apiUrl}
      columns={columns}
      route={rota}
      title={title}
      type={type}
    />
  );
};

export default ListarUsuario;

