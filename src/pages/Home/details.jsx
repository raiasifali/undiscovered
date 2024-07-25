import React from 'react';
import Slider from 'react-slick';
import { IoChevronBackOutline } from 'react-icons/io5';
import { IoChevronForward } from 'react-icons/io5';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute top-[-10%] right-[1%]  bg-[#F8FAFC] text-black hover:text-black rounded-full h-[30px] w-[30px] flex items-center justify-center`}
      onClick={onClick}
    >
      <IoChevronForward size={20} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute top-[-10%] right-[5%] left-auto bg-[#F8FAFC] text-black hover:text-black rounded-full h-[30px] w-[30px] flex items-center justify-center`}
      onClick={onClick}
    >
      <IoChevronBackOutline size={20} />
    </div>
  );
}
export default function details() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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
    <div className="max-w-[1440px] mx-auto">
      <div className="flex flex-col-reverse text-center md:text-start	md:flex-row	 gap-[12px]">
        <div className="w-[100%] md:w-[50%] flex justify-center items-center">
          <img
            src="/Frame 1686556513.png"
            width="80%"
            height="80%"
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
        <div className="w-[100%] md:w-[50%]">
          <h1 className="text-[24px] md:text-[36px] mt-0 md:mt-10 font-[700] mr-0 md:mr-10">
            World of basketball recruitment Undiscovered Recruit help you!
          </h1>
          <p
            className="py-5 text-[28] text-[rgba(14, 14, 14, 1)] mr-0 md:mr-10 font-[300]"
            style={{ lineHeight: 2, letterSpacing: 2 }}
          >
            In the competitive world of basketball recruitment, Undiscovered
            Recruits simplifies the process. Coaches can discover new talent,
            while players connect with coaches, showcase their skills, and
            discover their future with our innovative video upload and direct
            messaging features.
          </p>
        </div>
      </div>
      <h1 className="text-[24px] md:text-[36px]  font-[700] text-center my-[30px] md:my-[80px]">
        CONNECT WITH COLLEGE COACHES ANYTIME, ANYWHERE
      </h1>

      <div
        className="flex flex-col	md:flex-row	 gap-[12px]"
        style={{ alignItems: 'center' }}
      >
        <div className="w-[100%] md:w-[50%] flex justify-center items-center">
          <img
            src="/Frame 1686556514.png"
            width="100%"
            height="100%"
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
        <div className="w-[100%] md:w-[50%] slider-phone">
          <Slider {...settings}>
            <div>
              <h1 className="text-[24px] md:text-[32px] font-[500] md:font-[700] mt-5 md:mt-0 mr-0 md:mr-10">
                Get Notified with Your Athlete Profile
              </h1>
              <p
                className="pt-5 text-[28] text-[rgba(14, 14, 14, 1)] mr-0 md:mr-10 font-[300]"
                style={{ lineHeight: 2, letterSpacing: 2 }}
              >
                Stay in the loop with real-time notifications about your athlete
                profile. Receive updates on views, likes, and messages from
                interested coaches. Ensure you never miss an opportunity to
                connect with top recruiters and showcase your talent to the
                right audience. Keep your profile active and stand out in the
                competitive world of basketball recruitment!
              </p>
            </div>
            <div>
              <h1 className="text-[24px] md:text-[32px] font-[500] md:font-[700] mt-5 md:mt-0 mr-0 md:mr-10">
                Get Notified with Your Athlete Profile
              </h1>
              <p
                className="pt-5 text-[28] text-[rgba(14, 14, 14, 1)] mr-0 md:mr-10 font-[300]"
                style={{ lineHeight: 2, letterSpacing: 2 }}
              >
                Stay in the loop with real-time notifications about your athlete
                profile. Receive updates on views, likes, and messages from
                interested coaches. Ensure you never miss an opportunity to
                connect with top recruiters and showcase your talent to the
                right audience. Keep your profile active and stand out in the
                competitive world of basketball recruitment!
              </p>
            </div>
            <div>
              <h1 className="text-[24px] md:text-[32px] font-[500] md:font-[700] mt-5 md:mt-0 mr-0 md:mr-10">
                Get Notified with Your Athlete Profile
              </h1>
              <p
                className="pt-5 text-[28] text-[rgba(14, 14, 14, 1)] mr-0 md:mr-10 font-[300]"
                style={{ lineHeight: 2, letterSpacing: 2 }}
              >
                Stay in the loop with real-time notifications about your athlete
                profile. Receive updates on views, likes, and messages from
                interested coaches. Ensure you never miss an opportunity to
                connect with top recruiters and showcase your talent to the
                right audience. Keep your profile active and stand out in the
                competitive world of basketball recruitment!
              </p>
            </div>
          </Slider>
        </div>
      </div>
      <h1 className="text-[24px] md:text-[36px]  font-[700] text-center pt-[80px] md:pt-[80px]">
        Discover the future of basketball recruitment with Undiscovered
        Recruits!
      </h1>
      <p
        className=" text-[28] max-w-[1000px] pt-4 pb-[60px] mx-auto text-[rgba(14, 14, 14, 1)] text-center font-[300]"
        style={{ lineHeight: 2, letterSpacing: 2 }}
      >
        Our cutting-edge app connects coaches and aspiring players nationwide,
        making the recruitment process seamless and exciting. Our advanced
        search filters for players and coaches streamline the recruitment
        process, helping athletes play at the next level and coaches find the
        perfect match for their teams.
      </p>

      <div
        className="flex flex-col	md:flex-row	 gap-[32px]"
        style={{ alignItems: 'center' }}
      >
        <div className="w-[100%] md:w-[50%] text-center p-10 shadow-xl">
          <img
            src="/avatar 1.png"
            width="80px"
            height="80px"
            style={{
              objectFit: 'contain',
              margin: 'auto',
            }}
          />
          <h2 className="pt-4 mb-4">For Coaches</h2>
          <p
            className=" text-[28] text-[rgba(14, 14, 14, 1)]  font-[300]"
            style={{ lineHeight: 2, letterSpacing: 2 }}
          >
            Discover the future of basketball recruitment with Undiscovered
            Recruits! Our cutting-edge app connects coaches and aspiring players
            nationwide, making the recruitment process seamless and exciting.
            Our advanced search filters for players and coaches streamline the
            recruitment process, helping athletes play at the next level and
            coaches find the perfect match for their teams.
          </p>
          <button className="flex mx-auto mt-5 items-center gap-2 text-sm leading-6 bg-primaryColor py-2 px-6 text-[#fff] border border-primaryColor rounded-[30px] w-fit">
            Learn more
          </button>
        </div>
        <div className="w-[100%] md:w-[50%] text-center px-10 py-[55px] shadow-xl h-[100%]">
          <img
            src="/team 1.png"
            width="80px"
            height="80px"
            style={{
              objectFit: 'contain',
              margin: 'auto',
            }}
          />
          <h2 className="pt-4 mb-4">For Players</h2>
          <p
            className=" text-[28] text-[rgba(14, 14, 14, 1)]  font-[300]"
            style={{ lineHeight: 2, letterSpacing: 2 }}
          >
            Our cutting-edge app connects coaches and aspiring players
            nationwide, making the recruitment process seamless and exciting.
            Our advanced search filters, evaluation tools, and video
            capabilities empower athletes to showcase their skills, gaining
            maximum exposure and connecting directly with thousands of coaches.
          </p>
          <button className="flex mx-auto mt-5 items-center gap-2 text-sm leading-6 bg-primaryColor py-2 px-6 text-[#fff] border border-primaryColor rounded-[30px] w-fit">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
}
