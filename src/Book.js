import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShelfChange from './ShelfChange';

class Book extends Component{
    static propTypes = {
        book: PropTypes.object.isRequired,
        changeShelf: PropTypes.func.isRequired
    };

    render(){
        const { book } = this.props;
        return(
            <div className='book' id={book.id}>
                <div className='book-top'>
                    { book.imageLinks?
                        <div className='book-cover' style={{backgroundImage: `url('${book.imageLinks.thumbnail}')` }}></div>
                    :null}
                    <ShelfChange
                        book={book}
                        changeShelf={this.props.changeShelf}/>
                </div>
                <div className='book-title'>{book.title}</div>
                { book.authors?
                <div className='book-authors'>{book.authors}</div>
                :null}
            </div>
        )
    }
}

export default Book;
