import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelfChanger extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        bookShelfTypes: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    changeShelf = (book, value) => {
        if(this.props.onChangeShelf)
            this.props.onChangeShelf(book, value)
    } 

    render() {
        const { book, bookShelfTypes } = this.props
        return(
            <select value={book.shelf} onChange={(event) => this.changeShelf(book, event.target.value)}>
				<option value="" disabled>Move to...</option>
				{bookShelfTypes.map(option => (
					<option value={option.value} key={option.value}>{option.text}</option>
				))}
                <option value="none">None</option>
			</select>
        )
    }
}

export default BookShelfChanger