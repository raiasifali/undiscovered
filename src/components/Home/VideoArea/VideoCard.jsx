import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import './VideoCard.css';
import CustomVideoPlayer from '../../PlayerProfile/CustomVideoPlayer';
import axios from 'axios';
import { BASE_URL } from '../../../baseurl/baseurl';

const VideoCard = ({ videoInfo }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('user')));
  }, [localStorage?.getItem('user')]);
  console.log(videoInfo);
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const shareOnTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      videoInfo?.video
    )}`;
    window.open(shareUrl, '_blank');
    setIsPopupOpen(false);
  };

  const shareOnFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      videoInfo?.video
    )}`;
    window.open(shareUrl, '_blank');
    setIsPopupOpen(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(videoInfo?.video);
    toastr.success('Video link copied successfully');
    setIsPopupOpen(false);
  };
  const flagVideo = async () => {
    if (!currentUser) {
      toastr.error('Login to flag videos');
      return;
    }
    let alreadyFlagged = videoInfo?.flaggedBy?.find(
      (u) => u === currentUser?._id
    );

    if (alreadyFlagged) {
      //     setState((prev)=>{
      //       let old=prev;
      //      let indexVideo=old?.videosData?.findIndex(u=>u?._id==videoInfo?._id)
      //  let alreadyFlagged=old?.videosData[indexVideo].flaggedBy?.find(u=>u===currentUser?._id)
      //  if(alreadyFlagged){
      //   old?.videosData[indexVideo]?.alreadyFlagged?.filter(u=>u!=currentUser?._id)
      //  }else{
      //   old?.videosData[indexVideo]?.alreadyFlagged?.push(currentUser?._id)
      //  }
      //  return old
      //     })
    }
    const headers = {
      headers: {
        authorization: `Bearer ${
          JSON.parse(localStorage?.getItem('user'))?.token
        }`,
      },
    };
    try {
      let response = await axios.get(
        `${BASE_URL}/flag-video/${videoInfo?._id}`,
        headers
      );
      console.log(response.data);
      if (response.status === 200) {
        toastr.success(response.data.message);
      }
    } catch (error) {
      if (error?.response && error?.response?.data) {
        toastr.error(error?.response?.data?.error);
      } else {
        toastr.error('Server error please try again');
      }
    }

    window.location.reload(true);
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className='video-card relative'>
      {/* Video area */}
      <div className='w-full flex justify-end absolute top-[10px] right-[20px] z-[999]'>
        <svg
          className='cursor-pointer'
          onClick={togglePopup}
          fill='white'
          height='25px'
          width='25px'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          id='Layer_1'>
          <path d='M8,6.5A1.5,1.5,0,1,1,6.5,8,1.5,1.5,0,0,1,8,6.5ZM.5,8A1.5,1.5,0,1,0,2,6.5,1.5,1.5,0,0,0,.5,8Zm12,0A1.5,1.5,0,1,0,14,6.5,1.5,1.5,0,0,0,12.5,8Z'></path>
        </svg>
        {isPopupOpen && (
          <div className='subpopup'>
            <div className='popup-content'>
              <div
                className='popup-item flex items-center gap-x-2'
                onClick={flagVideo}>
                {videoInfo?.flaggedBy?.find((u) => u == currentUser?._id) ? (
                  <svg
                    width='25'
                    height='25'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    stroke='#ff9999'>
                    <g
                      id='SVGRepo_bgCarrier'
                      stroke-width='0'></g>
                    <g
                      id='SVGRepo_tracerCarrier'
                      stroke-linecap='round'
                      stroke-linejoin='round'></g>
                    <g id='SVGRepo_iconCarrier'>
                      <path
                        opacity='0.5'
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M6.5 1.75C6.5 1.33579 6.16421 1 5.75 1C5.33579 1 5 1.33579 5 1.75V21.75C5 22.1642 5.33579 22.5 5.75 22.5C6.16421 22.5 6.5 22.1642 6.5 21.75V13.6V3.6V1.75Z'
                        fill='#800000'></path>
                      <path
                        d='M13.3486 3.78947L13.1449 3.70801C11.5821 3.08288 9.8712 2.9258 8.22067 3.25591L6.5 3.60004V13.6L8.22067 13.2559C9.8712 12.9258 11.5821 13.0829 13.1449 13.708C14.8385 14.3854 16.7024 14.5119 18.472 14.0695L18.6864 14.0159C19.3115 13.8597 19.75 13.298 19.75 12.6538V5.28673C19.75 4.50617 19.0165 3.93343 18.2592 4.12274C16.628 4.53055 14.9097 4.41393 13.3486 3.78947Z'
                        fill='#800000'></path>
                    </g>
                  </svg>
                ) : (
                  <svg
                    width='25'
                    height='25'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <g
                      id='SVGRepo_bgCarrier'
                      stroke-width='0'></g>
                    <g
                      id='SVGRepo_tracerCarrier'
                      stroke-linecap='round'
                      stroke-linejoin='round'></g>
                    <g id='SVGRepo_iconCarrier'>
                      <path
                        d='M5 21V3.90002C5 3.90002 5.875 3 8.5 3C11.125 3 12.875 4.8 15.5 4.8C18.125 4.8 19 3.9 19 3.9V14.7C19 14.7 18.125 15.6 15.5 15.6C12.875 15.6 11.125 13.8 8.5 13.8C5.875 13.8 5 14.7 5 14.7'
                        stroke='#000000'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'></path>
                    </g>
                  </svg>
                )}
                Flag Video
              </div>
              <div
                className='popup-item flex items-center gap-x-2'
                onClick={shareOnTwitter}>
                <svg
                  width='25'
                  height='25'
                  fill='#000000'
                  viewBox='0 0 64 64'
                  xmlns='http://www.w3.org/2000/svg'>
                  <g
                    id='SVGRepo_bgCarrier'
                    stroke-width='0'></g>
                  <g
                    id='SVGRepo_tracerCarrier'
                    stroke-linecap='round'
                    stroke-linejoin='round'></g>
                  <g id='SVGRepo_iconCarrier'>
                    <title></title>
                    <path d='M19.55,55.08c-7.37,0-13.37-1.58-16.54-3.24A1,1,0,0,1,3.43,50a38.37,38.37,0,0,0,15.86-4.44c-4.41-1.19-8.9-4.34-9.79-8.41a1,1,0,0,1,1.27-1.17,4.33,4.33,0,0,0,1.26.12A15.68,15.68,0,0,1,4.59,23.44a1,1,0,0,1,1.7-.76l0,0q.72.6,1.49,1.13a16.6,16.6,0,0,1-.6-12.94,1,1,0,0,1,1.69-.28C16,18.9,26.08,22.7,31.2,22.53a12.11,12.11,0,0,1-.2-2.2A12.35,12.35,0,0,1,43.34,8a14.33,14.33,0,0,1,8.93,3.42,19.86,19.86,0,0,0,2-.57A23.11,23.11,0,0,0,58,9.23a1,1,0,0,1,1.32,1.42,40.24,40.24,0,0,1-3.8,4.69A37.34,37.34,0,0,0,60.12,14a1,1,0,0,1,1.21,1.51,26.09,26.09,0,0,1-4.91,5c-.15,4.75-3.85,26.26-21.48,32.28l-.11,0A52.51,52.51,0,0,1,19.55,55.08ZM7.67,51.51a48.65,48.65,0,0,0,26.64-.63h0C51.31,45,54.55,23,54.42,20a1,1,0,0,1,.4-.85A23.91,23.91,0,0,0,57.39,17c-1.55.44-3.11.74-3.52.33a1,1,0,0,1-.23-.36,9.72,9.72,0,0,0-.49-1.08,1,1,0,0,1,.31-1.27,20.16,20.16,0,0,0,1.86-2l-.42.14a22.27,22.27,0,0,1-2.77.76,1,1,0,0,1-1-.35C49.93,11.67,46.33,10,43.34,10A10.31,10.31,0,0,0,33.4,23.14a1,1,0,0,1-.79,1.26c-5,.88-15.9-2.55-24.07-11.18-1.24,5,.65,10.69,3.47,13a1,1,0,0,1-1,1.68,26.14,26.14,0,0,1-4.08-2.29c.93,4.33,4,7.93,8.66,10.08a1,1,0,0,1-.09,1.85,12.93,12.93,0,0,1-3.48.5c1.63,3.1,6.15,5.52,9.87,5.91a1,1,0,0,1,.61,1.7C20.32,47.83,14,50.45,7.67,51.51ZM5.58,23.4h0Z'></path>
                  </g>
                </svg>
                Share on Twitter
              </div>
              <div
                className='popup-item flex items-center gap-x-2'
                onClick={shareOnFacebook}>
                <svg
                  width='25'
                  height='25'
                  viewBox='-5 0 20 20'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  xmlns:xlink='http://www.w3.org/1999/xlink'
                  fill='#000000'>
                  <g
                    id='SVGRepo_bgCarrier'
                    stroke-width='0'></g>
                  <g
                    id='SVGRepo_tracerCarrier'
                    stroke-linecap='round'
                    stroke-linejoin='round'></g>
                  <g id='SVGRepo_iconCarrier'>
                    <title>facebook [#176]</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g
                      id='Page-1'
                      stroke='none'
                      stroke-width='1'
                      fill='none'
                      fill-rule='evenodd'>
                      <g
                        id='Dribbble-Light-Preview'
                        transform='translate(-385.000000, -7399.000000)'
                        fill='#000000'>
                        <g
                          id='icons'
                          transform='translate(56.000000, 160.000000)'>
                          <path
                            d='M335.821282,7259 L335.821282,7250 L338.553693,7250 L339,7246 L335.821282,7246 L335.821282,7244.052 C335.821282,7243.022 335.847593,7242 337.286884,7242 L338.744689,7242 L338.744689,7239.14 C338.744689,7239.097 337.492497,7239 336.225687,7239 C333.580004,7239 331.923407,7240.657 331.923407,7243.7 L331.923407,7246 L329,7246 L329,7250 L331.923407,7250 L331.923407,7259 L335.821282,7259 Z'
                            id='facebook-[#176]'></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                Share on Facebook
              </div>
              <div
                className='popup-item flex items-center gap-x-2'
                onClick={copyLink}>
                <svg
                  width='25'
                  height='25'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <g
                    id='SVGRepo_bgCarrier'
                    stroke-width='0'></g>
                  <g
                    id='SVGRepo_tracerCarrier'
                    stroke-linecap='round'
                    stroke-linejoin='round'></g>
                  <g id='SVGRepo_iconCarrier'>
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M10.6875 3.75C8.96439 3.75 7.5 5.23565 7.5 7.15385L7.5 15.4615C7.5 18.1444 9.55201 20.25 12 20.25C14.448 20.25 16.5 18.1444 16.5 15.4615V7.15385H18V15.4615C18 18.8963 15.351 21.75 12 21.75C8.649 21.75 6 18.8963 6 15.4615L6 7.15385C6 4.48383 8.06137 2.25 10.6875 2.25C13.3136 2.25 15.375 4.48383 15.375 7.15385V15.4615C15.375 17.3669 13.9013 18.9808 12 18.9808C10.0987 18.9808 8.625 17.3669 8.625 15.4615V7.15385H10.125V15.4615C10.125 16.615 11.0018 17.4808 12 17.4808C12.9982 17.4808 13.875 16.615 13.875 15.4615V7.15385C13.875 5.23565 12.4106 3.75 10.6875 3.75Z'
                      fill='#000000'></path>
                  </g>
                </svg>
                Copy Link
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='w-full  rounded-xl overflow-hidden mb-3 relative'>
        <CustomVideoPlayer
          src={videoInfo?.video}
          alt={videoInfo?.description}
        />
      </div>

      {/* Popup */}

      {/* Title and description */}
      <h3 className='text-[18px] font-medium text-black mb-2'>
        {videoInfo?.title}
      </h3>
      <p className='text-base text-black font-medium'>
        {videoInfo?.description}
      </p>
    </div>
  );
};

VideoCard.propTypes = {
  videoInfo: PropTypes.object,
};

export default VideoCard;
