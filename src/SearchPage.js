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
    this.setState({ query }, this.bookSearch())
  }

  bookSearch = () => {
    let searchedBooks
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      searchedBooks = BooksAPI.search(this.state.query).then((searchedBooks) => {
        if(searchedBooks.error) {
          this.setState({ newBooks: [] })
        } else if (searchedBooks.filter( bk => match.test(bk.name === this.state.query))){
          this.setState({ newBooks: searchedBooks })
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

                {this.state.newBooks.map(b => (
                  <li key={b.id}>
                      <Book
                        book={b}
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
