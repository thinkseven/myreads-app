import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './../BooksAPI'
import Book from './Book'

class BookSearch extends Component {
  state = {
    query: '',
    shelfMap: [],
    books: [],
  }

  updateShelf = (id, shelf) => {
    const index = this.state.shelfMap.findIndex(map => map.id === id)

    const shelfMap = [...this.state.shelfMap]
    if (index > -1) {
      shelfMap[index].shelf = shelf
    } else {
      shelfMap.push({ id, shelf })
    }

    this.setState({
      shelfMap: shelfMap,
      books: this.updateBooks([...this.state.books], shelfMap),
    })
  }

  updateBooks = (books, shelfMap) => {
    if (books && books.length > 0) {
      return books.map(book => {
        const map = shelfMap.filter(map => book.id === map.id)
        if (map && map.length > 0) {
          book.shelf = map[0].shelf
        }
        return book
      })
    }
  }

  searchBooks = event => {
    const query = event.target.value
    this.setState({
      query: query,
    })
    if (query !== '') {
      BooksAPI.search(query, 20).then(books => {
        this.setState(currentState => {
          if (books && books.error) {
            this.setState({
              query: '',
              books: [],
            })
          }
          const updatedBooks = this.updateBooks(books, currentState.shelfMap)
          if (currentState.query !== '') {
            return {
              books: updatedBooks,
            }
          }
        })
      })
    } else {
      this.setState({
        books: [],
      })
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      const shelfMap = books.map(book => {
        const { id, shelf } = book
        return {
          id: id,
          shelf: shelf,
        }
      })

      this.setState({
        shelfMap: shelfMap,
      })
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.searchBooks}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book => (
              <li key={book.id}>
                <Book book={book} onUpdateShelf={this.updateShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
