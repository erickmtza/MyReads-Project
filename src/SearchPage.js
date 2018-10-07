import React from 'react'
import { Link } from 'react-router-dom'

class SearchPage extends React.Component {
  state = {
    query: ''
  }

  updateQuery = query => {
    this.setState({ query })
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
              <ol className="books-grid"></ol>
          </div>
      </div>
    )
  }
}

export default SearchPage
