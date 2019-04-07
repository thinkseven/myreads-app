import React, { Component, Suspense } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './../BooksAPI'
const BookShelf = React.lazy(() => import('./BookShelf'))

class BookShelves extends Component {
  state = {
    books: [],
  }

  updateShelf = (id, shelf) => {
    const index = this.state.books.findIndex(book => book.id === id)
    if (index > -1) {
      const books = [...this.state.books]
      books[index].shelf = shelf
      this.setState({
        books: books,
      })
    }
  }

  getShelves = () => {
    BooksAPI.getAll().then(books =>
      this.setState({
        books: books,
      }),
    )
  }

  componentDidMount() {
    this.getShelves()
  }

  render() {
    const currentlyReadingBooks = this.state.books.filter(
      book => book.shelf === 'currentlyReading',
    )
    const wantToReadBooks = this.state.books.filter(
      book => book.shelf === 'wantToRead',
    )
    const readBooks = this.state.books.filter(book => book.shelf === 'read')

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Suspense fallback={<div>Loading ...</div>}>
              <BookShelf
                title="Currently Reading"
                books={currentlyReadingBooks}
                onUpdateShelf={this.updateShelf}
              />
              <BookShelf
                title="Want to Read"
                books={wantToReadBooks}
                onUpdateShelf={this.updateShelf}
              />
              <BookShelf
                title="Read"
                books={readBooks}
                onUpdateShelf={this.updateShelf}
              />
            </Suspense>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search"> Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookShelves
