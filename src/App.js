import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books : [],
    bookShelfTypes : [
      { value:'currentlyReading', text: 'Currently Reading'},
      { value:'wantToRead', text: 'Want to Read' },
      { value:'read', text: 'Read' }
    ]
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  changeShelf = (book, shelf) => {
		BooksAPI.update(book,shelf).then(() => {
			book.shelf = shelf;
			this.setState((currentState) => ({
		      books:currentState.books.filter((b)=> b.id !== book.id).concat([book])
		    }))
		})
	}

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks books={this.state.books} bookShelfTypes={this.state.bookShelfTypes} onChangeShelf={this.changeShelf} />
        )
        } />
        <Route path='/search' render={({ history }) => (
          <SearchBooks curBooks={this.state.books} bookShelfTypes={this.state.bookShelfTypes} onChangeShelf={this.changeShelf} /> 
        )} /> 
      </div>
    )
  }
}

export default BooksApp
