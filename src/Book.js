import React, {Component} from 'react'
import './App.css'

class Book extends Component {


render(){

  return(
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + this.props.backgroundImage + ')' }}></div>
        <div className="book-shelf-changer">
          <select onChange={((event) => this.props.move(this.props.id, event.target.value))}>
            <option value="move">Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{this.props.title}</div>
      <div className="book-authors">{this.props.authors}</div>
    </div>
  )
}
}

export default Book
