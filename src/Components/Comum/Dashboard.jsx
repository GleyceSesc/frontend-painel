import React from 'react';
import Listar from '../Listar';

const Dashboard = () => {
    const column = [
        { key: 'UUID', title: 'UUID' },
        { key: 'Origem', title: 'Origem' },
        { key: 'Recurso', title: 'Recurso' },
        { key: 'HTTP', title: 'HTTP' },
        { key: 'Data', title: 'Data' },
        { key: 'Status', title: 'Status' },
        { key: 'Relatório', title: 'Relatório' }
    ];
   

    const get = 'http://localhost:8080/services';
    const data = 'dashboard';
    return (
        <Listar title={'Dashboard'} columns={column} get={get} type={data} route={'dashboard'} />
    );
};

export default Dashboard;

