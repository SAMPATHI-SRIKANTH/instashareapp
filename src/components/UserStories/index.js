import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import StoriesList from '../StoriesList'

import './index.css'

const apiStoriesStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserStories extends Component {
  state = {
    storiesList: [],
    apiStatus: apiStoriesStatus.initial,
  }

  componentDidMount() {
    this.getStories()
  }

  getStories = async () => {
    this.setState({apiStatus: apiStoriesStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const usersStories = data.users_stories.map(each => ({
        userId: each.user_id,
        userName: each.user_name,
        storyUrl: each.story_url,
      }))
      this.setState({
        storiesList: usersStories,
        apiStatus: apiStoriesStatus.success,
      })
    } else {
      this.setState({apiStatus: apiStoriesStatus.failure})
    }
  }

  renderLoadingView = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onClickRetry = () => {
    this.setState({apiStatus: apiStoriesStatus.inProgress}, this.getStories)
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

  renderSuccessView = () => {
    const {storiesList} = this.state
    return <StoriesList storiesList={storiesList} />
  }

  renderStories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStoriesStatus.inProgress:
        return this.renderLoadingView()
      case apiStoriesStatus.failure:
        return this.renderFailureView()
      case apiStoriesStatus.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return <div className="users-stories-container">{this.renderStories()}</div>
  }
}

export default UserStories
