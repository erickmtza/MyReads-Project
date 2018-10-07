import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import ShowCase from './ShowCase'

class BooksApp extends React.Component {
  state = {
      books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then( books => {
        this.setState({ books })
    })
  }

  updateShelf(book, shelf) {
    BooksAPI.update(book, shelf);
  }

  render() {
    return (
      <div className="app">

        <Route path='/search' render={() => (
            <SearchPage

            />
      )} />

        <Route exact path='/' render={ ({ history }) => (
            <ShowCase
                bookIds={this.state.books}
                updateShelf={this.updateShelf}
            />
        )} />

      </div>
    )
  }
}

export default BooksApp
