import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Debounce } from "react-throttle";
import Book from './Book';

class Search extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired,
    };
    state = {
        query: '',
    };

    updateQuery = (value) => {
        this.setState(() => {
          return {query: value}
        })
        this.props.updateSearchResult('');
        this.props.updateSearchResult(value.trim());
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
                        <Debounce time="600" handler="onChange">
                        <input
                            type='text'
                            placeholder='Search by title or author'
                            onChange={(e) => this.updateQuery(e.target.value)}
                        />
                        </Debounce>
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
