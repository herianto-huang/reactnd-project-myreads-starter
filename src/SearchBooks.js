import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelfChanger from './BookShelfChanger'

class SearchBooks extends Component {
    static propTypes = {
        curBooks: PropTypes.array.isRequired,
        bookShelfTypes: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
    }

    state = {
        query: '',
        books: []
    }

    changeShelf = (book, value) => {
        if(this.props.onChangeShelf)
            this.props.onChangeShelf(book, value)
    } 

    searchQuery = (query) => {
        if(query !== '') {
            const {curBooks} = this.props
            BooksAPI.search(query).then((books) => {
                if(!books || books.error) {
                    this.setState({
                        books: []
                    })
                    return
                }

                books.map((book) => 
				{					
					curBooks.filter((b) => b.id === book.id).map(b => { return book.shelf = b.shelf})
					return book
				}).map((b) => {
					b.shelf = !b.shelf ? 'none' : b.shelf;
					return b
				})
                this.setState({books})
            })
            
        }
        else {
            this.setState({
                books: []
            })
        }
        this.setState({query})
    }

    render() {
        const { query, books } = this.state
        const { bookShelfTypes } = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link> 
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                        value={query} onChange={(event) => this.searchQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-book-results">
                    <ol className="books-grid">
                        {books.filter((book) => book.imageLinks !== undefined).map((book) => (
                            <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                        <BookShelfChanger book={book} onChangeShelf={this.changeShelf} bookShelfTypes={bookShelfTypes} />
                                    </div>
                                </div>
                                <div className="book-title">
                                    {book.title}
                                </div>
                                <div className="book-authors">
                                    {!!book.authors ? book.authors.join(', ') : books.authors}
                                </div>
                            </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks