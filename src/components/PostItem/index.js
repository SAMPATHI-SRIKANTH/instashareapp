import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'

import {Link} from 'react-router-dom'

import './index.css'

const PostItem = props => {
  const {item, onClickLikeIcon, onClickUnLikeIcon} = props
  const {
    userId,
    postId,
    userName,
    profilePic,
    postDetails,
    likesCount,
    comments,
    createdAt,
    likeStatus,
  } = item

  const likeIcon = () => {
    onClickLikeIcon(postId)
  }

  const unLikeIcon = () => {
    onClickUnLikeIcon(postId)
  }

  return (
    <li className="post-item">
      <div className="post-user-profile">
        <div className="profile-pic-circle">
          <img
            src={profilePic}
            alt="post author profile"
            className="profile-pic"
          />
        </div>
        <Link to={`/users/${userId}`}>
          <p className="post-user-name">{userName}</p>
        </Link>
      </div>
      <img src={postDetails.imageUrl} alt="post" className="post-img" />
      <div className="post-content-container">
        <div className="post-icons-container">
          {likeStatus ? (
            <button
              type="button"
              className="icon-btn"
              // eslint-disable-next-line react/no-unknown-property
              testid="unLikeIcon"
              onClick={unLikeIcon}
            >
              <FcLike className="icon" />
            </button>
          ) : (
            <button
              type="button"
              className="icon-btn"
              // eslint-disable-next-line react/no-unknown-property
              testid="likeIcon"
              onClick={likeIcon}
            >
              <BsHeart className="icon" />
            </button>
          )}
          <button type="button" className="icon-btn">
            <FaRegComment className="icon" />
          </button>
          <button type="button" className="icon-btn">
            <BiShareAlt className="icon" />
          </button>
        </div>
        <p className="likes-count">{likesCount} likes</p>
        <p className="caption">{postDetails.caption}</p>
        <ul className="comments-container">
          {comments.map(each => (
            <li className="comment-item" key={each.userId}>
              <p className="comment">
                <span className="commented-user-name">{each.userName}</span>
                {each.comment}
              </p>
            </li>
          ))}
        </ul>
        <p className="created-at">{createdAt}</p>
      </div>
    </li>
  )
}

export default PostItem
