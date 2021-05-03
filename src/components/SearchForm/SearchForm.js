import './SearchForm.css';

function SearchForm() {

    return (
      <section className="searchForm">
        <div className="searchForm__flex-container">
          <form className="searchForm__form">
            <input className="searchForm__input" type="text" name="search" placeholder="Фильм" required />
          </form>
          <button className="searchForm__button">Найти</button>
        </div>
        <div className="searchForm__flex-container searchForm__flex_tumbler">
          <button className="searchForm__button-tumbler"></button>
          <p className="searchForm__name-tumbler">Короткометражки</p>
        </div>
        <div className="searchForm__line"></div>
      </section>
    );
  }
  
  export default SearchForm;