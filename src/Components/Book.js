import React, { Component } from 'react'
import * as BooksAPI from './../BooksAPI'
import PropTypes from 'prop-types'

class Book extends Component {
  updateShelf = event => {
    const shelf = event.target.value
    BooksAPI.update(this.props.book, shelf).then(shelves =>
      this.props.onUpdateShelf(this.props.book.id, shelf),
    )
  }

  render() {
    const { book } = this.props
    const { title } = book
    const thumbnail = (book.imageLinks && book.imageLinks.thumbnail) || ''
    const authors = (book.authors && book.authors.join(', ')) || ''
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${thumbnail})`,
            }}
          />
          <div className="book-shelf-changer">
            <select
              onChange={this.updateShelf}
              defaultValue={book.shelf || 'none'}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    )
  }
}

// Book.PropTypes = {
//   book: PropTypes.object,
//   onUpdateShelf: PropTypes.func
// }

export default Book
