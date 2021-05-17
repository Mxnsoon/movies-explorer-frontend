import React from 'react';
import './SectionTitle.css';

function SectionTitle({ title }) {
  return (
    <div className='section'>
      <h2 className='section__title'>{ title }</h2>
    </div>
  )
}

export default SectionTitle;