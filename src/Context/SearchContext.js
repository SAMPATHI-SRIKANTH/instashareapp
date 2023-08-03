import React from 'react'

const SearchContext = React.createContext({
  showSearchResults: false,
  onClickSearchButton: () => {},
  onClickShowSearch: () => {},
  onClickMenu: () => {},
  onChangeSearch: () => {},
})

export default SearchContext
