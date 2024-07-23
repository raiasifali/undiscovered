import React from 'react';
import player from '../../assets/images/avatar.png';
import player2 from '../../assets/images/avatar2.png';
import player3 from '../../assets/images/avatar3.png';
import { useNavigate } from 'react-router-dom';

export default function WatchList() {
  const navigate = useNavigate();
  return (
    <div>
      {/* top section */}
      <div className='top-section flex items-center justify-between gap-2 mb-4'>
        <button
          onClick={() => navigate(-1)}
          type='button'
          class=' hover:bg-gray-100 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M4.25 12.2734L19.25 12.2734'
              stroke='#130F26'
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M10.2998 18.299L4.2498 12.275L10.2998 6.25'
              stroke='#130F26'
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </button>
        <h5 className='text-[18px]'>Watch List</h5>
        <div className='flex items-center gap-1'>
          <button
            type='button'
            class=' hover:bg-gray-100   font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                stroke='#25282B'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M12 8V16'
                stroke='#25282B'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M8 12H16'
                stroke='#25282B'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          </button>
        </div>
      </div>

      {/* main section */}
      <div className='flex flex-col gap-4 items-center w-full my-8'>
        {/* card */}
        {Array.from(new Array(5)).map((items, index) => (
          <div
            key={Math.random()}
            className='p-4 rounded-md bg-[#F8FAFC] w-full'>
            {/* content */}
            <div className='flex items-center justify-between gap-4'>
              <div className='relative flex items-center gap-2'>
                {/* avatar */}
                <div class='relative'>
                  <div class='relative w-[63px] h-[63px] overflow-hidden flex items-center justify-center bg-white rounded-full'>
                    <svg
                      class='w-10 h-10 text-[#292D32] '
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fill-rule='evenodd'
                        d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                        clip-rule='evenodd'></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <p className='text-[16px] font-bold flex items-center gap-2'>
                    2024 Recruit
                  </p>
                  <p className='text-[12px]'>12 athletes</p>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <div class='flex -space-x-4 rtl:space-x-reverse'>
                  <img
                    class='w-10 h-10  rounded-full'
                    src={player}
                    alt=''
                  />
                  <img
                    class='w-10 h-10  rounded-full'
                    src={player2}
                    alt=''
                  />
                  <img
                    class='w-10 h-10  rounded-full'
                    src={player3}
                    alt=''
                  />
                  <a
                    class='ps-6 flex items-center justify-center w-10 h-10 text-sm font-medium text-black  rounded-full'
                    href='#'>
                    +20
                  </a>
                </div>
                <button
                  type='button'
                  class=' hover:bg-gray-100   font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center'>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M7.08301 4.16927L12.9163 10.0026L7.08301 15.8359'
                      stroke='black'
                      stroke-width='1.5'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
