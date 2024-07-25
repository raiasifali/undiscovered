import { useEffect, useState } from 'react';

const PlayerOffers = ({ offers }) => {
  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <div>
      {/* wrapper */}
      <div className='flex flex-col gap-4'>
        {offers && offers.length > 0 ? (
          offers.map((item, index) => (
            <div
              className='flex items-center justify-between p-3 bg-[#fff] rounded-xl shadow-[0px_0px_13px_0px_rgba(0,0,0,0.05)]'
              key={index}>
              {/* details area */}
              <div className='flex items-center gap-2.5'>
                {/* icon */}
                <div className='w-[45px] h-[45px] rounded-full bg-[#F1F1F1] p-2.5'>
                  <img
                    className='w-full h-full object-contain'
                    src={item?.logo}
                    alt=''
                  />
                </div>

                <div>
                  <p className='text-base font-medium text-[#000] leading-normal'>
                    {item?.university}
                  </p>
                  <p className='text-sm text-[#000] leading-normal'>
                    {item?.date ? formatDate(item?.date) : ''}
                  </p>
                </div>
              </div>

              {/* status area */}
              <div
                className={`py-1 px-2.5 rounded-[40px]  flex items-center gap-1 border ${
                  item?.status === 'Committed'
                    ? 'border-green-500 bg-green-100'
                    : item?.status === 'Offered'
                    ? 'border-blue-500 bg-blue-100'
                    : item?.status === 'Visited'
                    ? 'border-yellow-300 bg-yellow-50'
                    : item?.status === 'Visiting'
                    ? 'border-purple-500 bg-purple-100'
                    : item?.status === 'Walk-on'
                    ? 'border-orange-500 bg-orange-100'
                    : item?.status === 'Redshirt'
                    ? 'border-black bg-gray-200'
                    : item?.status === 'Interested'
                    ? 'border-yellow-600 bg-yellow-200'
                    : item?.status === 'Transferred'
                    ? 'border-red-500 bg-red-100'
                    : item?.status === 'Pending'
                    ? 'border-white bg-gray-100'
                    : item?.status === 'Signed'
                    ? 'border-cyan-500 bg-cyan-100'
                    : ''
                }`}>
                {/* <span
                  style={{
                    backgroundColor: `${
                      item?.status?.toLowerCase() === 'offered' ||
                      item?.status?.toLowerCase() === 'committed'
                        ? '#1EF24D'
                        : ''
                    }`,
                  }}
                  className='w-1 h-1 rounded-full bg-[#f33]'></span> */}
                <p className='text-sm text-[#000] leading-normal '>
                  {item?.status}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-[#000] text-base leading-6 font-normal'>
            No offers
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayerOffers;
