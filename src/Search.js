import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';

class Search extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired
    };

    updateSearchResult = (query) => {
        this.props.updateSearchResult('');
        this.props.updateSearchResult(query.trim());
    };

    // Reset search
    componentWillUnmount(){
        this.props.updateSearchResult('');
    };

    render(){
        return(
            <div className='search-books'>
                <div className='search-books-bar'>
                    <Link className='close-search' to='/'>Go Back Arrow</Link>
                    <div className='search-books-input-wrapper'>
                        <input
                            type='text'
                            placeholder='Search by title or author'
                            onInput={(e) => this.updateSearchResult(e.target.value)}
                        />
                    </div>
                </div>
                <div className='search-books-results'>
                    <ol className='books-grid'>
                        {this.props.books.map((book) => (
                            <li key={book.id} className='contact-list-item'>
                                <Book
                                    book={book}
                                    changeShelf={this.props.changeShelf} />
                            </li>
                        ))}
                    </ol>
                    <div className='close-button'>
                        <Link to='/'>Close</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;
