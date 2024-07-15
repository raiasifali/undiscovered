import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import appstore from "../../assets/images/app-store.png";
import playstore from "../../assets/images/google-play.png";
import footerBg from "../../assets/images/footer-bg.png";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-full pt-8 lg:pt-[60px] pb-5 bg-cover bg-no-repeat bg-center"
    >
      {/* container */}
      <div className="max-w-[1000px] mx-auto px-3 lg:px-0 ">
        {/* top */}
        <div className="w-full space-y-8 pb-10 lg:pb-[60px]">
          {/* logo */}
          <div className=" w-[125px] h-[80px]  lg:w-[170px] lg:h-[120px] mx-auto">
            <img className="w-full h-full object-contain" src={logo} alt="" />
          </div>

          {/* menu list */}
          <div className="flex items-center gap-8 text-[#000] text-base leading-6 justify-center">
            <Link to={"/"}>Home</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/contact"}>Contact us</Link>
          </div>

          {/* download button */}
          <div className="flex items-center gap-6 justify-center">
            <Link className="block w-[120px] h-[40px] overflow-hidden">
              <img
                className="w-full h-full object-contain"
                src={appstore}
                alt=""
              />
            </Link>
            <Link className="block w-[120px] h-[40px] overflow-hidden">
              <img
                className="w-full h-full object-contain"
                src={playstore}
                alt=""
              />
            </Link>
          </div>
        </div>

        {/* lower */}
        <div className="flex items-center gap-3 lg:gap-0 text-sm lg:text-base justify-between border-t border-solid border-[rgba(114,114,114,0.50)]  pt-4 lg:pt-5">
          <div className="flex items-center flex-col lg:flex-row ">
            <Link to={`/privacy`}>Privacy policy</Link>
            <span className="px-1 rotate-90 my-[-5px] lg:my-0 lg:rotate-0">
              |
            </span>
            <Link to={`/terms`}>Terms & Condition</Link>
          </div>
          <p className="text-right lg:text-start">
            © 2024 . All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
