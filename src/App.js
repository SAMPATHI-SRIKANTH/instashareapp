import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import SearchContext from './Context/SearchContext'
import Login from './components/Login'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  state = {
    showSearchResults: false,
    menuClick: false,
    searchBox: false,
    searchValue: '',
  }

  onClickShowSearch = () => {
    this.setState(prevState => ({
      menuClick: !prevState.menuClick,
      searchBox: !prevState.searchBox,
    }))
  }

  onClickMenu = () => {
    this.setState(prevState => ({
      menuClick: !prevState.menuClick,
      searchBox: false,
    }))
  }

  onChangeSearch = event => {
    this.setState({searchValue: event.target.value})
  }

  onClickSearchButton = () => {
    this.setState({showSearchResults: true})
  }

  render() {
    const {showSearchResults, menuClick, searchBox, searchValue} = this.state
    console.log(this.state)
    return (
      <SearchContext.Provider
        value={{
          menuClick,
          searchBox,
          searchValue,
          showSearchResults,
          onClickSearchButton: this.onClickSearchButton,
          onChangeSearch: this.onChangeSearch,
          onClickMenu: this.onClickMenu,
          onClickShowSearch: this.onClickShowSearch,
        }}
      >
        <div className="app">
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/my-profile" component={MyProfile} />
            <ProtectedRoute exact path="/users/:id" component={UserProfile} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </SearchContext.Provider>
    )
  }
}

export default App
