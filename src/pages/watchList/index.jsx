import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../baseurl/baseurl';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import player from '../../assets/images/avatar.png';
import player2 from '../../assets/images/avatar2.png';
import player3 from '../../assets/images/avatar3.png';
import { useNavigate } from 'react-router-dom';

export default function WatchList() {
  const navigate = useNavigate();
  const user = localStorage?.getItem('user');
  const [loading, setLoading] = useState(true);
  const [players, setPlayer] = useState();

  const getAvailabilityPlayer = async () => {
    try {
      let response = await axios.get(
        `${BASE_URL}/favourites-group/${JSON.parse(user)._id}`
      );
      console.log(response.data);
      setLoading(false);
      setPlayer(response.data?.data);
    } catch (error) {
      if (error?.response && error?.response?.data) {
        toastr.error(error?.response?.data?.error);
      } else {
        toastr.error('Server error please try again');
      }
    }
  };
  console.log(players, 'coach watch');

  useEffect(() => {
    setLoading(true);
    getAvailabilityPlayer();
  }, []);
  return (
    <div>
      {/* top section */}
      <div className="top-section flex items-center justify-between gap-2 mb-4">
        <button
          onClick={() => navigate(-1)}
          type="button"
          class=" hover:bg-gray-100 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.25 12.2734L19.25 12.2734"
              stroke="#130F26"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.2998 18.299L4.2498 12.275L10.2998 6.25"
              stroke="#130F26"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <h5 className="text-[18px]">Watch List</h5>
        <div className="flex items-center gap-1">
          <button
            type="button"
            class=" hover:bg-gray-100   font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#25282B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 8V16"
                stroke="#25282B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 12H16"
                stroke="#25282B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* main section */}
      <div className="flex flex-col gap-4  w-full my-8">
        <h5>Pinned</h5>
        {/* card */}
        {loading ? (
          <div className="flex items-center justify-center min-h-80">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-20 h-20 text-gray-200 animate-spin  fill-[#FF3333]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          players?.map((items, index) => (
            <div
              key={Math.random()}
              className="p-4 rounded-md bg-[#F8FAFC] w-full"
            >
              {/* content */}
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex items-center gap-2">
                  {/* avatar */}
                  <div class="relative">
                    <div class="relative w-[63px] h-[63px] overflow-hidden flex items-center justify-center bg-white rounded-full">
                      <svg
                        class="w-10 h-10 text-[#292D32] "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-[16px] font-bold flex items-center gap-2">
                      {items?.class}
                    </p>
                    <p className="text-[12px]">
                      {items?.players[0]?.length} athletes
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div class="flex -space-x-4 rtl:space-x-reverse">
                    {items?.players[0]?.map((item) => (
                      <img
                        key={item._id}
                        src={item?.picture}
                        class="w-10 h-10  rounded-full"
                        alt={item?.picture}
                      />
                    ))}

                    <a
                      class="ps-6 flex items-center justify-center w-10 h-10 text-sm font-medium text-black  rounded-full"
                      href="#"
                    >
                      +20
                    </a>
                  </div>
                  <button
                    type="button"
                    class=" hover:bg-gray-100   font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.08301 4.16927L12.9163 10.0026L7.08301 15.8359"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        {/* card 2 */}
        <h5 className="mt-4">WatchList</h5>
        {loading ? (
          <div className="flex items-center justify-center min-h-80">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-20 h-20 text-gray-200 animate-spin  fill-[#FF3333]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          players?.map((items, index) => (
            <div
              key={Math.random()}
              className="p-4 rounded-md bg-[#F8FAFC] w-full"
            >
              {/* content */}
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex items-center gap-2">
                  {/* avatar */}
                  <div class="relative">
                    <div class="relative w-[63px] h-[63px] overflow-hidden flex items-center justify-center bg-white rounded-full">
                      <svg
                        class="w-10 h-10 text-[#292D32] "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-[16px] font-bold flex items-center gap-2">
                      {items?.class}
                    </p>
                    <p className="text-[12px]">
                      {items?.players[0]?.length} athletes
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div class="flex -space-x-4 rtl:space-x-reverse">
                    {items?.players[0]?.map((item) => (
                      <img
                        key={item._id}
                        src={item?.picture}
                        class="w-10 h-10  rounded-full"
                        alt={item?.picture}
                        style={{ objectFit: 'cover' }}
                      />
                    ))}

                    <a
                      class="ps-6 flex items-center justify-center w-10 h-10 text-sm font-medium text-black  rounded-full"
                      href="#"
                    >
                      {items?.players[0]?.length > 3
                        ? items?.players[0]?.length - 3
                        : ''}
                    </a>
                  </div>
                  <button
                    type="button"
                    class=" hover:bg-gray-100   font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.08301 4.16927L12.9163 10.0026L7.08301 15.8359"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
