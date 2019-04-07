import React, { Component, Suspense } from 'react'
import { Route } from 'react-router-dom'
import './App.css'

const BookSearch = React.lazy(() => import('./Components/BookSearch'))
const BookShelves = React.lazy(() => import('./Components/BookShelves'))

class BooksApp extends Component {
  render() {
    return (
      <div className="app">
        <Suspense fallback={<div>Loading ...</div>}>
          <Route exact path="/" component={BookShelves} />
          <Route path="/search" component={BookSearch} />
        </Suspense>
      </div>
    )
  }
}

export default BooksApp
