import React from 'react'

const SearchContext = React.createContext({
  showSearchResults: false,
  postsData: [],
  onClickSearchButton: () => {},
  onClickShowSearch: () => {},
  onClickMenu: () => {},
  onChangeSearch: () => {},
  onClickLikeIcon: () => {},
  onClickUnLikeIcon: () => {},
})

export default SearchContext
