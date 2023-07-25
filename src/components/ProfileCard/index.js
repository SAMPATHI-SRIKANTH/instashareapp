import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import './index.css'

const ProfileCard = props => {
  console.log(props)
  const {data, person} = props

  const {profile} = data

  const {
    userId,
    userName,
    profilePic,
    followersCount,
    followingCount,
    userBio,
    posts,
    stories,
    postsCount,
  } = profile

  return (
    <li className="profile-container">
      <div className="profile">
        <div className="profile-img-container">
          <img
            src={profilePic}
            alt={`${person} profile`}
            className="profile-img"
          />
        </div>
        <div>
          <h1 className="profile-user-name-des">{userName}</h1>
          <div className="follows-details-container">
            <p className="follow-details">{postsCount} Posts</p>
            <p className="follow-details">{followersCount} followers</p>
            <p className="follow-details">{followingCount} following</p>
          </div>
          <div className="bio-container">
            <p className="profile-user-id-des">{userId}</p>
            <p className="profile-bio-des">{userBio}</p>
          </div>
        </div>
      </div>
      <ul className="profile-stories">
        {stories.map(each => (
          <li key={each.id} className="story-pic-circle">
            <img
              src={each.image}
              alt={`${person} story`}
              className="story-pic"
            />
          </li>
        ))}
      </ul>
      <hr className="profile-horizontal-line" />
      <div className="profile-posts-container">
        <div className="profile-post-header">
          <BsGrid3X3 className="profile-grid-icon" />
          <h1 className="profile-post-head">Posts</h1>
        </div>
        {posts.length === 0 ? (
          <div className="no-post-container">
            <BiCamera className="no-post-image" />
            <h1 className="no-post-head">No Posts Yet</h1>
          </div>
        ) : (
          <ul className="profile-posts-list">
            {posts.map(eachPost => (
              <li key={eachPost.id}>
                <img
                  src={eachPost.image}
                  alt={`${person} post`}
                  className="profile-post-img"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

export default ProfileCard
