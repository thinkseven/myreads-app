import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BookShelf = props => {
  const { title, books, onUpdateShelf } = props
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => {
            return (
              <li key={book.id}>
                <Book book={book} onUpdateShelf={onUpdateShelf} />
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

// BookShelf.PropTypes = {
//   books: PropTypes.array,
//   onUpdateShelf: PropTypes.func,
//   title: PropTypes.string,
// }

export default BookShelf
