import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {GoThreeBars} from 'react-icons/go'
import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'

import SearchResults from '../../Context/SearchContext'
import './index.css'

const Header = props => (
  <SearchResults.Consumer>
    {value => {
      const {
        menuClick,
        searchBox,
        searchValue,
        onClickMenu,
        onChangeSearch,
        onClickShowSearch,
        onClickSearchButton,
      } = value

      const clickShowSearch = () => {
        onClickShowSearch()
      }

      const changeSearch = event => {
        onChangeSearch(event)
      }

      const clickSearchButton = () => {
        onClickSearchButton()
      }

      const clickMenu = () => {
        onClickMenu()
      }

      const logoutClick = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      const renderMenuOptions = () => (
        <ul className="mobile-nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="mobile-nav-search-btn"
              onClick={clickShowSearch}
            >
              Search
            </button>
          </li>
          <li>
            <Link to="/my-profile" className="nav-link">
              Profile
            </Link>
          </li>
          <button type="button" className="logout-button" onClick={logoutClick}>
            Logout
          </button>
          <button type="button" className="close-btn" onClick={clickMenu}>
            <AiFillCloseCircle />
          </button>
        </ul>
      )

      const renderSearchBox = () => (
        <>
          <div className="mobile-search search-box-container">
            <input
              type="search"
              placeholder="Search Caption"
              className="header-search"
              onChange={changeSearch}
              value={searchValue}
            />
            <button
              type="button"
              className="header-search-button"
              onClick={clickSearchButton}
              // eslint-disable-next-line react/no-unknown-property
              testid="searchIcon"
            >
              <FaSearch className="header-search-icon" />
            </button>
          </div>
        </>
      )

      return (
        <div className="header-container">
          <nav className="nav-container">
            <div className="header-logo-container">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/ssrikanth/image/upload/v1686326557/InstaShare/Standard_Collection_8_z37oql.png"
                  alt="website logo"
                  className="header-logo"
                />
              </Link>

              <h1 className="header-logo-heading">Insta Share</h1>
            </div>
            <div className="header-right-side">
              <div className="search-box-container">
                <input
                  type="search"
                  placeholder="Search Caption"
                  className="header-search"
                  onChange={changeSearch}
                  value={searchValue}
                />
                <button
                  type="button"
                  className="header-search-button"
                  onClick={clickSearchButton}
                  // eslint-disable-next-line react/no-unknown-property
                  testid="searchIcon"
                >
                  <FaSearch className="header-search-icon" />
                </button>
              </div>
              <ul className="list-of-links">
                <li>
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/my-profile" className="nav-link">
                    Profile
                  </Link>
                </li>
              </ul>
              <button
                type="button"
                className="logout-button"
                onClick={logoutClick}
              >
                Logout
              </button>
            </div>

            <div className="menu-bar">
              <button type="button" className="menu-btn" onClick={clickMenu}>
                <GoThreeBars />
              </button>
            </div>
          </nav>
          <div className="nav-mobile">
            {menuClick && renderMenuOptions()}
            {searchBox && renderSearchBox()}
          </div>
        </div>
      )
    }}
  </SearchResults.Consumer>
)

export default withRouter(Header)
