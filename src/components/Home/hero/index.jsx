import React from 'react';
import footerBg from '../../../assets/images/hero.png';
import text from '../../../assets/images/text.png';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen "
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-3 lg:px-[20px] min-h-screen flex items-center z-[100]">
        <div className="flex flex-col gap-2 max-w-[700px]">
          <h1 className="text-[50px] text-white mb-0">GET RECRUITED</h1>
          <h1 className="text-[50px] text-primaryColor mb-0">BE DISCOVERED</h1>
          <h1
            className="text-[50px] text-green mb-0"
            style={{
              textShadow:
                '-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff ',
            }}
          >
            PLAY COLLEGE BASKETBALL
          </h1>

          <p className="text-white font-normal">
            Our advanced app, Undiscovered Recruits, bridges the gap between
            basketball players and coaches, enhancing the recruitment process.
            Key features include seamless video uploads, direct messaging, and
            customized filters, ensuring efficient and effective talent
            discovery and connection. Players can connect with coaches and
            discover their future, while coaches can discover top talent and
            streamline their recruitment efforts.
          </p>
          <div className="flex items-center gap-2 flex-row mt-4">
            <button
              className="flex items-center gap-2 text-sm leading-6 bg-primaryColor py-2 px-6 text-[#fff] border border-primaryColor rounded-[30px] w-fit"
              onClick={() => navigate('/pricing')}
            >
              Get Started
              <svg
                width="14"
                height="12"
                viewBox="0 0 14 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8125 5.79297L1.5625 5.79297"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.27539 1.27575L12.8129 5.79375L8.27539 10.3125"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button
              className="text-sm leading-6 bg-transparent py-2 px-6 text-[#fff] border border-white rounded-[30px] w-fit"
              onClick={() => navigate('/available-players')}
            >
              Coaches
            </button>
            <button
              className="text-sm leading-6 bg-transparent py-2 px-6 text-[#fff] border border-white rounded-[30px] w-fit"
              onClick={() => navigate('/available-players')}
            >
              Players
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}