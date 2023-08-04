import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProfileCard from '../ProfileCard'

import './index.css'

const apiUserProfileStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {
    profileData: [],
    apiStatusUserProfileUserProfile: apiUserProfileStatus.initial,
  }

  componentDidMount() {
    this.getUserProfileData()
  }

  getUserProfileData = async () => {
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')

    this.setState({apiStatusUserProfile: apiUserProfileStatus.inProgress})

    const apiUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        profile: {
          id: data.user_details.id,
          userId: data.user_details.user_id,
          userName: data.user_details.user_name,
          profilePic: data.user_details.profile_pic,
          followersCount: data.user_details.followers_count,
          followingCount: data.user_details.following_count,
          userBio: data.user_details.user_bio,
          postsCount: data.user_details.posts_count,
          posts: data.user_details.posts.map(each => ({
            id: each.id,
            image: each.image,
          })),
          stories: data.user_details.stories.map(each => ({
            id: each.id,
            image: each.image,
          })),
        },
      }
      this.setState({
        profileData: updatedData,
        apiStatusUserProfile: apiUserProfileStatus.success,
      })
    } else {
      this.setState({apiStatusUserProfile: apiUserProfileStatus.failure})
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
      {apiStatusUserProfile: apiUserProfileStatus.inProgress},
      this.getUserProfileData,
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

  renderUserProfileSuccessView = () => {
    const {profileData} = this.state

    return (
      <>
        <ProfileCard data={profileData} person="user" />
      </>
    )
  }

  renderUserProfile = () => {
    const {apiStatusUserProfile} = this.state

    switch (apiStatusUserProfile) {
      case apiUserProfileStatus.success:
        return this.renderUserProfileSuccessView()
      case apiUserProfileStatus.inProgress:
        return this.renderLoadingView()
      case apiUserProfileStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderUserProfile()}
      </>
    )
  }
}
export default UserProfile
