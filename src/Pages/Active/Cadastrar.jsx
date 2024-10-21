import React from 'react';
import TableComponent from '../../Components/Listar';
export default function ListActive(props){
  const columns = [
    { key: 'ID', title: 'Matricula' },
    { key: 'USUARIO_REDE', title: 'Nome' },
    { key: 'NOME', title: 'Cargo' },
    { key: 'EMAIL', title: 'Departamento' },
    { key: 'MATRICULA', title: 'Escritório' },
    { key: 'acoes', title: 'Data Inicio' }
  ];
  
  const title = 'Gerador de Usuario'; 
  return (
    <TableComponent
      columns={columns}
      title={title}
      get={'usuario'}
      type={'active'}
      checkbox={true}
    />
  );
};
