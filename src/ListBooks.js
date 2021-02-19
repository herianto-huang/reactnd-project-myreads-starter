import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class ListBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        bookShelfTypes: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
    }

    changeShelf = (book,shelf) => {
      if(this.props.onChangeShelf)
        this.props.onChangeShelf(book, shelf);
    }

    render() {
        const { books, bookShelfTypes } = this.props

        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {bookShelfTypes.map((bookShelf) => (
                  <BookShelf key={bookShelf.value} bookShelfTypes={bookShelfTypes} bookShelf={bookShelf} books={books} onChangeShelf={this.changeShelf} />
                ))}
              </div>
            </div>
            <div className="open-search">
                <Link to="/search">
                    <button>Add a book</button>
                </Link> 
            </div>

          </div>
        )
    }
}

export default ListBooks