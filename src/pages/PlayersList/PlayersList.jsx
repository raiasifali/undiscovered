import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlayerList.css';
import Select from 'react-select';
import PlayerRow from './PlayerRow';
import axios from 'axios';
import { BASE_URL } from '../../baseurl/baseurl';
const PlayersList = () => {
  const navigate = useNavigate();
  const [playerClass, setClass] = useState('');
  const [playerState, setPlayerState] = useState('');
  const [search, setSearch] = useState('');
  const [position, setPosition] = useState('');
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // fetch("/players.json")
    //   .then((res) => res.json())
    //   .then((data) => setPlayers(data));
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    let response = await axios.get(`${BASE_URL}/getPlayer`);
    console.log('FETCH');
    console.log(response);
    setPlayers(response?.data?.players);
  };

  const classOptions = [
    { label: 'All', value: '' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
  ];
  const stateOptions = [
    { label: 'All', value: '' },
    { value: 'North Carolina', label: 'North Carolina' },
    { value: 'new Jersy', label: 'New Jersy' },
    { value: 'Los Angeles', label: 'Los Angeles' },
  ];
  const positionOptions = [
    { label: 'All', value: '' },
    { value: 'PG', label: 'PG' },
    { value: 'SG', label: 'SG' },
    { value: 'SF', label: 'SF' },
    { value: 'PF', label: 'PF' },
    { value: 'C', label: 'C' },
  ];

  const customSelectStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: '#DBDBDB', // Change border color
      borderRadius: '70px', // Make it rounded
      boxShadow: state.isFocused ? '0 0 0 1px #DBDBDB' : 'none',
      '&:focus': {
        borderColor: '#DBDBDB', // Change border color on focus
      }, // Optional: shadow on focus
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      zIndex: 9999,
      color: '#000',
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isSelected ? '#f33' : 'white',
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: 'grey',
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: '#000',
    }),
  };
  const filteredPlayers = () => {
    return players?.filter((player) => {
      const playerClassLower = playerClass?.toLowerCase();
      const positionLower = position?.toLowerCase();
      const playerStateLower = playerState?.toLowerCase();
      const searchLower = search?.toLowerCase();

      const classMatches = playerClass
        ? player?.class?.toLowerCase()?.startsWith(playerClassLower)
        : true;
      const positionMatches = position
        ? player?.position?.toLowerCase()?.startsWith(positionLower)
        : true;
      const stateMatches = playerState
        ? player?.location?.toLowerCase()?.startsWith(playerStateLower)
        : true;
      const searchMatches = search
        ? player?.auth?.name?.toLowerCase()?.includes(searchLower)
        : true;

      return classMatches && positionMatches && stateMatches && searchMatches;
    });
  };

  return (
    <div>
      {/* top part */}
      <div className='relative lg:w-[90%] lg:mx-auto'>
        {/* search bar */}
        <div className='w-full relative '>
          {/* icon */}
          <div className='absolute top-1/2 -translate-y-1/2 left-6 '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='21'
              height='21'
              viewBox='0 0 21 21'
              fill='none'>
              <circle
                cx='9.76688'
                cy='9.76688'
                r='8.98856'
                stroke='#818181'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M16.0186 16.4854L19.5426 20.0002'
                stroke='#818181'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <input
            type='text'
            name='search'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            id='search'
            placeholder='Search'
            className='w-full py-2.5 lg:py-3.5 px-6 pl-14  bg-[#F8FAFC] border border-solid border-[#E9E9E9] rounded-[30px] focus:outline-none '
          />
        </div>

        {/* select options */}
        <div className='grid grid-cols-3  items-center justify-between pt-3 lg:flex-col lg:flex-row gap-3 lg:gap-0'>
          <div className=' w-full lg:w-[230px]'>
            <Select
              onChange={(e) => {
                setClass(e.value);
              }}
              styles={customSelectStyles}
              options={classOptions}
              placeholder='Class'
            />
          </div>
          <div className=' w-full lg:w-[230px]'>
            <Select
              onChange={(e) => {
                setPosition(e.value);
              }}
              styles={customSelectStyles}
              options={positionOptions}
              placeholder='Postion'
            />
          </div>
          <div className=' w-full lg:w-[230px]'>
            <Select
              onChange={(e) => {
                setPlayerState(e.value);
              }}
              styles={customSelectStyles}
              options={stateOptions}
              placeholder='State'
            />
          </div>
        </div>

        {/* go back */}
        <div
          onClick={() => navigate(-1)}
          className='w-6 h-6 cursor-pointer absolute top-1/2 -translate-y-1/2 -left-9 hidden lg:block '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='17'
            height='15'
            viewBox='0 0 17 15'
            fill='none'
            className='w-full h-full'>
            <path
              d='M1.25 7.27441L16.25 7.27441'
              stroke='#130F26'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M7.2998 13.299L1.2498 7.275L7.2998 1.25'
              stroke='#130F26'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </div>

      {/* player table area */}
      <div className=' pt-12 lg:pt-[60px] mb-8 lg:mb-[115px] overflow-x-auto min-w-full '>
        {players && (
          <div>
            {/* player heading */}
            <div className=' bg-[#E9E9E9] py-[10px] lg:flex hidden items-center font-sfPro text-base text-[#0E0E0E] leading-6 font-semibold  '>
              <p className=' min-w-[280px] pl-[10px] lg:w-[30%]'>Player Name</p>
              <p className=' min-w-[120px] lg:w-[15%]'>Class</p>
              <p className=' min-w-[120px] lg:w-[10%]'>Height</p>
              <p className=' min-w-[140px] lg:w-[10%]'>Position</p>
              <p className=' min-w-[200px] lg:flex-grow'>Star Rating</p>
            </div>
            <div className='bg-[#E9E9E9] py-[10px] flex lg:border-r-0  w-full lg:hidden items-center text-base text-[#0E0E0E] font-sfPro leading-6 font-semibold  '>
              <p className='w-[40%] pl-[10px]'>Player Name</p>
              <p className='w-[40%] '>Height/Weight</p>
              <p className='w-[20%]'>Class</p>
            </div>
            <div className='filtered-list-player'>
              {filteredPlayers()?.map((singlePlayer, index) => (
                <PlayerRow
                  player={singlePlayer}
                  key={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersList;
