import { resolvePath, useNavigate } from "react-router-dom";
import { permission } from '../../Services/RoutesProtected';
import Swal from 'sweetalert2';
import { id_usuario } from '../../Config/Config';
import Api from '../../lib/Api';
function Buttons({ type, rota, title, dado, data }) {
    const navigate = useNavigate();
    if (!permission(`/${rota}-${type}`))
        return void 0;
    const onClick = () => {
        if (type === 'editar') {
            const param = dado.UUID ?? dado.uuid ?? dado.id ?? dado.matricula;
            navigate(`/${rota}-${type}?dado=${param}`);
        }
        else if (type === 'cadastrar') {
            navigate(`/${rota}-${type}`);
        } else {
            Swal.fire({
                title: 'Deseja continuar com essa operação?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    let parameter = Object.keys(dado).find(key => ['uuid', 'cnpj', 'id'].includes(key.toLowerCase()));
                    parameter = dado[parameter];
                    Api().delete(`${rota}/${parameter}`,
                        {
                            data: {
                                "id_modulo": '19',
                                "id_usuario": id_usuario
                            }
                        }
                    ).then(response => {
                        if (response.status !== 200) {
                            throw new Error("Erro ao realizar operação!");
                        }
                        alert(response.data.message);
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    })
                        .catch(error => alert(error))
                } else {
                    alert("Operação não será realizada")
                }
            })
        }
    }
    const relatorio = () => {
        navigate('/relatorio');
    }
    const grafico = (id) => {
        navigate(`/grafico/${id}`);
    }
    if (type === 'cadastrar') {
        return (
            <div>
                <a className="btn btn-primary btn-sm" data-bs-toggle="offcanvas" onClick={onClick} role="button" aria-controls="offcanvasExample">Cadastro de {title}</a>
            </div>
        );
    }
    else if (type === 'editar') {
        return (
            <div onClick={onClick}>
                <a className="btn btn-primary shadow btn-xs sharp me-1"><i className="fas fa-pencil-alt"></i></a>
            </div>
        );
    }
    else if (type === 'deletar') {
        return (
            <div onClick={onClick}>
                <a className="btn btn-danger shadow btn-xs sharp"><i className="fa fa-trash"></i></a>
            </div>
        );
    }
    else if (type === 'recurso') {
        return (
            <button className="btn btn-primary shadow btn-xs sharp me-1">
                <i className="fa-solid fa-bars" onClick={() => relatorio(dado.id)} />
            </button>
        )
    }
    else if (type === 'grafico') {
        return (
            <button className="btn btn-primary shadow btn-xs sharp me-1">
                <i className="fa-solid fa-chart-simple" onClick={() => grafico(dado.id)} />
            </button>
        )
    }
    else if (type === 'ativar') {
        return (
            <div onClick={onClick}>
                <a className="btn btn-success shadow btn-xs sharp"><i className="fa-solid fa-check"></i></a>
            </div>
        )
    }
    else if (type === 'inativar') {
        return (
            <div onClick={onClick}>
                <a className="btn btn-danger shadow btn-xs sharp"><i class="fa-solid fa-xmark" style={{color: "#fafcff;"}}/></a>
            </div>
        )
    }
    else {
        return null;
    }
}



export default Buttons;