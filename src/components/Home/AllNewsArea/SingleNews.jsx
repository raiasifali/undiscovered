import PropTypes from "prop-types";
import { useEffect } from "react";

const SingleNews = ({ news }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };
  return (
    <div >
      {/* img wrapper */}
      <div className=" w-full h-[220px] rounded-xl overflow-hidden mb-1.5">
        <img
          className="w-full h-full object-cover"
          src={news?.banner}
          alt=""
        />
      </div>

      <p className="text-[#000] text-base leading-6 mt-[15px] mb-[10px]"> {formatDate(news.createdAt)} </p>

      <h3 className="text-[#000] text-[18px] font-medium leading-normal mb-[10px]" > {news?.title} </h3>

      <p className="text-base text-[#818181] font-medium">{news?.description}</p>
    </div>
  );
};

SingleNews.propTypes = {
  news: PropTypes.object,
};

export default SingleNews;
