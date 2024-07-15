import CustomVideoPlayer from "./CustomVideoPlayer";
import { useRef, useState } from "react";
import React from "react";
const PlayerReels = ({ videos,userid}) => {
  
  let viewedData=useRef(videos);
  const [state,setState]=useState((prev)=>{
    let old;
    if(prev?.length>0){
      old=[...old,viewedData?.current]
    }else{
      old=viewedData?.current;
    }
    console.log(prev)
   return old
  })



  return (
    <div style={videos.length==0 && !videos ? { textAlign:'center',display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' } : {}}>
      {/* wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-7">
        {videos && videos?.length > 0 ? (
          videos?.map((item, index) => {
            const newsDate = new Date(item.createdAt);
            const formattedDate = `${newsDate.getMonth() + 1}/${newsDate.getDate()}/${newsDate.getFullYear()}`;

            return (
              <div key={index}>
                {/* top part */}
                <CustomVideoPlayer  src={item?.video} alt={item?.description} />

                {/* bottom part */}
                <div className="flex items-center justify-between">
                  {/* date */}
                  <div className="flex items-center gap-2 pt-2.5">
                    {/* icon */}
                    <div className="w-4 h-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="w-full h-full"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.9375 8C14.9375 11.8318 11.8318 14.9375 8 14.9375C4.16825 14.9375 1.0625 11.8318 1.0625 8C1.0625 4.16825 4.16825 1.0625 8 1.0625C11.8318 1.0625 14.9375 4.16825 14.9375 8Z"
                          stroke="#130F26"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.5736 10.2068L7.74609 8.52002V4.88477"
                          stroke="#130F26"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <p className="text-[#000] text-sm leading-6">
                      {formattedDate}
                    </p>
                  </div>

                  {/* views */}
                  <div className="flex items-center gap-2 pt-2.5">
                    {/* icon */}
                    <div className="w-4 h-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="14"
                        viewBox="0 0 16 14"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.3712 7.04045C10.3712 8.34995 9.30916 9.4112 7.99966 9.4112C6.69016 9.4112 5.62891 8.34995 5.62891 7.04045C5.62891 5.7302 6.69016 4.66895 7.99966 4.66895C9.30916 4.66895 10.3712 5.7302 10.3712 7.04045Z"
                          stroke="#130F26"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.9985 12.5165C10.8545 12.5165 13.4668 10.463 14.9375 7.03998C13.4668 3.61698 10.8545 1.56348 7.9985 1.56348H8.0015C5.1455 1.56348 2.53325 3.61698 1.0625 7.03998C2.53325 10.463 5.1455 12.5165 8.0015 12.5165H7.9985Z"
                          stroke="#130F26"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

  <p className="text-[#000] text-sm leading-6">
    {/* {item?.views} */}
  {state && state[index]?.viewedBy?.length !== undefined && (
    `${state[index]?.viewedBy?.length} views`
  )}
</p>
                  </div>
                </div>

                {/* desc */}
                <p className="pt-1.5 text-base text-[#000] leading-6 font-normal">
                  {item.description}
                </p>
              </div>
            );
          })
        ) : (
<p className="text-center text-[#000] text-base leading-6 font-normal
           md:w-50rem w-5rem">
  No videos
</p>
        )}
      </div>
    </div>
  );
};

export default PlayerReels
