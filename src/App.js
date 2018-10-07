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

  render() {
    return (
      <div className="app">

        <Route path='/search' render={() => (
            <SearchPage />
      )} />

        <Route exact path='/' render={ ({ history }) => (
            <ShowCase />
        )} />

      </div>
    )
  }
}

export default BooksApp
