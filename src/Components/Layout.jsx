import Preloader from './Comum/Preloader';
import Menu from './Comum/Menu';
import Container from './Comum/Container';
import Footer from './Comum/Footer';
import Header from './Comum/Header';
import Title from './Comum/Title';
import { jwt_Decode } from '../Config/Config';
export default function Layout({ children }) {
    const parts =  window.location.pathname.split('-')[0].replace(/\//g, ' ').replace(/-/g, ' ');
    const title = parts.charAt(1).toUpperCase() + parts.slice(2);
    return (
        <div id="main-wrapper" className="show">
            <Preloader />
            <Header props={jwt_Decode["0"]} />
            <Menu props={jwt_Decode.menus} />
            <div className="content-body" style={{ minHeight: "720px" }}>
                <Title title={title} />
                <Container children={children} />
            </div>
            <Footer />
        </div>

    );
}



