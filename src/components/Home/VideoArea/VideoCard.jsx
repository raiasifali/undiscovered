import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import './VideoCard.css';
import CustomVideoPlayer from '../../PlayerProfile/CustomVideoPlayer';
import axios from 'axios';
import { BASE_URL } from '../../../baseurl/baseurl';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import ReactPlayer from 'react-player';

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
  console.log(videoInfo, 'videoInfo');

  return (
    <div className="video-card relative">
      {/* Video area */}
      {videoInfo.type !== 'link' && videoInfo.type !== 'embed' && (
        <div className="w-full flex justify-end absolute top-[10px] right-[20px] z-[999]">
          <svg
            onClick={togglePopup}
            class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-dhaba5 cursor-pointer text-white"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ReplyIcon"
            height="25px"
            width="25px"
          >
            <path
              fill="#fff"
              d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11"
            ></path>
          </svg>
          {isPopupOpen && (
            <div className="subpopup">
              <div className="popup-content">
                <div
                  className="popup-item flex items-center gap-x-2"
                  onClick={flagVideo}
                >
                  {videoInfo?.flaggedBy?.find((u) => u == currentUser?._id) ? (
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#ff9999"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          opacity="0.5"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.5 1.75C6.5 1.33579 6.16421 1 5.75 1C5.33579 1 5 1.33579 5 1.75V21.75C5 22.1642 5.33579 22.5 5.75 22.5C6.16421 22.5 6.5 22.1642 6.5 21.75V13.6V3.6V1.75Z"
                          fill="#800000"
                        ></path>
                        <path
                          d="M13.3486 3.78947L13.1449 3.70801C11.5821 3.08288 9.8712 2.9258 8.22067 3.25591L6.5 3.60004V13.6L8.22067 13.2559C9.8712 12.9258 11.5821 13.0829 13.1449 13.708C14.8385 14.3854 16.7024 14.5119 18.472 14.0695L18.6864 14.0159C19.3115 13.8597 19.75 13.298 19.75 12.6538V5.28673C19.75 4.50617 19.0165 3.93343 18.2592 4.12274C16.628 4.53055 14.9097 4.41393 13.3486 3.78947Z"
                          fill="#800000"
                        ></path>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M5 21V3.90002C5 3.90002 5.875 3 8.5 3C11.125 3 12.875 4.8 15.5 4.8C18.125 4.8 19 3.9 19 3.9V14.7C19 14.7 18.125 15.6 15.5 15.6C12.875 15.6 11.125 13.8 8.5 13.8C5.875 13.8 5 14.7 5 14.7"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </g>
                    </svg>
                  )}
                  Flag Video
                </div>
                <div
                  className="popup-item flex items-center gap-x-2"
                  onClick={shareOnTwitter}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1.5em"
                    width="1.5em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                  </svg>
                  Share on Twitter
                </div>
                <div
                  className="popup-item flex items-center gap-x-2"
                  onClick={shareOnFacebook}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="-5 0 20 20"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    fill="#316FF6"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <title>facebook [#176]</title>
                      <desc>Created with Sketch.</desc>
                      <defs></defs>
                      <g
                        id="Page-1"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          id="Dribbble-Light-Preview"
                          transform="translate(-385.000000, -7399.000000)"
                          fill="#316FF6"
                        >
                          <g
                            id="icons"
                            transform="translate(56.000000, 160.000000)"
                          >
                            <path
                              d="M335.821282,7259 L335.821282,7250 L338.553693,7250 L339,7246 L335.821282,7246 L335.821282,7244.052 C335.821282,7243.022 335.847593,7242 337.286884,7242 L338.744689,7242 L338.744689,7239.14 C338.744689,7239.097 337.492497,7239 336.225687,7239 C333.580004,7239 331.923407,7240.657 331.923407,7243.7 L331.923407,7246 L329,7246 L329,7250 L331.923407,7250 L331.923407,7259 L335.821282,7259 Z"
                              id="facebook-[#176]"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  Share on Facebook
                </div>
                <div
                  className="popup-item flex items-center gap-x-2"
                  onClick={copyLink}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.6875 3.75C8.96439 3.75 7.5 5.23565 7.5 7.15385L7.5 15.4615C7.5 18.1444 9.55201 20.25 12 20.25C14.448 20.25 16.5 18.1444 16.5 15.4615V7.15385H18V15.4615C18 18.8963 15.351 21.75 12 21.75C8.649 21.75 6 18.8963 6 15.4615L6 7.15385C6 4.48383 8.06137 2.25 10.6875 2.25C13.3136 2.25 15.375 4.48383 15.375 7.15385V15.4615C15.375 17.3669 13.9013 18.9808 12 18.9808C10.0987 18.9808 8.625 17.3669 8.625 15.4615V7.15385H10.125V15.4615C10.125 16.615 11.0018 17.4808 12 17.4808C12.9982 17.4808 13.875 16.615 13.875 15.4615V7.15385C13.875 5.23565 12.4106 3.75 10.6875 3.75Z"
                        fill="#000000"
                      ></path>
                    </g>
                  </svg>
                  Copy Link
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="w-full  rounded-xl overflow-hidden mb-3 relative">
        {videoInfo.type === 'link' ? (
          <div className="relative w-full h-[250px] lg:h-[220px] rounded-lg overflow-hidden">
            <ReactPlayer url={videoInfo?.video} width="100%" height={'100%'} />
          </div>
        ) : videoInfo.type === 'embed' ? (
          <div className="relative w-full h-[250px] lg:h-[220px] rounded-lg overflow-hidden">
            <div
              className="h-full"
              dangerouslySetInnerHTML={{ __html: videoInfo?.video }}
            />
          </div>
        ) : (
          <CustomVideoPlayer
            src={videoInfo?.video}
            alt={videoInfo?.description}
          />
        )}
      </div>

      {/* Popup */}

      {/* Title and description */}
      <a href="">
        <h3 className="text-[18px] font-medium text-[#2684FC] ">
          {videoInfo?.title}
        </h3>
      </a>
      <p className="text-base text-[#666] font-medium">
        {videoInfo?.description}
      </p>
      <p className="text-sm text-[#bbb] font-thin">
        {formatDistanceToNow(new Date(videoInfo?.createdAt), { enUS })}
      </p>
    </div>
  );
};

VideoCard.propTypes = {
  videoInfo: PropTypes.object,
};

export default VideoCard;
