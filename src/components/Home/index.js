import Header from '../Header'
import UserStories from '../UserStories'
import Posts from '../Posts'
import SearchContext from '../../Context/SearchContext'
import SearchResults from '../SearchResults'

import './index.css'

const Home = () => (
  <SearchContext.Consumer>
    {value => {
      const {searchValue, showSearchResults} = value
      return (
        <>
          <Header />
          <div className="home-container">
            {showSearchResults ? (
              <SearchResults searchInput={searchValue} />
            ) : (
              <>
                <UserStories />
                <Posts />
              </>
            )}
          </div>
        </>
      )
    }}
  </SearchContext.Consumer>
)

export default Home
