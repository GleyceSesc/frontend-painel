import React, { useEffect, useState } from 'react';
import LoginServices from '../Services/Login';
import { deleteCookie, getCookie, setCookie } from '../lib/Cookies';
export default function Login() {
  const [usuario_rede, setusuario_rede] = useState(() => {
    const stored = getCookie('usuario_rede');
    return stored !== null ? stored : '';
  });
  const [senha, setsenha] = useState('');
  const [alert, setAlert] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('usuario_rede', usuario_rede);
    formData.append('senha', senha);
    try {
      LoginServices(formData);
    } catch (error) {
      setAlert(error);
    }
  }
  const handlePreferencia = (e, valor) => {
    if (e.target.checked)
      setCookie("usuario_rede", valor, 30);
      else
      deleteCookie("usuario_rede");
  }
  useEffect(()=> {
    var checkbox = document.getElementById("customCheckBox1");
    if(getCookie('usuario_rede')) {
      checkbox.checked = true;
    }
  })


  return (
    <section className="vh-100 azul-sesc">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <>
                    <div className="login-content">
                      <a href=""><img src="" className="mb-3 logo-light" alt="" /></a>
                    </div>
                    <div className="login-media text-center">
                      <img src="https://sesc-sc.com.br/Manager/show_image.php?show_arquivo=institucional&show_campo=institucional_imagem_pq&show_chave=Institucional_id=130" alt="" />
                    </div>
                  </>
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <div>
                      <div className="text-center">
                        <h3 className="title">Login</h3>
                        <p>Painel Administrativo</p>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="mb-1 text-dark">Usuário Rede</label>
                          <input type="text" name='usuario_rede' id="user-login" className="form-control" value={usuario_rede} onChange={(e) => setusuario_rede(e.target.value)} />
                        </div>
                        <div className="mb-4 position-relative">
                          <label className="mb-1 text-dark">Senha</label>
                          <input type="password" name="password" id="dz-password" className="form-control" value={senha} onChange={(e) => setsenha(e.target.value)} />
                          <span className="show-pass eye">
                            <i className="fa fa-eye-slash" />
                            <i className="fa fa-eye" />
                          </span>
                        </div>
                        <div className="form-row d-flex justify-content-between mt-4 mb-2">
                          <div className="mb-4">
                            <div className="form-check custom-checkbox mb-3">
                              <input type="checkbox" className="form-check-input" id="customCheckBox1" disabled={usuario_rede === ""? true : false} onChange={(e) => handlePreferencia(e, usuario_rede)}/>
                              <label className="form-check-label" htmlFor="customCheckBox1">Lembre minha preferência</label>
                            </div>
                          </div>
                        </div>
                        <div className="text-center mb-4">
                          <button type="submit" className="btn btn-primary btn-block azul-sesc">Entre</button>
                        </div>
                        {alert}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
