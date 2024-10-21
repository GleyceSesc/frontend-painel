import HandleLogout from '../../Services/Logout';
export default function Header(props) {
    const logout = () => {
    HandleLogout();
  }

  return (
    <div>
      <div className="nav-header">
        <a href="/dashboard" className="brand-logo">
          <img src="images/Sesc-7-e1715606298926-removebg-preview.png" alt="" style={{ width: '80px', height: '100%' }} className="brand-title" />
        </a>
        <div className="nav-control">
          <div className="hamburger">
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </div>
        </div>
      </div>
      <div className="header is-fixed">
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="header-left">
              </div>
              <ul className="navbar-nav header-right">
                <li className="nav-item ps-3">
                  <div className="dropdown header-profile2">
                    <a className="nav-link" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <div className="header-info2 d-flex align-items-center">
                        <div className="header-media">
                          <img src="images/logo-user.png" alt="" />
                        </div>
                        <div className="header-info">
                          <h6>{props.props.USUARIO_REDE}</h6>
                          <p>{props.props.EMAIL}</p>
                        </div>

                      </div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <div className="card border-0 mb-0">
                        <div className="card-body px-0 py-2">
                          <a onClick={logout} className="dropdown-item ai-icon">
                            <svg className="profle-logout" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7979" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            <span className="ms-2 text-danger">Logout </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>

  )
}