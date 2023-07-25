import Slider from 'react-slick'
import './index.css'

const StoriesList = ({storiesList}) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="main-container">
      <ul className="slick-container">
        <Slider {...settings}>
          {storiesList.map(eachStory => {
            const {userName, userId, storyUrl} = eachStory
            return (
              <div className="slick-item" key={userId}>
                <img className="logo-image" src={storyUrl} alt="user story" />
                <p className="story-user-name">{userName}</p>
              </div>
            )
          })}
        </Slider>
      </ul>
    </div>
  )
}

export default StoriesList
