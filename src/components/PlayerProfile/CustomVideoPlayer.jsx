import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../baseurl/baseurl";
import React from "react";
const CustomVideoPlayer = ({ src, alt }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);


  useEffect(() => {
    const handleVideoEnded = () => {
      setIsPlaying(false);
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnded);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnded);
      }
    };
  }, []);

  const handlePlayPause = async () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      
    // const prevState = state; // Capture previous state
    
    //     const indexfound = prevState.findIndex((u) => u._id === videoid);
    //     const videofound = prevState.find((u) => u._id === videoid);
    
    //     if (videofound) {
    //         const viewedFound = videofound.viewedBy?.find((u) => u === userid);
    //         if (!viewedFound) {
    //         const viewedarray = [...(videofound.viewedBy || []), userid];
    //         const newitem = { ...videofound, viewedBy: viewedarray };
    //         console.log(newitem);
    
    //         // Create a promise for the API call
    //         const updateViewsPromise = new Promise((resolve, reject) => {
    //             axios.get(`${BASE_URL}/updateViews/${videoid}/${userid}`)
    //             .then(response => {
    //                 resolve(response.data); // Resolve with API response
    //             })
    //             .catch(error => {
    //                 reject(error); // Reject with error if API call fails
    //             });
    //         });
    
    //         try {
    //             // Await the promise for the API call
    //             await updateViewsPromise;
    
    //             // Update state after successful API call
    //             const newState = prevState.map((item) =>
    //             item._id === newitem._id ? newitem : item
    //             );
    
    //             setState(newState);
    
    //             // Start playing the video
    //             videoRef.current.play();
    //         } catch (error) {
    //             console.error("Error updating views:", error);
    //             // Handle error if needed
    //         }
    //         }
    //     }
      videoRef.current.play();
    }
  
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-[250px] lg:h-[220px] rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={src}
        alt={alt}
        onClick={handlePlayPause}
      />
      <div
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
        onClick={handlePlayPause}
      >
        <button className="text-white text-4xl">
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 4.5A1.5 1.5 0 016.5 3h1A1.5 1.5 0 019 4.5v11A1.5 1.5 0 017.5 17h-1A1.5 1.5 0 015 15.5v-11zM12 4.5A1.5 1.5 0 0113.5 3h1A1.5 1.5 0 0116 4.5v11A1.5 1.5 0 0114.5 17h-1A1.5 1.5 0 0112 15.5v-11z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M4.318 2.318a1 1 0 011.364-.364l10 6a1 1 0 010 1.692l-10 6A1 1 0 014 14V4a1 1 0 01.318-.682z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default React.memo(CustomVideoPlayer);
