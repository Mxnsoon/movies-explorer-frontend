import { useLocation } from "react-router";
import "./Footer.css";

function Footer() {

    const { pathname } = useLocation();

    return (
        <footer className={`footer ${(pathname === "/" || pathname === "/saved-movies" || pathname === "/movies") ? "footer_visible" : ''}`}>
            <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__copyright">&copy; 2021</p>
                <ul className="footer__list">
                    <li className="footer__list-item">
                        <a href="https://praktikum.yandex.ru/web" className="footer__link">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__list-item">
                        <a href="https://github.com/Mxnsoon" className="footer__link">Github</a>
                    </li>
                    <li className="footer__list-item">
                        <a href="https://facebook.com" className="footer__link">Facebook</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;