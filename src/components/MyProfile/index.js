import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProfileCard from '../ProfileCard'

import './index.css'

const apiMyProfileStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {
    profileData: {},
    apiStatus: apiMyProfileStatus.initial,
  }

  componentDidMount() {
    this.getMyProfileData()
  }

  getMyProfileData = async () => {
    const token = Cookies.get('jwt_token')

    this.setState({apiStatus: apiMyProfileStatus.inProgress})

    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
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
          id: data.profile.id,
          userId: data.profile.user_id,
          userName: data.profile.user_name,
          profilePic: data.profile.profile_pic,
          followersCount: data.profile.followers_count,
          followingCount: data.profile.following_count,
          userBio: data.profile.user_bio,
          postsCount: data.profile.posts_count,
          posts: data.profile.posts.map(each => ({
            id: each.id,
            image: each.image,
          })),
          stories: data.profile.stories.map(each => ({
            id: each.id,
            image: each.image,
          })),
        },
      }
      this.setState({
        profileData: updatedData,
        apiStatus: apiMyProfileStatus.success,
      })
    } else {
      this.setState({apiStatus: apiMyProfileStatus.failure})
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
      {apiStatus: apiMyProfileStatus.inProgress},
      this.getMyProfileData,
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/ssrikanth/image/upload/v1686326749/InstaShare/Group_7522_fxycfq.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-heading">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failure-button"
        onClick={this.onClickRetry}
      >
        Try again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {profileData} = this.state
    console.log(profileData)
    return (
      <>
        <ProfileCard data={profileData} person="my" />
      </>
    )
  }

  renderMyProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiMyProfileStatus.inProgress:
        return this.renderLoadingView()
      case apiMyProfileStatus.failure:
        return this.renderFailureView()
      case apiMyProfileStatus.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderMyProfile()}
      </>
    )
  }
}
export default MyProfile
