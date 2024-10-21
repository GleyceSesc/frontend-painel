import Swal from 'sweetalert2';
import Api from '../lib/Api';
const HandleLogout = () => {
    Swal.fire({
        title: 'Tem certeza que deseja sair?',
        text: 'Você será deslogado do sistema.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, sair!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            if (Api().get('logout')) {
                localStorage.clear();
                window.location.pathname = '/';
            }
        }
    });
};



export default HandleLogout;