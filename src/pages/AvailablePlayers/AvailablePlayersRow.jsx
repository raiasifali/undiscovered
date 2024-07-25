import { useEffect, useState } from 'react';
import { BASE_URL } from '../../baseurl/baseurl';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

export default function AvailablePlayersRow({
  currentUser,
  setCurrentUser,
  player,
  currentVideo,
  setPlayer,
  isSubscription,
}) {
  const [Collapsed, setCollapsed] = useState(true);
  const [isPlaying2, setIsPlaying2] = useState(false);
  console.log(player, 'player player');
  const togglePlayPausePlayer = () => {
    const videoElement = document.getElementById('videoPlayer2');
    if (videoElement.paused) {
      videoElement.play();
      setIsPlaying2(true);
    } else {
      videoElement.pause();
      setIsPlaying2(false);
    }
  };

  const addNow = async (id) => {
    try {
      let token = JSON.parse(localStorage.getItem('user')).token;
      let headers = {
        authorization: `Bearer ${token}`,
      };
      let response = await axios.get(`${BASE_URL}/addRemoveFavourites/${id}`, {
        headers,
      });
      setPlayer((prev) => {
        let old;
        if (prev.length > 0) {
          old = [...prev];
        } else {
          old = prev;
        }

        let indexOfPlayer = old?.findIndex((u) => u?._id == id);
        let playerToBeUpdated = old[indexOfPlayer];
        let favouritePlayerArray;

        if (playerToBeUpdated?.favouriteBy?.length > 0) {
          favouritePlayerArray = [...playerToBeUpdated.favouriteBy];
        } else {
          favouritePlayerArray = [];
        }

        if (favouritePlayerArray.includes(currentUser._id)) {
          favouritePlayerArray = favouritePlayerArray.filter(
            (u) => u !== currentUser._id
          );
        } else {
          favouritePlayerArray = [...favouritePlayerArray, currentUser._id];
        }

        playerToBeUpdated = {
          ...playerToBeUpdated,
          favouriteBy: favouritePlayerArray,
        };

        old[indexOfPlayer] = playerToBeUpdated;

        console.log('NEW PLAYER');
        console.log(playerToBeUpdated);

        return old;
      });

      toastr.success(response.data.message);
    } catch (error) {
      if (error?.response && error?.response?.data) {
        toastr.error(error?.response?.data?.error);
      } else {
        toastr.error('Server error please try again');
      }
    }
  };
  return (
    <div className="pt-[18px] border-b-[2px] border-b-[#DBDBDB] flex flex-col gap-[6px] lg:gap-[20px] pb-[20px] px-4">
      <div className="flex lg:hidden  items-center gap-[5px] ">
        <span className="flex gap-[18px] items-center w-[40%]  lg:w-[35%]">
          <img
            src={player?.picture}
            className="rounded-full  w-[60px] lg:w-[60px] lg:h-[60px] object-cover"
            alt="avatar"
          />
          <p className=" font-sfPro text-[#4C8FE1] text-[18px] lg:text-[18px]">
            {player?.auth?.name}
            <p className="text-black text-[14px] font-[400]">
              {player?.institute.universityName}
            </p>
          </p>
        </span>
        <span className="w-[20%] lg:w-[35%]">
          <p className="lg:text-[16px] text-[16px]">{player?.class}</p>
        </span>
        <span className="w-[20%] lg:w-[35%]">
          <p className="lg:text-[16px] text-[16px]">{player?.height}</p>
        </span>
        <span className="w-[20%] lg:w-[30%] flex gap-[20px] items-center">
          <p className="lg:text-[16px] text-[14px]">{player?.position}</p>
          <button
            onClick={() =>
              (isSubscription === 'Professional' ||
                isSubscription === 'Enterprise') &&
              setCollapsed(!Collapsed)
            }
            className={`cursor-pointer ease-in-out duration-300 w-4 h-4 ${
              !Collapsed ? 'rotate-180' : ''
            } `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              className="w-full h-full"
            >
              <path
                d="M0.979454 0.813439C1.15697 0.635928 1.43474 0.61979 1.63048 0.765027L1.68656 0.813439L5.99967 5.12633L10.3128 0.813439C10.4903 0.635928 10.7681 0.61979 10.9638 0.765027L11.0199 0.813439C11.1974 0.99095 11.2135 1.26873 11.0683 1.46447L11.0199 1.52055L6.35323 6.18721C6.17572 6.36472 5.89794 6.38086 5.7022 6.23562L5.64612 6.18721L0.979454 1.52055C0.784192 1.32528 0.784192 1.0087 0.979454 0.813439Z"
                fill="black"
              />
            </svg>
          </button>
          {JSON.parse(localStorage.getItem('user'))?.role == 'coach' ? (
            <>
              <div onClick={() => addNow(player?._id)}>
                {player?.favouriteBy?.find((u) => u == currentUser?._id) ? (
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
                      {' '}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                        stroke="#ff0000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{' '}
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
                      {' '}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{' '}
                    </g>
                  </svg>
                )}
              </div>
            </>
          ) : (
            ``
          )}
        </span>
      </div>

      <div className="lg:flex hidden  items-center gap-[5px] ">
        <span className="flex gap-[18px] items-center w-[40%] lg:w-[35%]">
          <img
            src={player?.picture}
            className="w-[60px]  lg:w-[60px] lg:h-[60px] rounded-full  object-cover"
            alt="avatar"
          />
          <Link
            to={`/player-profile/${player?.auth?._id}`}
            className="text-[18px] font-medium text-[#4C8FE1] w-fit block  hover:underline"
          >
            {player?.auth?.name}
          </Link>
        </span>
        <span className="w-[10%] lg:w-[15%]">
          <p className="lg:text-[16px] text-[16px]">{player?.class}</p>
        </span>
        <span className="w-[10%] lg:w-[15%]">
          <p className="lg:text-[16px] text-[16px]">{player?.height}</p>
        </span>
        <span className="w-[10%] lg:w-[10%] flex gap-[20px] items-center">
          <p className="lg:text-[16px] text-[14px]">{player?.position}</p>
        </span>
        <span className="w-[10%] lg:w-[30%] flex gap-[20px] items-center">
          <p className="font-sfPro text-[14px] flex items-center gap-[6px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clip-path="url(#clip0_4139_861)">
                <path
                  d="M17.5 8.33301C17.5 14.1663 10 19.1663 10 19.1663C10 19.1663 2.5 14.1663 2.5 8.33301C2.5 6.34388 3.29018 4.43623 4.6967 3.02971C6.10322 1.62318 8.01088 0.833008 10 0.833008C11.9891 0.833008 13.8968 1.62318 15.3033 3.02971C16.7098 4.43623 17.5 6.34388 17.5 8.33301Z"
                  stroke="#25282B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 10.833C11.3807 10.833 12.5 9.71372 12.5 8.33301C12.5 6.9523 11.3807 5.83301 10 5.83301C8.61929 5.83301 7.5 6.9523 7.5 8.33301C7.5 9.71372 8.61929 10.833 10 10.833Z"
                  stroke="#25282B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_4139_861">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {player?.location}
          </p>
        </span>
        <span className="w-[20%] lg:w-[30%] flex gap-[20px] justify-between">
          <p className="text-black text-[16px] font-[400] flex gap-[10px] items-center">
            <img src="/Ellipse 11939.png" width={20} />

            <span> {player?.institute.universityName}</span>
          </p>
          <button
            onClick={() =>
              (isSubscription === 'Professional' ||
                isSubscription === 'Enterprise') &&
              setCollapsed(!Collapsed)
            }
            className={`cursor-pointer ease-in-out duration-300 w-4 h-4 ${
              !Collapsed ? 'rotate-180' : ''
            } `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              className="w-full h-full"
            >
              <path
                d="M0.979454 0.813439C1.15697 0.635928 1.43474 0.61979 1.63048 0.765027L1.68656 0.813439L5.99967 5.12633L10.3128 0.813439C10.4903 0.635928 10.7681 0.61979 10.9638 0.765027L11.0199 0.813439C11.1974 0.99095 11.2135 1.26873 11.0683 1.46447L11.0199 1.52055L6.35323 6.18721C6.17572 6.36472 5.89794 6.38086 5.7022 6.23562L5.64612 6.18721L0.979454 1.52055C0.784192 1.32528 0.784192 1.0087 0.979454 0.813439Z"
                fill="black"
              />
            </svg>
          </button>
          {/* {JSON.parse(localStorage.getItem('user'))?.role == 'coach' ? (
            <>
              <div onClick={() => addNow(player?._id)}>
                {player?.favouriteBy?.find((u) => u == currentUser?._id) ? (
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
                      {' '}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                        stroke="#ff0000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{' '}
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
                      {' '}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{' '}
                    </g>
                  </svg>
                )}
              </div>
            </>
          ) : (
            ``
          )} */}
        </span>
      </div>
      {!Collapsed ? (
        <div className="lg:flex hidden  items-center gap-[5px] ">
          <span className="flex gap-[18px] items-center w-[40%] lg:w-[35%]">
            <img
              src={player?.picture}
              className="w-[60px]  lg:w-[60px] lg:h-[60px] rounded-full  object-cover"
              alt="avatar"
            />
            <Link
              to={`/player-profile/${player?.auth?._id}`}
              className="text-[18px] font-medium text-[#4C8FE1] w-fit block  hover:underline"
            >
              {player?.auth?.name}
            </Link>
          </span>
          <span className="w-[10%] lg:w-[15%]">
            <p className="lg:text-[16px] text-[16px]">{player?.class}</p>
          </span>
          <span className="w-[10%] lg:w-[15%]">
            <p className="lg:text-[16px] text-[16px]">{player?.height}</p>
          </span>
          <span className="w-[10%] lg:w-[10%] flex gap-[20px] items-center">
            <p className="lg:text-[16px] text-[14px]">{player?.position}</p>
          </span>
          <span className="w-[10%] lg:w-[30%] flex gap-[20px] items-center">
            <p className="font-sfPro text-[14px] flex items-center gap-[6px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clip-path="url(#clip0_4139_861)">
                  <path
                    d="M17.5 8.33301C17.5 14.1663 10 19.1663 10 19.1663C10 19.1663 2.5 14.1663 2.5 8.33301C2.5 6.34388 3.29018 4.43623 4.6967 3.02971C6.10322 1.62318 8.01088 0.833008 10 0.833008C11.9891 0.833008 13.8968 1.62318 15.3033 3.02971C16.7098 4.43623 17.5 6.34388 17.5 8.33301Z"
                    stroke="#25282B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 10.833C11.3807 10.833 12.5 9.71372 12.5 8.33301C12.5 6.9523 11.3807 5.83301 10 5.83301C8.61929 5.83301 7.5 6.9523 7.5 8.33301C7.5 9.71372 8.61929 10.833 10 10.833Z"
                    stroke="#25282B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4139_861">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              {player?.location}
            </p>
          </span>
          <span className="w-[20%] lg:w-[30%] flex gap-[20px] justify-between">
            <p className="text-black text-[16px] font-[400] flex gap-[10px] items-center">
              <img src="/Ellipse 11939.png" width={20} />

              <span> {player?.institute.universityName}</span>
            </p>
          </span>
        </div>
      ) : null}
      {player?.article && (
        <div
          className={`px-[20px] ${
            Collapsed ? 'opacity-0 h-0 hidden' : 'opacity-100 h-auto grid'
          }   grid-cols-1 lg:grid-cols-2 gap-[20px] transition-all duration-500 ease-out`}
        >
          <p className="lg:text-[16px] text-[14px] font-sfPro">
            {player?.article}
          </p>
          <div className="flex gap-[10px] flex-col ">
            <div className=" video-container mb-8 relative w-[full] rounded-[10px] bg-[rgba(255,255,255,0.40)] overflow-hidden">
              <ReactPlayer
                url={player?.video1}
                width="100%"
                height={'200px'}
                style={{
                  borderRadius: 8,
                }}
              />
              <div
                className="video-overlay absolute inset-0 flex items-center justify-center"
                onClick={togglePlayPausePlayer}
              >
                {isPlaying2 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="18"
                    viewBox="0 0 15 18"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 2H1C0.447715 2 0 2.44772 0 3V15C0 15.5523 0.447715 16 1 16H4C4.55228 16 5 15.5523 5 15V3C5 2.44772 4.55228 2 4 2ZM14 2H11C10.4477 2 10 2.44772 10 3V15C10 15.5523 10.4477 16 11 16H14C14.5523 16 15 15.5523 15 15V3C15 2.44772 14.5523 2 14 2Z"
                      stroke="white"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="18"
                    viewBox="0 0 15 18"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14 8.78738C14 6.67844 3.19057 -0.0682953 1.96437 1.14481C0.73817 2.35792 0.620266 15.1025 1.96437 16.4299C3.30848 17.762 14 10.8963 14 8.78738Z"
                      stroke="white"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div className=" video-container mb-8 relative w-[full] rounded-[10px] bg-[rgba(255,255,255,0.40)] overflow-hidden">
              <ReactPlayer
                url={player?.video1}
                width="100%"
                height={'200px'}
                style={{
                  borderRadius: 8,
                }}
              />
              <div
                className="video-overlay absolute inset-0 flex items-center justify-center"
                onClick={togglePlayPausePlayer}
              >
                {isPlaying2 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="18"
                    viewBox="0 0 15 18"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 2H1C0.447715 2 0 2.44772 0 3V15C0 15.5523 0.447715 16 1 16H4C4.55228 16 5 15.5523 5 15V3C5 2.44772 4.55228 2 4 2ZM14 2H11C10.4477 2 10 2.44772 10 3V15C10 15.5523 10.4477 16 11 16H14C14.5523 16 15 15.5523 15 15V3C15 2.44772 14.5523 2 14 2Z"
                      stroke="white"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="18"
                    viewBox="0 0 15 18"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14 8.78738C14 6.67844 3.19057 -0.0682953 1.96437 1.14481C0.73817 2.35792 0.620266 15.1025 1.96437 16.4299C3.30848 17.762 14 10.8963 14 8.78738Z"
                      stroke="white"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
