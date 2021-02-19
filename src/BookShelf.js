import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

class BookShelf extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        bookShelfTypes: PropTypes.array.isRequired,
        bookShelf: PropTypes.object.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
    }

    changeShelf = (book,shelf) => {
		if(this.props.onChangeShelf)
			this.props.onChangeShelf(book, shelf);
	}

    render() {
        const { books, bookShelfTypes, bookShelf } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{bookShelf.text}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {books.filter((book) => book.shelf === bookShelf.value).map((book) => (
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


export default BookShelf