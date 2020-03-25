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

    constructor(props){
        super(props);
        this.state = {books: [], queryResults: []};

    }

    componentWillMount(){

        getAll()
            .then((data) => {
                    this.setState({books: data });
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


    updateBook = (id, shelf)  => {
        let kludge = new Object();
        kludge.id = id;
        console.log(kludge.id + " " + shelf);
        update(kludge, shelf)
            .then(
                getAll()
                    .then((data) => (
                            this.setState({books: data })
                        )
                    )
            )
    }

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
                            <Bookshelf className="bookshelf" name="Search Results" move={this.updateBook}
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
