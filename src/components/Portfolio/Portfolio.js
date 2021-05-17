import linkIcon from "../../images/portfolio-link.svg";
import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__list">
                <li className="portfolio__list-item">Статичный сайт
                <a href="https://github.com/Mxnsoon/how-to-learn" className="portfolio__link">
                    <img className="portfolio__link-icon" src={linkIcon} alt="Иконка линка" />
                </a>
                </li>
                <li className="portfolio__list-item">Адаптивный сайт
                <a href="https://mxnsoon.github.io/russian-travel/" className="portfolio__link">
                    <img className="portfolio__link-icon" src={linkIcon} alt="Иконка линка" />
                </a>
                </li>
                <li className="portfolio__list-item">Одностраничное приложение
                <a href="https://mxnsoon.practice.nomoredomains.icu/" className="portfolio__link">
                    <img className="portfolio__link-icon" src={linkIcon} alt="Иконка линка" />
                </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;