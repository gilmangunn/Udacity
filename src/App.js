import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Bookshelf from "./Bookshelf";
import './App.css';
import {getAll} from "./BooksAPI";
import {update} from "./BooksAPI";
import {search} from "./BooksAPI";



class App extends Component {

    state = {
        books: [],
        queryResults: []
    };

    constructor(props) {
        super(props);
        this.state = {books: [], queryResults: []};
        this.book = null;

    }

    componentWillMount() {

        getAll()
            .then((data) => {
                    this.setState({books: data});
                }
            )
    };

    updateQuery = (query) => {
        search(query, 20)
            .then((data) => (

                    (data != null && data.length > 0) ? this.setState({queryResults: data}) : this.setState({queryResults: []})
                )
            );
    }


    updateBook = (book_id, shelf) => (
        this.book = this.state.books.find(b => b.id === book_id),
            this.book.shelf = shelf,
            update(this.book, this.book.shelf).then(data => console.log(data)),
            shelf === 'none'
                ?
                this.setState(prevState => ({books: prevState.books.filter(b => b.id !== book_id)}))
                :
                this.setState(prevState => ({books: prevState.books.filter(b => b.id !== book_id).concat(this.book)}))
    )

    updateBookSearch = (book_id, shelf) => (
        this.book = this.state.queryResults.find(b => b.id === book_id),
            this.book.shelf = shelf,
            update(this.book, this.book.shelf).then(data => console.log(data)),
            shelf === 'none'
                ?
                this.setState(prevState => ({books: prevState.books.filter(b => b.id !== book_id)}))
                :
                this.setState(prevState => ({books: prevState.books.filter(b => b.id !== book_id).concat(this.book)}))
    )






    render() {
    return(
        <div className="app">
            <Route exact path='/' render={() => (
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <Bookshelf className="bookshelf" name="Currently Reading" move={this.updateBook}
                                       books={this.state.books.filter((book) => (book.shelf === 'currentlyReading'))}/>
                            <Bookshelf className="bookshelf" name="Want to Read" move={this.updateBook}
                                       books={this.state.books.filter((book) => (book.shelf === 'wantToRead'))}/>
                            <Bookshelf className="bookshelf" name="Read" move={this.updateBook}
                                       books={this.state.books.filter((book) => (book.shelf === 'read'))}/>
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to='/search'>Add a book</Link>
                    </div>
                </div>
            )
            }
            />
            <Route path='/search' render={() => (
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to='/'>Close</Link>

                            <div className="list-books-content">
                            <input type="text"  onChange={(event) => this.updateQuery(event.target.value)}  placeholder="Search by title or author"/>
                            <div className="search-books-input-wrapper">
                            <Bookshelf className="bookshelf" name="Search Results" move={this.updateBookSearch}
                                       books={this.state.queryResults}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            />



        </div>
    )
  }
}

export default App;
