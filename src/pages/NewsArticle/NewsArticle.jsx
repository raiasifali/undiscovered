import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../baseurl/baseurl';
import './NewsArticle.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const NewsArticle = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(null);
  const [hoveredPlayer, setHoveredPlayer] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    fetchNewsFeed();
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll('.profile--link');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [state]);

  const fetchNewsFeed = async () => {
    try {
      let response = await axios.get(`${BASE_URL}/getSingleNewsFeed/${id}`);
      setState(response?.data?.newsFeed);
    } catch (error) {
      if (error?.response && error?.response?.data) {
        toastr.error(error?.response?.data?.error);
      } else {
        toastr.error('Server error please try again');
      }
    }
  };

  const createLinkedDescription = (description, players) => {
    let linkedDescription = description;
    players.forEach((player) => {
      const playerName = player.name;
      const playerId = player._id;
      const playerLink = `<a class="profile--link" href="#" data-player-id="${playerId}">${playerName}</a>`;
      const playerNameRegex = new RegExp(playerName, 'g');
      linkedDescription = linkedDescription.replace(
        playerNameRegex,
        playerLink
      );
    });
    return linkedDescription;
  };

  const handleMouseEnter = (event) => {
    const playerId = event.target.getAttribute('data-player-id');
    const player = state?.players.find((p) => p.auth === playerId);
    console.log('HOVERED');
    console.log(player);
    let hoveredname = state?.featuredPlayers?.find(
      (u) => u?._id === player?.auth
    )?.name;
    setHoveredPlayer({
      ...player,
      name: hoveredname,
    });
  };

  const handleMouseLeave = () => {
    setHoveredPlayer(null);
  };

  useEffect(() => {
    const links = document.querySelectorAll('.profile--link');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [state]);

  const linkedDescription = state?.description
    ? createLinkedDescription(state.description, state.featuredPlayers)
    : '';

  return (
    <div>
      {/* Top part */}
      <div className="space-y-4">
        <h3 className="text-2xl text-[#000] font-semibold">{state?.title}</h3>
        <p className="text-base text-[#000] leading-6">12 MAR, 2024</p>

        <p className="text-base text-[#000] leading-6">
          Players Featured in this article:
        </p>

        {/* Hovered Player Details */}
        <div className="flex items-center gap-5 overflow-x-auto lg:overflow-x-hidden pb-3 lg:pb-0">
          {state &&
            state?.featuredPlayers?.map((player, index) => (
              <div
                key={index}
                className="flex items-center gap-1 rounded-[50px] py-3 px-6 bg-[#F3F3F3]"
              >
                {/* Profile */}
                <div className="min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      state?.players?.find((u) => u?.auth === player?._id)
                        ?.picture
                    }
                    alt=""
                  />
                </div>

                {/* Details */}
                <div>
                  <p
                    onClick={() => navigate('/player-profile/' + player?._id)}
                    className="text-[#4C8FE1] cursor-pointer text-base font-medium leading-normal"
                  >
                    {
                      state?.featuredPlayers?.find(
                        (u) => u?._id === player?._id
                      )?.name
                    }
                  </p>

                  <div className="flex items-center gap-1 text-sm text-[#171717] font-medium leading-normal">
                    <span>
                      {state?.players
                        ?.find((u) => u?.auth === player?._id)
                        ?.position?.toUpperCase()}
                    </span>
                    <span>
                      {
                        state?.players?.find((u) => u?.auth === player?._id)
                          ?.height
                      }
                    </span>
                    <span>
                      {
                        state?.players?.find((u) => u?.auth === player?._id)
                          ?.class
                      }
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* News banner */}
      <div className="mt-6 mb-6 lg:mb-12 w-full h-[300px] lg:h-[565px] rounded-xl overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={state?.banner}
          alt=""
        />
      </div>

      {/* News description */}
      <div className="news-article-description mb-[80px]">
        <div>
          <div className="absolute -my-20">
            {hoveredPlayer && (
              <div className="flex items-center gap-1 rounded-[50px] py-3 px-6 bg-[#F3F3F3]">
                {/* Profile */}
                <div className="min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={hoveredPlayer?.picture}
                    alt=""
                  />
                </div>

                {/* Details */}
                <div>
                  <p className="text-[#000] text-base font-medium leading-normal">
                    {hoveredPlayer?.name}
                  </p>

                  <div className="flex items-center gap-1 text-sm text-[#171717] font-medium leading-normal">
                    <span>{hoveredPlayer?.position?.toUpperCase()}</span>
                    <span>{hoveredPlayer?.height}</span>
                    <span>{hoveredPlayer?.class}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <p dangerouslySetInnerHTML={{ __html: linkedDescription }}></p>
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;
