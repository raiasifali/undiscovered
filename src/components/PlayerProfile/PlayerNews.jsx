import { useNavigate } from "react-router-dom";

const PlayerNews = ({ newsFeedData }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col gap-4">
        {newsFeedData && newsFeedData.length > 0 ? (
          newsFeedData.map((item, index) => {
            const newsDate = new Date(item.createdAt);
            
            const formattedDate = `${newsDate.getMonth() + 1}/${newsDate.getDate()}/${newsDate.getFullYear()}`;

            return (
              <div
              onClick={() => navigate(`/news-article/${item?._id}`)}
              className=" cursor-pointer p-3 bg-[#fff] flex items-center flex-col lg:flex-row gap-2.5 rounded-xl shadow-[0px_0px_13px_0px_rgba(0,0,0,0.05)] space-y-2.5"
              key={index}
            >
              <div className=" lg:min-w-[260px]  lg:max-w-[260px] w-full lg:w-auto h-[170px] rounded-xl overflow-hidden ">
                <img
                  className="w-full h-full object-cover"
                  src={item?.banner}
                  alt=""
                />
              </div>

              <div className="space-y-2.5">
                <p className="text-sm text-[#000] leading-6">
                  {" "}
                  {formattedDate}{" "}
                </p>
                <p className="text-[18px] font-medium leading-normal text-[#000] ">
                  {" "}
                  {item?.title}{" "}
                </p>

                <p className="text-base leading-6  font-normal text-[#000] ">
                  {item?.description}
                </p>
              </div>
            </div>
            );
          })
        ) : (
          <p className="text-center text-[#000] text-base leading-6 font-normal">
            No news feed
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayerNews;
