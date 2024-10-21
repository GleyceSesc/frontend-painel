
import Buttons from "./Buttons/Buttons";
import React, { useState, useEffect } from 'react';
import { Table, Form, Pagination, Row, Col, Button } from 'react-bootstrap';
import Api from "../lib/Api";
export default function Listar({ title, route, get, columns, type, checkbox }) {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [httpCode, sethttpCode] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        function fetchData() {
            try {
                Api().get(get).then((response) => {
                    response.data.message ? alert(response.data.message) : setData(response.data);
                }).catch((error) => {
                    if(!error?.status){
                        alert(error.code);
                    }else{
                        console.error(error.status);
                    }
                })
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }
        if (data.length === 0) fetchData();
    }, [setData]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };

    const filteredHttpCode = (e) => {
        const value = e.target.value;
        sethttpCode(value);
        setCurrentPage(1);
        setSearch(e.target.value !== "Nenhum" ? value : '');
    }

    const filteredData = data.filter(item => {
        return columns && columns.some(col => {
            const cellValue = item[col.key] !== undefined ? item[col.key].toString() : '';
            return cellValue.toLowerCase().includes(search.toLowerCase());
        });
    });

    const onclick = (data) => {
        //             < select >
        //             <option value={"OU = SESC - Filiais, DC = sesc - mg, DC = local"}>empregado</option>
        //             <option value={"OU = SESC - Filiais, DC = sesc - mg, DC = local"}>empregado</option>
        // <option value={"OU = GTSI, DC = sesc - mg, DC = local"}>ti</option>
        // <option value={"OU = SESC - Prestadores de Serviços, DC = sesc - mg, DC = local"}>serviço</option>
        // <option value={"OU = SESC - Filiais, DC = sesc - mg, DC = local"}>terceiro</option>


        //             </select >

    }


    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

    const generatePaginationItems = () => {
        const items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => setCurrentPage(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }
        return items;
    };




    return (
        <div className="col-xl-12">
            <div className="card dz-card" id="accordion-three">
                <div className="card-header flex-wrap d-flex justify-content-between">
                    <div>
                        <h4 className="card-title">{title}</h4>
                    </div>
                    {type !== 'dashboard' && type !== 'active' ? (
                        <Buttons type={'cadastrar'} title={type} rota={route} />
                    ) : (
                        void 0
                    )
                    }
                </div>
                <div className="tab-content" id="myTabContent-2">
                    <div
                        className="tab-pane fade show active"
                        id="withoutSpace"
                        role="tabpanel"
                        aria-labelledby="home-tab-2"
                    >
                        <div className="card-body pt-0">
                            <div className="table-responsive">
                                <div>
                                    <div className="d-flex justify-content-between mb-3">
                                        <div>
                                            <Row className="mb-3">
                                                <Col xl={6} className="mb-3">
                                                    <Form.Label>Itens por pagina</Form.Label>
                                                    <Form.Select
                                                        value={rowsPerPage}
                                                        onChange={handleRowsPerPageChange}
                                                        className="me-2"
                                                        style={{ width: '200px', height: '40px' }}
                                                    >
                                                        {[7, 10, 20, 30, 50].map(count => (
                                                            <option key={count} value={count}>
                                                                {count}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                                {

                                                    type === 'dashboard' ? (
                                                        <>
                                                            <Col xl={6} className="mb-3">
                                                                <Form.Label>Filtrar por código</Form.Label>
                                                                <Form.Select
                                                                    value={httpCode}
                                                                    onChange={filteredHttpCode}
                                                                    className="me-2"
                                                                    style={{ width: '200px', height: '40px' }}
                                                                >
                                                                    {[
                                                                        'Nenhum',
                                                                        100,
                                                                        101,
                                                                        102,
                                                                        103,
                                                                        200,
                                                                        201,
                                                                        202,
                                                                        203,
                                                                        204,
                                                                        205,
                                                                        206,
                                                                        207,
                                                                        208,
                                                                        209,
                                                                        300,
                                                                        301,
                                                                        302,
                                                                        303,
                                                                        304,
                                                                        305,
                                                                        306,
                                                                        307,
                                                                        308,
                                                                        400,
                                                                        401,
                                                                        402,
                                                                        403,
                                                                        404,
                                                                        405,
                                                                        406,
                                                                        407,
                                                                        408,
                                                                        409,
                                                                        410,
                                                                        411,
                                                                        412,
                                                                        413,
                                                                        414,
                                                                        415,
                                                                        416,
                                                                        417,
                                                                        418,
                                                                        421,
                                                                        422,
                                                                        423,
                                                                        424,
                                                                        425,
                                                                        426,
                                                                        428,
                                                                        429,
                                                                        431,
                                                                        451,
                                                                        500,
                                                                        501,
                                                                        502,
                                                                        503,
                                                                        504,
                                                                        505,
                                                                        506,
                                                                        507,
                                                                        508,
                                                                        509,
                                                                        510,
                                                                        511
                                                                    ].map(count => (
                                                                        <option key={count} value={count}>
                                                                            {count}
                                                                        </option>
                                                                    ))}
                                                                </Form.Select>
                                                            </Col>
                                                        </>
                                                    ) : (
                                                        null
                                                    )
                                                }
                                            </Row>
                                        </div>
                                        <div>
                                            <Row className="mb-3">
                                                {
                                                    type === 'dashboard' ? (
                                                        <>
                                                            <Col xl={6} className="mb-3">
                                                                <Form.Group>
                                                                    <Form.Label>Buscar Data</Form.Label>
                                                                    <Form.Control
                                                                        type={type === 'dashboard' ? 'datetime-local' : 'text'}
                                                                        placeholder={type === 'dashboard' ? 'Buscar' : 'Buscar'}
                                                                        value={search}
                                                                        onChange={handleSearch}
                                                                        className="w-auto"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xl={6} className="mb-3">
                                                                <Form.Group>
                                                                    <Form.Label>Buscar</Form.Label>
                                                                    <Form.Control
                                                                        type={'text'}
                                                                        placeholder={'Buscar'}
                                                                        value={search}
                                                                        onChange={handleSearch}
                                                                        className="w-auto"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </>
                                                    ) : (

                                                        <Col xl={6} className="mb-3">
                                                            <Form.Group>
                                                                <Form.Label>Buscar</Form.Label>
                                                                <Form.Control
                                                                    type={type === 'dashboard' ? 'datetime-local' : 'text'}
                                                                    placeholder={type === 'dashboard' ? 'Buscar' : 'Buscar'}
                                                                    value={search}
                                                                    onChange={handleSearch}
                                                                    className="w-auto"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                    )

                                                }
                                            </Row>
                                        </div>
                                    </div>
                                    <Table striped bordered hover id="example3" className="display table" style={{ minWidth: 845 }}>
                                        <thead>
                                            <tr>
                                                {
                                                    checkbox ? (
                                                        <th>
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                name="allSelect"
                                                                id="check-all"
                                                                onChange={(e) => {
                                                                    const checkboxes = document.querySelectorAll(
                                                                        `.form-check-input[type="checkbox"]`
                                                                    );
                                                                    checkboxes.forEach((checkbox) => {
                                                                        if (checkbox.id !== 'check-all') {
                                                                            checkbox.checked = !checkbox.checked;
                                                                        }
                                                                    });
                                                                }}
                                                            />
                                                        </th>
                                                    ) : (
                                                        null)
                                                }
                                                {columns && columns.map(col => (
                                                    <th key={col.key}>{col.title}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentData.map((item, index) => (
                                                    <tr key={index} className={item.status || item.ativo === 1 ? 'ativo' : 'inativo'}>
                                                        {
                                                            checkbox ? (
                                                                <td>
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        name="select"
                                                                        id={item.USUARIO_REDE}
                                                                    />
                                                                </td>
                                                            ) : (
                                                                null
                                                            )

                                                        }

                                                        {columns && columns.map((col) => (
                                                            <>
                                                                <td key={col.key}>
                                                                    {col.title === 'Status' ? (
                                                                        typeof (item[col.key]) === 'string' ? (
                                                                            <span className={item[col.key] === 'Sucesso' ? 'text-success' : 'text-danger'}>
                                                                                {item[col.key]}
                                                                            </span>
                                                                        ) : (
                                                                            <span className={item[col.key] === 1 ? 'text-success' : 'text-danger'}>
                                                                                {item[col.key] === 0 ? "Inativo" : "Ativo"}
                                                                            </span>
                                                                        )
                                                                    ) : (
                                                                        item[col.key]
                                                                    )}
                                                                    {
                                                                        col.title === 'Relatório' ? (
                                                                            <div className="d-flex">
                                                                                <Buttons type={'relatorio'} rota={'/dashboard'} dado={''}></Buttons>
                                                                                <Buttons type={'grafico'}> dado={''}</Buttons>
                                                                                <Buttons type={'outro'}> dado={''}</Buttons>
                                                                            </div>
                                                                        ) : (
                                                                            null
                                                                        )
                                                                    }
                                                                    {col.title === 'Ações' ? (
                                                                        <div className="d-flex">
                                                                            {col.options.map((index) => {
                                                                                switch (index.label) {
                                                                                    case 'Editar':
                                                                                        return <Buttons dado={item} rota={route} type={'editar'} data={type} />;
                                                                                    case 'Excluir':
                                                                                        return index?.key === item["status"] ? < Buttons dado={item} rota={route} type={'deletar'} data={type} /> : null;
                                                                                    case 'Inativar':
                                                                                        return index?.key === item["status"] ? < Buttons dado={item} rota={route} type={'inativar'} data={type} /> : null;
                                                                                    case 'Ativar':
                                                                                        return index?.key === item["status"] ? <Buttons dado={item} rota={route} type={'ativar'} data={type} /> : null;
                                                                                    default:
                                                                                        return null;
                                                                                }
                                                                            })}
                                                                        </div>
                                                                    ) : null}
                                                                </td>
                                                            </>

                                                        ))}
                                                    </tr>
                                                )
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Pagination>
                                            <Pagination.Prev
                                                onClick={() => setCurrentPage(currentPage - 1)}
                                                disabled={currentPage <= 1}
                                            />
                                            {generatePaginationItems()}
                                            <Pagination.Next
                                                onClick={() => setCurrentPage(currentPage + 1)}
                                                disabled={currentPage >= totalPages}
                                            />
                                        </Pagination>
                                        <span>
                                            Mostrando {startIndex + 1} a {Math.min(startIndex + rowsPerPage, totalItems)} de {totalItems} itens
                                        </span>
                                    </div>
                                    {
                                        checkbox ? (
                                            <Button
                                                className="bg-primary text-white"
                                                onClick={() => onclick(Array.from(document.querySelectorAll('.form-check-input[type="checkbox"]'))
                                                    .filter((checkbox) => checkbox.checked && checkbox.id !== "check-all"))}
                                            >
                                                <i className="fa-solid fa-play"></i>
                                                <span>Start</span>
                                            </Button>
                                        ) : (
                                            null
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}