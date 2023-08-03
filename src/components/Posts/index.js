import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import PostItem from '../PostItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Posts extends Component {
  state = {
    postsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
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
      console.log(updatedData)
      this.setState({
        postsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
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

    await fetch(apiUrl, options)

    this.setState(prev => ({
      postsList: prev.postsList.map(each => {
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

    await fetch(apiUrl, options)

    this.setState(prev => ({
      postsList: prev.postsList.map(each => {
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

  renderPostsLoadingView = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onClickRetry = () => {
    this.setState({apiStatus: apiStatusConstants.inProgress}, this.getPosts)
  }

  renderPostsFailureView = () => {
    console.log('failure', this.state)
    return (
      <div className="failure-view">
        <img
          src="https://res.cloudinary.com/ssrikanth/image/upload/v1686326760/InstaShare/alert-triangle_p7nd3h.png"
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

  renderPostsSuccessView = () => {
    const {postsList} = this.state

    return (
      <>
        <ul className="list-of-posts">
          {postsList.map(eachPost => (
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

  renderPosts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderPostsLoadingView()
      case apiStatusConstants.failure:
        return this.renderPostsFailureView()
      case apiStatusConstants.success:
        return this.renderPostsSuccessView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderPosts()}</>
  }
}

export default Posts
