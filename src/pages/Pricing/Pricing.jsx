import { useState } from "react";
import SinglePricing from "./SinglePricing";


const Pricing = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [isMonthlyActive, setIsMonthlyActive] = useState(true);
  const [isYearlyActive, setIsYearlyActive] = useState(false);

  const toggle = () => {
    setIsToggled(!isToggled);
    setIsMonthlyActive(!isMonthlyActive);
    setIsYearlyActive(!isYearlyActive);
  };

  const commonPillStyle = `py-2 px-10 rounded-[30px]  relative z-[15] ease-in-out duration-300 cursor-pointer`;

  const serviceList = [
    "Unlimited Projects",
    "Unlimited Invoices",
    "Unlimited Contracts",
    "Media Sharing",
    "Unlimited invoices",
    "Unlimited CRM",
    "Unlimited Clients Spaces",
  ];

  return (
    <div>
      {/* top part */}
      <div className="flex flex-col items-center text-center">
        <p className="text-base font-normal leading-6 text-[#0E0E0E]">
          Pricing Plan
        </p>
        <h3 className="text-[22px]  font-bold leading-8 text-[#0E0E0E]">
          Choose a plan that works for you
        </h3>

        {/* pricing trigger */}
        <div className="mt-10 flex items-center bg-primaryColor rounded-[30px] relative p-2">
          <p
            onClick={toggle}
            className={`${commonPillStyle} ${
              isMonthlyActive ? `text-primaryColor` : `text-[#fff]`
            }`}
          >
            Monthly
          </p>
          <p
            onClick={toggle}
            className={`${commonPillStyle} ${
              isYearlyActive ? `text-primaryColor` : `text-[#fff]`
            }`}
          >
            Yearly
          </p>

          {/* pill */}
          <span
            className={`w-[128px] h-10 bg-[#fff] rounded-[30px] ease-in-out duration-300 absolute top-1/2 -translate-y-1/2 ${
              isToggled ? `left-[50%]` : "left-2 "
            } z-10 `}
          ></span>
        </div>

        {/* pricing listgt area */}
        <div className="flex items-center flex-col lg:flex-row lg:gap-[30px] mt-5 lg:mt-[50px] mb-12 lg:mb-[100px] ">
          <SinglePricing
            isToggled={isToggled}
            isYearlyActive={isYearlyActive }
            price={30}
            title={"Basic"}
            yearlyPrice={45}
            serviceList={serviceList}
          />
          <SinglePricing
            isToggled={isToggled}
            price={60}
            isYearlyActive={isYearlyActive }
            title={"Professional"}
            yearlyPrice={105}
            serviceList={serviceList}
          />
          <SinglePricing
            isToggled={isToggled}
            price={99}
            isYearlyActive={isYearlyActive }
            title={"Enterprise"}
            yearlyPrice={250}
            serviceList={serviceList}
          />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
