import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SectionTop = ({ title, link = '/' }) => {
  return (
    <div className='flex items-center justify-between pb-5'>
      <p className='text-[20px] font-semibold text-black'> {title} </p>
      <Link
        className='text-base text-black leading-5'
        to={link}>
        View All{' '}
      </Link>
    </div>
  );
};

SectionTop.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
};

export default SectionTop;
