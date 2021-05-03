import './Promo.css';
import promo_logo from '../../images/promo-image.svg';

function Promo() {
    return (
      <section className="promo">
        <img className="promo__background-image" src={promo_logo} alt="Стилизованный логотип Яндекс Практикума" />
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
      </section>
    );
  }
  
  export default Promo;