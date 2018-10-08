import React from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchPage extends React.Component {
  state = {
    query: '',
    newBooks: []
  }

  updateQuery = query => {
    this.setState({ query }, this.bookSearch(query))
  }

  bookSearch = (query) => {
    let searchedBooks
    if (query) {
      BooksAPI.search(query).then(newBooks => {
        if(newBooks.error) {
          this.setState({ newBooks: [] })
        } else if (newBooks.length > 0){
          newBooks.forEach(newBook => {
            let shelvedbooks = this.props.bookIds.filter(book => book.id === newBook.id)
            newBook.shelf = shelvedbooks[0] ? shelvedbooks[0].shelf : 'none'
          })
          this.setState({ newBooks })
        }
      })
    } else {
      this.setState({ newBooks: [] })
    }
  }

  render() {
    const { query } = this.state

    return (
      <div className="search-books">
          <div className="search-books-bar">

              <Link
                  to='/'
                  className="close-search"
              >Close</Link>

              <div className="search-books-input-wrapper">

                <input
                    type="text"
                    placeholder="Search by title or author"
                    value={query}
                    onChange={ event => this.updateQuery(event.target.value)}
                />

              </div>
          </div>
          <div className="search-books-results">
              <ol className="books-grid">

                {this.state.query && this.state.newBooks.map(b => (
                  <li key={b.id}>
                      <Book
                        book={b}
                        updateShelf={this.props.updateShelf}
                      />
                  </li>
                ))
                }

              </ol>
          </div>
      </div>
    )
  }
}

export default SearchPage
