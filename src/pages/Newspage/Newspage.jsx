import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link, useNavigate } from 'react-router-dom';
import '../AvailablePlayers/AvailablePlayers';
import axios from 'axios';
import banner from '../../assets/images/about-banner.png';
import { BASE_URL } from '../../baseurl/baseurl';
import { IoChevronBackOutline } from 'react-icons/io5';
import { IoChevronForward } from 'react-icons/io5';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute top-[-10%] right-[1%]  bg-[#F8FAFC] text-black hover:text-black rounded-full h-[30px] w-[30px] flex items-center justify-center`}
      onClick={onClick}>
      <IoChevronForward size={20} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute top-[-10%] right-[5%] left-auto bg-[#F8FAFC] text-black hover:text-black rounded-full h-[30px] w-[30px] flex items-center justify-center`}
      onClick={onClick}>
      <IoChevronBackOutline size={20} />
    </div>
  );
}

export default function AvailablePlayers() {
  const navigate = useNavigate();
  const [currentVideo, setCurrentVideo] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [videos, setVideos] = useState([]);
  const [news, setNews] = useState([]);
  const [videoDurations, setVideoDurations] = useState({});
  const handleVideoClick = (src) => {
    setCurrentVideo(src);
  };
  const togglePlayPause = () => {
    const videoElement = document.getElementById('videoPlayer');
    if (videoElement.paused) {
      videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  };
  useEffect(() => {
    getAvailabilityPlayer();
  }, []);
  useEffect(() => {
    console.log('videos are ', videos);
  }, [videos]);
  const getVideoDuration = (videoUrl, videoId) => {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.onloadedmetadata = () => {
      setVideoDurations((prevDurations) => ({
        ...prevDurations,
        [videoId]: video.duration,
      }));
    };
  };
  useEffect(() => {
    videos.forEach((video) => {
      getVideoDuration(video.video, video._id);
    });
  }, [videos]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };
  const getAvailabilityPlayer = async () => {
    try {
      let response = await axios.get(`${BASE_URL}/getAvalabilityPlayers`);
      console.log(response.data);
      setVideos(response.data.videos);
      setCurrentVideo(response.data.videos[0]?.video);
      setNews(response?.data?.news);
    } catch (error) {
      if (error?.response && error?.response?.data) {
        toastr.error(error?.response?.data?.error);
      } else {
        toastr.error('Server error please try again');
      }
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='grid grid-cols-1  lg:grid-cols-3 gap-4'>
      <div className='lg:col-span-2 flex flex-col'>
        <div
          className='w-[24px] h-[24px]'
          onClick={() => navigate(-1)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='17'
            height='15'
            viewBox='0 0 17 15'
            fill='none'
            class='w-full h-full'>
            <path
              d='M1.25 7.27441L16.25 7.27441'
              stroke='#130F26'
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'></path>
            <path
              d='M7.2998 13.299L1.2498 7.275L7.2998 1.25'
              stroke='#130F26'
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'></path>
          </svg>
        </div>
        <div className='relative w-full h-[280px] lg:h-[400px]  bg-black rounded-[20px] overflow-hidden mt-[30px] mb-12 lg:mb-20 '>
          <img
            className='w-full h-full object-cover opacity-40'
            src={banner}
            alt=''
          />
          <div className='absolute bottom-[10%] left-10 flex flex-col gap-4 max-w-[400px] z-[50]'>
            <button className='text-sm leading-6 text-[#fff] py-1 px-6 bg-primaryColor rounded-[30px] w-fit'>
              Follow
            </button>
            <h4 className='text-[18px] text-white'>
              The highlights that make Zach Edey an intriguing NBA prospect
            </h4>
          </div>
        </div>
        {/* trending */}
        <div className='trending'>
          <h3 className='text-[#000] text-[18px] font-medium leading-normal mb-[10px]'>
            Trending
          </h3>
          {/* <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4'> */}
          <Slider {...settings}>
            {Array.from(new Array(5)).map((item, index) => (
              <div
                key={Math.random()}
                onClick={() =>
                  navigate('/news-article/668ecfe57dd7cd360cb43cce')
                }
                className={`bg-[#fff] p-2 rounded-xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] relative h-fit w-full mb-4 cursor-pointer`}>
                {/* img wrapper */}
                <div className=' w-full h-[150px] rounded-xl overflow-hidden mb-1.5'>
                  <img
                    className='w-full h-full object-cover'
                    src={banner}
                    alt=''
                  />
                </div>
                <p className='text-[#000] text-base leading-6 mt-[15px] mb-[10px]'>
                  {' '}
                  {formatDate('2024-07-14T14:14:54.150+00:00')}{' '}
                </p>
                <h3 className='text-[#000] text-[18px] font-medium leading-normal mb-[10px]'>
                  3-Point Revolution: How the Long-Range Shot Changed the Game
                </h3>
              </div>
            ))}
          </Slider>
          {/* </div> */}
        </div>
        {/* new features */}
        <div className='features mt-10'>
          <h3 className='text-[#000] text-[18px] font-medium leading-normal mb-[10px]'>
            Feature news
          </h3>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div
              onClick={() => navigate('/news-article/668ecfe57dd7cd360cb43cce')}
              className={`bg-[#fff] p-2 rounded-xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] relative h-fit w-full cursor-pointer `}>
              {/* img wrapper */}
              <div className=' w-full h-[150px] rounded-xl overflow-hidden mb-1.5'>
                <img
                  className='w-full h-full object-cover'
                  src={banner}
                  alt=''
                />
              </div>
              <p className='text-[#000] text-base leading-6 mt-[15px] mb-[10px]'>
                {' '}
                {formatDate('2024-07-14T14:14:54.150+00:00')}{' '}
              </p>
              <h3 className='text-[#000] text-[18px] font-medium leading-normal mb-[10px]'>
                3-Point Revolution: How the Long-Range Shot Changed the Game
              </h3>
            </div>
            <div className='flex flex-col gap-4'>
              {Array.from(new Array(2)).map((item, index) => (
                <div
                  className={`bg-[#fff] p-2 rounded-xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] relative h-fit w-full flex items-center gap-4`}>
                  {/* img wrapper */}
                  <div className=' max-w-[87px] h-full rounded-xl overflow-hidden mb-1.5'>
                    <img
                      className='w-full h-full object-cover'
                      src={banner}
                      alt=''
                    />
                  </div>
                  <div>
                    <a
                      href='/news-article/668ecfe57dd7cd360cb43cce'
                      className='font-[16px] font-sfPro mb-1'>
                      3-Point Revolution: How the Long-Range
                    </a>
                    <p className='text-[14px]'>
                      Basketball, often referred to as
                      <br /> "the beautiful game,"...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='videos-section'>
          <h1 className='text-[18px] mb-[25px]'>Draft Videos</h1>
          <div className='video-container mb-[19px] relative'>
            <video
              controls
              id='videoPlayer'
              src={currentVideo}
              className='rounded-[10px] bg-[rgba(255,255,255,0.40)] w-full h-auto'
            />
            <div
              className='video-overlay absolute inset-0 flex items-center justify-center'
              onClick={togglePlayPause}>
              {isPlaying ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='15'
                  height='18'
                  viewBox='0 0 15 18'
                  fill='none'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M4 2H1C0.447715 2 0 2.44772 0 3V15C0 15.5523 0.447715 16 1 16H4C4.55228 16 5 15.5523 5 15V3C5 2.44772 4.55228 2 4 2ZM14 2H11C10.4477 2 10 2.44772 10 3V15C10 15.5523 10.4477 16 11 16H14C14.5523 16 15 15.5523 15 15V3C15 2.44772 14.5523 2 14 2Z'
                    stroke='white'
                    strokeWidth='1.3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='15'
                  height='18'
                  viewBox='0 0 15 18'
                  fill='none'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M14 8.78738C14 6.67844 3.19057 -0.0682953 1.96437 1.14481C0.73817 2.35792 0.620266 15.1025 1.96437 16.4299C3.30848 17.762 14 10.8963 14 8.78738Z'
                    stroke='white'
                    strokeWidth='1.3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              )}
            </div>
          </div>
          <div className='video-list'>
            {videos?.map((video, index) => (
              <div
                key={index}
                className='video-item flex items-center gap-[17px] mb-4 cursor-pointer'
                onClick={() => handleVideoClick(video?.video)}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18px'
                  height='18px'
                  viewBox='0 0 18 18'
                  fill='none'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M0.666992 9.00515C0.666992 4.40554 4.40734 0.666992 9.00033 0.666992C13.5933 0.666992 17.3337 4.40554 17.3337 9.00515C17.3337 13.5951 13.5933 17.3337 9.00033 17.3337C4.40734 17.3337 0.666992 13.5951 0.666992 9.00515ZM12.057 9.84853C12.1454 9.76009 12.258 9.62342 12.2822 9.59126C12.4109 9.42242 12.4752 9.21338 12.4752 9.00515C12.4752 8.77119 12.4028 8.55411 12.2661 8.37724C12.2549 8.36603 12.2329 8.34215 12.2043 8.31102C12.1508 8.25278 12.074 8.16919 12.0006 8.09584C11.3411 7.38833 9.61969 6.23059 8.71879 5.87683C8.58205 5.82136 8.23617 5.69996 8.05116 5.69192C7.8742 5.69192 7.70528 5.73212 7.54441 5.81251C7.34331 5.92507 7.18244 6.10195 7.09396 6.31099C7.03765 6.4557 6.94917 6.88986 6.94917 6.8979C6.86069 7.37225 6.81242 8.14408 6.81242 8.99631C6.81242 9.80914 6.86069 10.548 6.93308 11.0304C6.93507 11.0324 6.94199 11.0669 6.95274 11.1205C6.98542 11.2834 7.0535 11.6229 7.12613 11.762C7.30309 12.0997 7.64897 12.3087 8.01899 12.3087H8.05116C8.29248 12.3007 8.79923 12.0917 8.79923 12.0836C9.65187 11.7299 11.333 10.6284 12.0087 9.89677L12.057 9.84853Z'
                    fill='#130F26'
                  />
                </svg>
                <div className='video-details'>
                  <p className='video-title font-semibold text-[14px]'>
                    {video?.title}
                  </p>
                  <p className='video-duration text-gray-500 text-[12px]'>
                    {videoDurations[video._id]
                      ? `${Math.floor(
                          videoDurations[video._id] / 60
                        )}:${Math.floor(videoDurations[video._id] % 60)
                          .toString()
                          .padStart(2, '0')}`
                      : 'Loading...'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='news-draft mt-[14px] mb-[40px]'>
          <h2 className='text-[18px] font-sfPro mb-[10px] font-[500]'>
            Draft News
          </h2>
          <div className='news-wrapper-draft'>
            {news?.map((val, i) => {
              return (
                <div
                  className={`bg-[#fff] p-6 rounded-xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] relative h-fit w-full`}>
                  <Link to={`/news-article/${val?._id}`}>
                    <div className='news-box-draft'>
                      <div className='draft-cont'>
                        <h2 className='font-[16px] font-sfPro'>{val?.title}</h2>
                        <p className='text-[14px] font-normal'>
                          {val?.description}
                        </p>
                      </div>
                      <span className='draft-image'>
                        <img
                          src={val?.banner}
                          alt='draft'
                        />
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
