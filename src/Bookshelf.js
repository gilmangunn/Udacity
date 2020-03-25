import React, {Component} from 'react'
import Book from './Book'


class Bookshelf extends Component {

render(){
  return (
    <div>

      <h2 className="bookshelf-title">{this.props.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.books.map((book) => (
            <li key={book.id}>
              <Book id={book.id} shelf={book.shelf} move={this.props.move} backgroundImage={book.imageLinks.thumbnail} title={book.title} authors={book.authors}/>
              </li>
        ))}
        </ol>

      </div>
    </div>
  )
}
}

export default Bookshelf
