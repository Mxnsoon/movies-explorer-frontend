import React from 'react';
import './SearchForm.css';

function SearchForm({handleSearch, windowWidth}) {
  const [checked, setChecked] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');

  function handleKeyword(evt) {
    setKeyword(evt.target.value);
  }

  function handleCheck() {
    setChecked(!checked);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    localStorage.setItem('keyword', keyword);
    handleSearch(checked);
  }

  React.useEffect(() => {
    handleSearch(checked)
    setKeyword(localStorage.getItem('keyword'))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    handleSearch(checked)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked])

  return (
    <section className='search'>
      <div className='search__container'>
        <form className='search__form' name='search' noValidate onSubmit={handleSubmit}>
          <input
            className='search__input'
            id='search'
            name='search'
            type='search'
            minLength='2'
            maxLength='40'
            required
            placeholder='Фильм'
            onChange={handleKeyword}
            value={keyword || ''}
          />
          <button
            className='search__button'
            type='submit'
            onSubmit={handleSubmit}
          >Найти</button>
        </form>
        {windowWidth > 600 &&
          <label className='search__checkbox'>
            <input
              className='search__checkbox-input'
              id='switcher'
              type='checkbox'
              onChange={handleCheck}
            />
            <div className='search__checkbox-text'>Короткометражки</div>
          </label>
        }
      </div>
      {windowWidth < 600 &&
      <label className='search__checkbox'>
        <input
          className='search__checkbox-input'
          id='switcher'
          type='checkbox'
          onChange={handleCheck}
        />
        <div className='search__checkbox-text'>Короткометражки</div>
      </label>
      }
    </section>
  )
}

export default SearchForm;