import React, { memo } from 'react'
import PropTypes from 'prop-types';

function CommentsLayout({children, count, title}) {

  return (
    <div className='comments'>
      <p className='comments__title'>{title} ({count})</p>
      <ul className='comments__list'>
        {children[0]}
      </ul>
      {children[1]}
    </div>
  )
}

CommentsLayout.propTypes = {
  children: PropTypes.array,
  count: PropTypes.number,
  title: PropTypes.string
};

export default memo(CommentsLayout)