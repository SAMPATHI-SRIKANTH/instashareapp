import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import PostItem from '../PostItem'

import './index.css'

const apiSearchStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  empty: 'EMPTY',
}

class SearchResults extends Component {
  state = {
    searchPostsList: [],
    apiSearchStatus: apiSearchStatusConstants.initial,
  }

  componentDidMount() {
    this.getSearchPosts()
  }

  getSearchPosts = async () => {
    this.setState({apiSearchStatus: apiSearchStatusConstants.inProgress})
    const {searchInput} = this.props
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      if (data.posts.length === 0) {
        this.setState({apiSearchStatus: apiSearchStatusConstants.empty})
      } else {
        const updatedData = data.posts.map(each => ({
          postId: each.post_id,
          userId: each.user_id,
          likeStatus: false,
          userName: each.user_name,
          profilePic: each.profile_pic,
          postDetails: {
            imageUrl: each.post_details.image_url,
            caption: each.post_details.caption,
          },
          likesCount: each.likes_count,
          comments: each.comments.map(eachItem => ({
            userName: eachItem.user_name,
            userId: eachItem.user_id,
            comment: eachItem.comment,
          })),
          createdAt: each.created_at,
        }))
        this.setState({
          searchPostsList: updatedData,
          apiSearchStatus: apiSearchStatusConstants.success,
        })
      }
    } else {
      this.setState({apiSearchStatus: apiSearchStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onClickRetry = () => {
    this.setState(
      {apiSearchStatus: apiSearchStatusConstants.inProgress},
      this.getSearchPosts,
    )
  }

  renderFailureView = () => {
    console.log('failure', this.state)
    return (
      <div className="failure-view">
        <img
          src="https://res.cloudinary.com/ssrikanth/image/upload/v1686326749/InstaShare/Group_7522_fxycfq.png"
          alt="failure view"
          className="failure-img"
        />
        <p className="failure-heading">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="failure-button"
          onClick={this.onClickRetry}
        >
          Try again
        </button>
      </div>
    )
  }

  onClickLikeIcon = async postId => {
    const token = Cookies.get('jwt_token')

    const apiUrl = ` https://apis.ccbp.in/insta-share/posts/${postId}/like`

    const post = {
      like_status: true,
    }

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    }

    const msg = await fetch(apiUrl, options)
    console.log(msg)

    this.setState(prev => ({
      searchPostsList: prev.searchPostsList.map(each => {
        if (each.postId === postId) {
          return {
            ...each,
            likesCount: each.likesCount + 1,
            likeStatus: !each.likeStatus,
          }
        }
        return each
      }),
    }))
  }

  onClickUnLikeIcon = async postId => {
    const token = Cookies.get('jwt_token')

    const apiUrl = ` https://apis.ccbp.in/insta-share/posts/${postId}/like`

    const post = {
      like_status: false,
    }

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    }

    const msg = await fetch(apiUrl, options)
    console.log(msg)

    this.setState(prev => ({
      searchPostsList: prev.searchPostsList.map(each => {
        if (each.postId === postId) {
          return {
            ...each,
            likesCount: each.likesCount - 1,
            likeStatus: !each.likeStatus,
          }
        }
        return each
      }),
    }))
  }

  renderSuccessView = () => {
    const {searchPostsList} = this.state

    return (
      <>
        <h1 className="search-head">Search Results</h1>
        <ul className="list-of-posts">
          {searchPostsList.map(eachPost => (
            <PostItem
              item={eachPost}
              key={eachPost.postId}
              onClickLikeIcon={this.onClickLikeIcon}
              onClickUnLikeIcon={this.onClickUnLikeIcon}
            />
          ))}
        </ul>
      </>
    )
  }

  renderEmptyView = () => (
    <div className="Not-found-view">
      <img
        src="https://res.cloudinary.com/dq7imhrvo/image/upload/v1643965945/insta%20Shere%20clone/Group_c2v5dj.jpg"
        alt="search not found"
        className="failure-img"
      />
      <h1 className="search_not-found">Search Not Found</h1>
      <p className="not-found-p">Try different keyword or search again</p>
    </div>
  )

  renderSearchPosts = () => {
    const {apiSearchStatus} = this.state

    switch (apiSearchStatus) {
      case apiSearchStatusConstants.empty:
        return this.renderEmptyView()
      case apiSearchStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiSearchStatusConstants.failure:
        return this.renderFailureView()
      case apiSearchStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-results-container">{this.renderSearchPosts()}</div>
    )
  }
}

export default SearchResults
