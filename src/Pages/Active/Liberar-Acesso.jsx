import React from 'react';
import DynamicForm from '../../Components/FormDinamico';
export default function ListActive() {
  const formFields = [
    { label: 'Usuário Rede', type: 'text', name: 'usuario_rede', required: true, request: true, maxLenght: 15 },
  ];

  const title = 'Liberar Acesso';
  return (
    <DynamicForm
      title={title}
      fields={formFields}
       get="validar/usuario"
      post="perfil"
    />
  )
};



