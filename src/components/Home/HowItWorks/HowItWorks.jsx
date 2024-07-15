import PropTypes from 'prop-types';

const SingleBox = ({ title, children, stepNumber }) => {
  return (
    <div
      className={`bg-[#fff] px-[22px] pb-6 pt-[40px] rounded-xl border border-solid border-[#E9E9E9] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] relative h-fit w-full`}>
      <span className='  text-base text-[#fff] leading-6 font-normal bg-primaryColor rounded-full w-11 h-11  flex items-center justify-center absolute left-1/2 -top-6 -translate-x-1/2 '>
        {' '}
        {stepNumber}{' '}
      </span>
      <h3 className=' text-center text-[18px] text-[#000] font-medium leading-normal pb-3 '>
        {' '}
        {title}{' '}
      </h3>

      <p className='text-base text-[#000] leading-[26px] text-center '>
        {' '}
        {children}{' '}
      </p>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className=' my-12  lg:my-[80px]'>
      <h3 className='text-[26px] font-bold text-[#000] leading-normal text-center '>
        How it works
      </h3>

      {/* steps wrapper */}
      <div className='flex gap-8 mt-12 relative flex-col lg:flex-row '>
        {/* arrow */}
        {/* <div className='w-[60px] h-[30px] absolute z-10 top-[190px] left-[64%] lg:top-12 lg:left-[30%]  transform rotate-45'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='68'
            height='57'
            viewBox='0 0 68 57'
            fill='none'>
            <path
              d='M1.76169 24.1869C20.5174 23.3029 41.2981 27.8945 57.3634 38.1368'
              stroke='#FF3333'
              strokeWidth='2'
              strokeLinecap='round'
            />
            <path
              d='M45.7134 41.4592C51.7152 38.8648 57.7059 38.3557 61.5454 40.8035'
              stroke='#FF3333'
              strokeWidth='2'
              strokeLinecap='round'
            />
            <path
              d='M55.4585 26.1736C55.6393 32.7097 57.7059 38.3557 61.5454 40.8035'
              stroke='#FF3333'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </div> */}

        <div className='relative flex-1'>
          <SingleBox
            title={'Sign Up and Fill in Basic Information'}
            stepNumber={1}>
            Begin by signing up with your name, email, and profile details, such
            as your position and personal stats. This foundational information
            helps coaches get a quick overview of your background and skills.
          </SingleBox>
          <div className='w-[30px] h-[15px] lg:w-[60px] lg:h-[30px] absolute z-10 bottom-0 right-[10%] lg:top-12 lg:right-[-10%] transform rotate-60 lg:rotate-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='68'
              height='57'
              viewBox='0 0 68 57'
              fill='none'>
              <path
                d='M1.76169 24.1869C20.5174 23.3029 41.2981 27.8945 57.3634 38.1368'
                stroke='#FF3333'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <path
                d='M45.7134 41.4592C51.7152 38.8648 57.7059 38.3557 61.5454 40.8035'
                stroke='#FF3333'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <path
                d='M55.4585 26.1736C55.6393 32.7097 57.7059 38.3557 61.5454 40.8035'
                stroke='#FF3333'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </div>
        </div>
        {/* arrow */}
        {/* <div className='w-[60px] h-[30px] absolute z-10 top-[110px] left-[64%]  lg:block '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='68'
            height='57'
            viewBox='0 0 68 57'
            fill='none'>
            <path
              d='M1.76169 24.1869C20.5174 23.3029 41.2981 27.8945 57.3634 38.1368'
              stroke='#FF3333'
              strokeWidth='2'
              strokeLinecap='round'
            />
            <path
              d='M45.7134 41.4592C51.7152 38.8648 57.7059 38.3557 61.5454 40.8035'
              stroke='#FF3333'
              strokeWidth='2'
              strokeLinecap='round'
            />
            <path
              d='M55.4585 26.1736C55.6393 32.7097 57.7059 38.3557 61.5454 40.8035'
              stroke='#FF3333'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </div> */}
        <div className='relative lg:mt-12 flex-1'>
          <SingleBox
            title={'Upload Your Highlights and Achievements'}
            stepNumber={2}>
            Once your basic info is set, it's time to showcase your talents.
            Upload your highlight reels, game footage, and any training videos
            you have. Make sure to also include your achievements and milestones
            to give coaches a comprehensive view of your abilities.
          </SingleBox>
          <div className='w-[30px] h-[15px] lg:w-[60px] lg:h-[30px] absolute z-10 bottom-0 right-[10%] lg:top-[40px] lg:right-[-10%] transform rotate-60 lg:rotate-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='68'
              height='57'
              viewBox='0 0 68 57'
              fill='none'>
              <path
                d='M1.76169 24.1869C20.5174 23.3029 41.2981 27.8945 57.3634 38.1368'
                stroke='#FF3333'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <path
                d='M45.7134 41.4592C51.7152 38.8648 57.7059 38.3557 61.5454 40.8035'
                stroke='#FF3333'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <path
                d='M55.4585 26.1736C55.6393 32.7097 57.7059 38.3557 61.5454 40.8035'
                stroke='#FF3333'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </div>
        </div>
        <div className='flex-1 lg:mt-[80px]'>
          <SingleBox
            title={'Review and Finalize Your Profile'}
            stepNumber={3}>
            Before submitting, review your profile to ensure all information is
            accurate and your videos are properly displayed. Once satisfied,
            finalize your profile to make it publicly viewable. Now, your
            profile is ready to be shared with coaches and included in our
            "Explore" section for maximum visibility seen by COACHES ONLY.
          </SingleBox>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

SingleBox.propTypes = {
  title: PropTypes.string,
  children: PropTypes.string,
  stepNumber: PropTypes.number,
};
