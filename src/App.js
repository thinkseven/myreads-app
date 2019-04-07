import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import BookSearch from './Components/BookSearch'
import BookShelves from './Components/BookShelves'

class BooksApp extends React.Component {
  
	render() {
		return (
      		<div className="app">
       			<Route exact path='/' component={ BookShelves } />
        		<Route path='/search' component={ BookSearch } />
      		</div>
    	)
  	}
  
}

export default BooksApp
