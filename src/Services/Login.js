import Api from '../lib/Api';
function LoginServices(formData) {
    Api()
        .post('login', formData).then((response) => {
            if (!response.data)
                throw new Error("Dados não encontrado!")
            if (response.statusText === "JWT") {
                localStorage.setItem('token', response.data);
                return window.location.pathname = '/dashboard';
            }
        }).catch(error => {
            if (!error?.status) {
                alert(error.code);
            } else if (error.response.status === 400) {
                alert('Usuário sem permissão!');
            } else if (error.response.status === 404) {
                alert('Usuário não encontrado!');
            } else if (error.response.status === 422) {
                alert('Dados não inseridos!');
            } else if (error.response.status === 401) {
                alert('Usuário sem acesso! Senha ou Email inválido!');
            } else if (error.response.status === 403) {
                alert('Usuário Inativado')
            } else {
                alert('Ocorreu um erro:', error);
            }
        });
}


export default LoginServices;
