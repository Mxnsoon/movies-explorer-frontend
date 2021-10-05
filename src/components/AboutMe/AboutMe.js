import './AboutMe.css';
import photo from '../../images/student-photo.jpg';

function AboutMe() {
    return (
        <section className="about-me" id="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__info">
                    <h3 className="about-me__name">Сергей</h3>
                    <p className="about-me__description">Фронтенд-разработчик, 26 лет</p>
                    <p className="about-me__text">Я родился и живу в Воронеже. Мне нравится фронтенд, и все, что с ним связано.
                        Каждый день я обучаюсь чему то новому, и интересному. В свободное время люблю активные виды спорта, а так же компьютерные игры.
                    </p>
                    <div className="about-me__links">
                        <a href="https://facebook.com/" className="about-me__link">Facebook</a>
                        <a href="https://github.com/Mxnsoon" className="about-me__link">Github</a>
                    </div>
                </div>
                <img className="about-me__photo" src={photo} alt="Фотография студента" />
            </div>
        </section>
    );
}

export default AboutMe;