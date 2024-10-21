import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Tabs, Tab, InputGroup } from "react-bootstrap";
import Select from "react-select";
import { jwtDecode } from "jwt-decode";
import Api from "../lib/Api";
import { Rotas } from "../Services/RoutesProtected";
import { id_usuario } from "../Config/Config";
import { useNavigate } from "react-router-dom";

const DynamicForm = ({
    fields,
    onRequest,
    onSubmit,
    get,
    post,
    title,
    apiUpload,
}) => {
    const [formValues, setFormValues] = useState(
        fields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        }, {})
    );
    const [modulos, setModulos] = useState([]);
    const [units, setUnits] = useState([]);
    const [id_modulo] = useState(Rotas(window.location.pathname));
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [tabNames, setTabNames] = useState([]);
    const [menus, setMenus] = useState([]);
    const [data, setData] = useState(false);

    const navigate = useNavigate();
    const handleCheck = (e) => {
        const inputs = document.getElementsByName(e.target.name);
        if (e.target.checked) {
            for (let i = 0; i < inputs.length; i++) {
                if (e.target.value != i) {
                    console.log(`${e.target.name}-${i}`);
                    document.getElementById(`${e.target.name}-${i}`).disabled = true;
                    document.getElementById(`${e.target.name}-${i}`).required = false;
                }
            }
        } else {
            for (let i = 0; i < inputs.length; i++) {
                if (e.target.value !== i) {
                    document.getElementById(`${e.target.name}-${i}`).disabled = false;
                    document.getElementById(`${e.target.name}-${i}`).required = true;
                }
            }
        }
    };

    const fetchCities = async () => {
        try {
            const response = await Api().get("cidade/listar");
            setCities(response.data);
        } catch (error) {
            console.error("Erro ao buscar cidades:", error);
        }
    };

    const fetchProfiles = async () => {
        try {
            const response = await Api().get("perfil");
            setProfiles(response.data);
        } catch (error) {
            console.error("Erro ao buscar perfis:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await Api().get("categoria");
            setCategories(response.data);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    };

    const fetchModulo = async () => {
        try {
            const response = await Api().get("modulo");
            setModulos(response.data);
        } catch (error) {
            console.error("Erro ao buscar módulos:", error);
        }
    };

    const fetchMenu = async () => {
        try {
            const response = await Api().get("menu");
            setMenus(response.data);
        } catch (error) {
            console.error("Erro ao buscar menu:", error);
        }
    };

    const fetchFunctions = {
        cidade: fetchCities,
        perfil: fetchProfiles,
        modulos: [fetchMenu, fetchModulo],
        categoria_id: fetchCategories,
    };
    useEffect(() => {
        const formFields = [...fields];
        formFields.forEach((field) => {
            if (typeof (fetchFunctions[field.name]) === 'object') {
                fetchFunctions[field.name].forEach((func) => func());
            }
            else {
                if (fetchFunctions[field.name]) {
                    fetchFunctions[field.name]();
                }
            }

        });
    }, []);

    // Carregar unidades do Visual
    const fetchUnits = (stateId) => {
        try {
            Api().get(
                `cidade/unidade/${stateId}`
            ).then((response) => {
                setUnits(response.data);
            })
        } catch (error) {
            console.error("Erro ao buscar unidades:", error);
        }
    };

    // Função para requisitar dados adicionais quando o campo `request` é preenchido
    const fetchAdditionalData = (fieldName, fieldValue) => {
        try {
            let dado = fieldName !== "cnpj" ? fieldValue : fieldValue.replace(/[^0-9]/g, "");
            Api()
                .get(`${get ?? post}/${dado}`)
                .then((response) => {

                    if (response.data) {
                        if (response.data["status"] === "ERROR") {
                            alert(response.data["message"]);
                        }
                        else if (response.statusText !== "OK") {
                            setData([]);
                            alert(response.statusText);
                        }
                        else {
                            if (typeof (response.data) === 'string') {
                                const header = JSON.parse(atob(response.data.split('.')[0]));
                                if (header.typ === 'JWT') {
                                    onRequest(jwtDecode(response.data)[0]);
                                    setData(response.data)
                                }
                            }
                            else {
                                onRequest(response.data)
                            }
                        }
                    }
                });
        } catch (error) {
            console.error("Erro ao buscar dados adicionais:", error);
        }
    };

    const handleChange = (e, field) => {
        let perfil = [];
        if (field === "perfil") {
            if (Array.isArray(e)) {
                perfil = e.map((item) => ({ label: item.label, value: item.value }));
            }
            setFormValues((prevValues) => ({
                ...prevValues,
                [field]: perfil,
            }));
        } else {
            if (field === "clear") {
                setFormValues((prevValues) => {
                    prevValues["usuario_rede"] = ""
                });
                return handleClear();
            }
            const { className, name, value } = e.target ?? e;
            if (className === "form-check-input") {
                handleCheck(e);
            }
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));

            if (name === "cidade") {
                fetchUnits(value);
            }
            if (value === '') {

            }
            const fieldMap = fields.find((item) => item.name === name);
            if (fieldMap && fieldMap.request && value === '') {
                onRequest(null);
            }

            if (fieldMap && fieldMap.request && value) {
                fetchAdditionalData(name, value);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const data = e.target;
        if (tabNames.length !== 0) {
            for (const tab of tabNames) {
                for (const field of fields) {
                    if (field.tab === tab) {
                        for (const [key, value] of Object.entries(formValues)) {
                            const field = data[key];
                            if (field !== undefined) {
                                formData.append(key, field.value);
                            }
                        }
                    }
                }
            }
        } else {
            for (const [key, value] of Object.entries(formValues)) {
                let dado = [];
                const field = data[key];
                if (field) {
                    if (field.type === undefined) {
                        for (let i = 0; i < field.length; i++) {
                            const data = [field[i].name, field[i].value];
                            if (field[i].type === "hidden") dado.push(data);
                            else {
                                if (field[i].name === "modulos") if (field[i].checked) if (field[i].id !== 'check-all') dado.push(data)
                                else field[i].checked ? formData.append(key, !field[i].value === false ? field[i].value : field.placeholder) : void 0;
                            }
                        }
                        formData.append(key, JSON.stringify(dado.filter((item) => item[0] === key).map((item) => item[1])));
                    }
                    else formData.append(key, field.value === undefined || field.value === '' ? field.placeholder : field.value);
                    formData.append('id_modulo', id_modulo);
                    formData.append('id_usuario', id_usuario);
                }
            }
        }

        try {
            const formDataObject = Object.fromEntries(formData.entries());
            console.table(formDataObject);
            if (formDataObject["file"]) {
                post = apiUpload;
            }
            const method =
                title.split(" ")[0] === "Editar"
                    ? "put"
                    : title.split(" ")[0] === "Cadastro"
                        ? "post"
                        : void 0;
            if (method) {
                Api()[method](post,
                    {
                        ...formDataObject
                    }
                ).then(function (response) {
                    if (response.statusText !== "OK") {
                        alert(response.statusText);
                    } else {
                        alert("Formulário enviado com sucesso!");
                        setTimeout(() => {
                            navigate(-1)
                        }, 2000);
                    }
                }).catch(error => {
                    if (error.response.status === 400) {
                        alert(error.response.data.message);
                    }
                })
            } else {
                console.error("Método não encontrado");
            }
        } catch (error) {
            console.error("Erro ao enviar formulário:", error);
        }
    };

    const handleClear = () => {
        const formulario = document.querySelector('.formulario');
        const inputs = formulario.querySelectorAll('input, select');

        inputs.forEach(input => {
            if (input.type !== 'hidden') {
                input.value = '';
                input.defaultValue = '';
            }
            onRequest(null);
            setData('');
        });
    }

    // Determinar se há abas e quais são
    useEffect(() => {
        const tabs = [...new Set(fields.map((field) => field.tab))].filter(
            (tab) => tab
        );
        setTabNames(tabs);
    }, [fields]);
    const Buttons = () => {
        return (
            <div>
                <Button
                    className="btn btn-primary me-1"
                    variant="primary"
                    type="submit"
                >
                    Enviar
                </Button>

                <Button
                    className="btn btn-danger light ms-1"
                    variant="primary"
                    type="reset"
                    onClick={() => navigate(-1)}
                >
                    Cancelar
                </Button>

            </div>
        );
    };
    const renderFields = (tabName) => {
        const filteredFields = fields.filter((field) => field.tab === tabName);

        // Dividir os campos em grupos de dois
        const fieldGroups = [];
        for (let i = 0; i < filteredFields.length; i += 2) {
            fieldGroups.push(filteredFields.slice(i, i + 2));
        }

        return fieldGroups.map((group, index) => (
            <Row key={index} className="mb-3">
                {group.map((field, idx) => (
                    <>
                        <Col xl={6} key={idx} className="mb-3">
                            <Form.Group controlId={`formGrid${field.name}`}>
                                <Form.Label >
                                    {field.label}
                                    {field.required && <span style={{ color: "red" }}> *</span>}
                                </Form.Label>
                                {
                                    field.type === "select" ? (
                                        <Form.Control
                                            as="select"
                                            key={index}
                                            name={field.name}
                                            value={field.value}
                                            defaultValue={field.defaultValue}
                                            onChange={handleChange}
                                            required={field.required}
                                            disabled={field.disabled}
                                            selected={field.defaultValue}
                                        >

                                            <option disabled selected={field.defaultValue === undefined}>Selecione</option>
                                            {field.options && field.options.map((option, index) => (
                                                <option key={index} value={option.value}>{option.label}</option>
                                            ))}
                                            {field.label === "Status" && (
                                                <>
                                                    <option value={1} selected={field.defaultValue === 1}>Ativo</option>
                                                    <option value={0} selected={field.defaultValue === 0}>Inativo</option>
                                                </>
                                            )}
                                            {field.label === "Cidade Agendamento Visual" &&
                                                cities.map((city, key) => (
                                                    <option key={city.id} value={city.id}>
                                                        {city.nome}
                                                    </option>
                                                ))}
                                            {field.label === "Unidade Agendamento Visual" &&
                                                units.map((unity) => (
                                                    unity.map((item) => {
                                                        return (
                                                            <option key={item.id} value={item.id}>{item.nome}</option>
                                                        );
                                                    })
                                                ))}
                                            {field.label === "Categoria ID" &&
                                                categories.map((category) => (
                                                    <option
                                                        key={category.id}
                                                        value={category.id}
                                                        disabled={category.status === "1" ?? null}
                                                    >
                                                        {category.descricao}
                                                    </option>
                                                ))}
                                        </Form.Control>
                                    ) : field.type === "select-multiple" ? (
                                        <Form.Group
                                            as={Col}
                                            key={index}
                                            controlId={`formGrid${field.name}`}
                                        >
                                            {field.label === "Perfil" && (
                                                <Select
                                                    isMulti={true}
                                                    name={field.name}
                                                    placeholder={`Selecione`}
                                                    options={profiles.map((perfil) => ({
                                                        value: perfil.ID,
                                                        label: perfil.PERFIL,
                                                        disabled: perfil.STATUS === "1",
                                                    }))}
                                                    required={field.required}
                                                    className="basic-multi-select"
                                                    disabled={field.disabled}
                                                    noOptionsMessage={() => "Nenhuma opção disponível"}
                                                    loadingMessage={() => "Carregando opções..."}
                                                    onChange={(e) => handleChange(e, field.name)}
                                                />
                                            )}
                                            {field.label === "Sistema de origem do dado" && (
                                                <Select
                                                    isMulti={true}
                                                    key={index}
                                                    name={field.name}
                                                    placeholder={field.label}
                                                    options={field.options.map((option) => ({
                                                        value: option,
                                                        label: option,
                                                    }))}
                                                    required={field.required}
                                                    className="basic-multi-select"
                                                    disabled={field.disabled}
                                                    onChange={handleChange}
                                                />
                                            )}
                                        </Form.Group>
                                    ) : field.type === "checkbox" ? (
                                        <>
                                            <Form.Check
                                                className={field.label}
                                                type={field.type}
                                                name={field.name}
                                                label={"Não"}
                                                value={0}
                                                id={`${field.name}-0`}
                                                onChange={handleChange}
                                                required={field.required}
                                                defaultChecked={field.selected === 0}
                                            />
                                            <Form.Check
                                                className={field.label}
                                                type={"checkbox"}
                                                name={field.name}
                                                label={"Sim"}
                                                id={`${field.name}-1`}
                                                value={1}
                                                onChange={handleChange}
                                                required={field.required}
                                                defaultChecked={field.selected === 1}
                                            />
                                        </>
                                    ) : field.type === 'multiple_checkbox' ? (
                                        <>
                                            {checkAll(field, index)}
                                        </>
                                    ) : field.request === true ? (
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                placeholder={field.placeholder ?? field.defaultValue}
                                                value={field.value}
                                                name={field.name}
                                                defaultValue={field.defaultValue}
                                                pattern={field.pattern}
                                                title={field.title}
                                                maxLength={field.maxLength}
                                                required={field.defaultValue ? false : field.required}
                                                disabled={field.disabled}
                                            />
                                            <InputGroup.Text>
                                                {data.length > 0  ? (
                                                    <span
                                                        id="search"
                                                        onClick={(e) =>
                                                            handleChange(
                                                                document.getElementById("search").parentNode
                                                                    .previousElementSibling,
                                                                "clear"
                                                            )
                                                        }
                                                    >
                                                        <i className="fa-solid fa-xmark" />
                                                    </span>
                                                ) : (
                                                    <span
                                                        id="search"
                                                        onClick={(e) =>
                                                            handleChange(
                                                                document.getElementById("search").parentNode
                                                                    .previousElementSibling
                                                            )
                                                        }
                                                    >
                                                        <i className="fa-solid fa-magnifying-glass" />
                                                    </span>
                                                )}
                                            </InputGroup.Text>
                                        </InputGroup>
                                    ) :
                                        (
                                            <Form.Control
                                                type={field.type}
                                                placeholder={field.placeholder ?? field.defaultValue}
                                                name={field.name}
                                                value={field.value}
                                                defaultValue={field.defaultValue}
                                                onChange={handleChange}
                                                pattern={field.pattern}
                                                title={field.title}
                                                maxLength={field.maxLength}
                                                required={field.defaultValue ? false : field.required}
                                                disabled={field.disabled}
                                            />
                                        )
                                }

                            </Form.Group>
                        </Col>
                    </>
                ))}
            </Row >
        ));
    };
    const checkAll = (field, index) => {
        return (
            <>
                <Form.Check
                    className={field.label}
                    type={"checkbox"}
                    name={field.name}
                    key={index}
                    id="check-all"
                    label="Selecione todos Módulos"
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

                <div className="row">
                    {menus.map((menu, index) => (
                        <div className="table-responsive">
                            <h4 className="card-title" key={index}>
                                <Form.Check
                                    name={menu?.menu}
                                    type={"checkbox"}
                                    id={menu?.id}
                                    key={index}
                                    label={menu?.menu}
                                    onChange={() => {
                                        const checkboxes = document.querySelectorAll(
                                            `#${menu.menu}.form-check-input[type="checkbox"]`
                                        );
                                        checkboxes.forEach(
                                            (checkbox) => (checkbox.checked = !checkbox.checked)
                                        );
                                    }}
                                />

                                <table className="table" id={menu?.mneu}>
                                    <thead>
                                        <tr>
                                            <th>
                                                Modulos
                                            </th>
                                            <th>Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {modulos.filter((modulo) => modulo?.menu_id === menu?.id).map((modulo, index) => (
                                            <tr>
                                                <td key={index}>
                                                    <Form.Check
                                                        name={field.name}
                                                        type={"checkbox"}
                                                        id={menu.menu}
                                                        value={modulo.id}
                                                        key={index}
                                                        label={modulo.modulo}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Label for={index}>
                                                        {modulo.status === 1 ? "Ativo" : "Inativo"}
                                                    </Form.Label>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </h4>
                        </div>

                    ))}
                </div>
            </>

        );
    };
    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title--large">{title}</h4>
                </div>
                <div className="card-body">
                    {tabNames.length > 0 ? (
                        <Tabs defaultActiveKey={tabNames[0]} className="mb-3">
                            {tabNames.map((tabName) => (
                                <Tab eventKey={tabName} title={tabName} key={tabName}>
                                    <Form className="formulario" onSubmit={handleSubmit}>
                                        {renderFields(tabName)}
                                        {Buttons()}
                                    </Form>
                                </Tab>
                            ))}
                        </Tabs>
                    ) : (
                        <Form className="formulario" onSubmit={handleSubmit}>
                            {renderFields()}
                            {Buttons()}
                        </Form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DynamicForm;
