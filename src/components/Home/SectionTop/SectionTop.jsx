import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SectionTop = ({ title, link = '/', isClass, setClass }) => {
  return (
    <div className="flex items-center justify-between pb-5">
      <p className="text-[20px] font-semibold text-black"> {title} </p>

      {isClass ? (
        <label class="inline-flex items-center cursor-pointer">
          <span class="me-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            All players
          </span>
          <input
            type="checkbox"
            class="sr-only peer"
            onChange={(e) => setClass(e.target.checked)}
            defaultChecked={true}
          />
          <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primaryColor"></div>
          <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Class 24
          </span>
        </label>
      ) : (
        <Link className="text-base text-black leading-5" to={link}>
          View All{' '}
        </Link>
      )}
    </div>
  );
};

SectionTop.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
};

export default SectionTop;
