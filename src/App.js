import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';
import Search from './Search';
import './App.css';


class BooksApp extends React.Component {
    state = {
        books: [],
        searchBooks: [],
    };

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks() {
        BooksAPI.getAll().then((books) => {
            this.setState({books});
        });
    }

    getShelfBooks(shelfName){
        return this.state.books.filter((b) => b.shelf === shelfName)
    }

    changeShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf).then((res) => {
            this.fetchBooks();
        });
    };

    updateSearchResult = (value) => {
        if(value.length>0){
            BooksAPI.search(value).then((books) => {
                if(books.length > 0){
                    books.forEach((book, index) => {
                        let theBook = this.state.books.find((x) => (x.id === book.id));
                        book.shelf = theBook ? theBook.shelf : 'none';
                        books[index] = book;
                    });
                    this.setState({
                        searchBooks: books
                    });
                }
            });
            } else {
                this.setState({
                    searchBooks: []
                });
        }
    };

    render() {
        return (
            <div className='app'>
            <Switch>
                <Route exact path='/' render={() => (
                    <div className='list-books'>
                        <div className='list-books-title'>
                            <h1>MyReads</h1>
                        </div>
                        <div className='list-books-content'>
                            <div>
                                <Shelf
                                    title='Currently Reading'
                                    books={this.getShelfBooks('currentlyReading')}
                                    changeShelf={this.changeShelf}
                                />
                                <Shelf
                                    title='Want to Read'
                                    books={this.getShelfBooks('wantToRead')}
                                    changeShelf={this.changeShelf}
                                />
                                <Shelf
                                    title='Read'
                                    books={this.getShelfBooks('read')}
                                    changeShelf={this.changeShelf}
                                />
                            </div>
                        </div>
                        <div className='open-search'>
                            <Link to='/search'>Add a book</Link>
                        </div>
                    </div>
                )}/>

                <Route path='/search' render={({ history }) => (
                    <Search
                        books={this.state.searchBooks}
                        updateSearchResult={this.updateSearchResult}
                        changeShelf={this.changeShelf}
                    />
                )}/>
            </Switch>
            </div>
        )
    }
}

export default BooksApp
