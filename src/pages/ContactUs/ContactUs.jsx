import "./ContactUs.css";
import banner from "../../assets/images/contact-banner.png";
import axios from 'axios'
import { BASE_URL } from "../../baseurl/baseurl";
import { useState } from "react";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const ContactUs = () => {
const [state,setState]=useState({
  name:'',
  email:'',
  message:''
})
  const contactNow=async(e)=>{
    e.preventDefault()
try{
  let respose=await axios.post(`${BASE_URL}/contactUs`,state)
  setState({
    name:'',
    email:'',
    message:''
  })
  toastr.success("success")
}catch(error){
  if(error?.response && error?.response?.data){
    toastr.error(error?.response?.data?.error)
    }else{
    toastr.error("Server error please try again")
    
    }
}

}


  return (
    <div>
      {/* top area */}
      <div className="space-y-1 text-[#FFF] text-center bg-primaryColor py-7 rounded-[16px]  my-8 lg:my-[75px] ">
        <p className="text-base leading-6 font-normal">Contact Us</p>
        <h3 className="text-[22px] font-bold leading-9"> Get in Touch </h3>
      </div>

      {/* address area */}
      <div className="flex items-start gap-6 lg:gap-0 lg:items-center justify-between flex-col lg:flex-row ">
        <div className="single--address">
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
            >
              <path
                d="M23.7871 20.5219C22.8724 19.6188 21.7304 19.6188 20.8214 20.5219C20.1281 21.2094 19.4347 21.8969 18.753 22.5961C18.5666 22.7884 18.4093 22.8292 18.182 22.701C17.7334 22.4563 17.2556 22.2582 16.8244 21.9902C14.8143 20.7258 13.1304 19.1002 11.6388 17.2707C10.8989 16.3617 10.2405 15.3887 9.78016 14.2933C9.68693 14.0719 9.70441 13.9262 9.88503 13.7456C10.5784 13.0756 11.2543 12.388 11.936 11.7005C12.8857 10.7449 12.8857 9.62622 11.9301 8.66484C11.3883 8.11715 10.8464 7.58111 10.3045 7.03341C9.7452 6.47407 9.19168 5.90889 8.6265 5.35537C7.71174 4.46391 6.56973 4.46391 5.66079 5.3612C4.96161 6.04873 4.29156 6.75374 3.58072 7.42962C2.92232 8.05306 2.59021 8.81633 2.52029 9.70779C2.40959 11.1586 2.76501 12.5279 3.26609 13.8621C4.29156 16.6239 5.85307 19.0769 7.74669 21.3259C10.3045 24.3674 13.3576 26.7737 16.9293 28.5101C18.5374 29.2908 20.2038 29.8909 22.0159 29.99C23.2628 30.0599 24.3465 29.7453 25.2146 28.7722C25.809 28.108 26.479 27.5021 27.1083 26.867C28.0405 25.9231 28.0463 24.7811 27.1199 23.8488C26.0129 22.736 24.9 21.6289 23.7871 20.5219Z"
                fill="#333333"
              />
              <path
                d="M23.6714 14.8795C23.4092 13.353 22.6926 11.9662 21.5972 10.8709C20.4377 9.71141 18.9694 8.98309 17.3555 8.75586"
                stroke="#333333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="bevel"
              />
              <path
                d="M29.5 15C29.0018 12.0086 27.6402 9.29115 25.559 7.14462C23.3561 4.8725 20.5664 3.44529 17.5 3"
                stroke="#333333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="bevel"
              />
            </svg>
          </div>

          {/* text area */}
          <div className="text--area">
            <p className="small--text">Call us</p>
            <p className="main--text">+1 (803) 773-8903</p>
            <p className="small--text">Mon–Sat 8am - 8pm</p>
          </div>
        </div>
        <div className="single--address">
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
            >
              <path
                d="M6.1 5C4.891 5 3.88001 5.884 3.59141 7.06787L16.5 15.624L29.4162 7.09204C29.1354 5.89442 28.1181 5 26.9 5H6.1ZM3.5 10.1348V24.25C3.5 25.7666 4.6661 27 6.1 27H26.9C28.3339 27 29.5 25.7666 29.5 24.25V10.1643L16.5 18.75L3.5 10.1348Z"
                fill="#333333"
              />
            </svg>
          </div>

          {/* text area */}
          <div className="text--area">
            <p className="small--text">Email us</p>
            <p className="main--text">contact@undiscoverrecruits.com</p>
          </div>
        </div>
        <div className="single--address">
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="28"
              viewBox="0 0 29 28"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.8728 11.7079C23.8728 13.9247 23.1033 15.9618 21.8169 17.5666H21.8223C21.8223 17.5666 18.5644 21.9262 16.0406 25.0132C15.2355 25.998 13.7627 25.9976 12.958 25.0124C10.4422 21.9322 7.18855 17.576 7.18855 17.576L7.18097 17.5666C5.8945 15.9618 5.125 13.9247 5.125 11.7079C5.125 6.53083 9.32184 2.33398 14.4989 2.33398C19.676 2.33398 23.8728 6.53083 23.8728 11.7079ZM17.9991 11.6673C17.9991 13.6003 16.4321 15.1673 14.4991 15.1673C12.5661 15.1673 10.9991 13.6003 10.9991 11.6673C10.9991 9.73432 12.5661 8.16732 14.4991 8.16732C16.4321 8.16732 17.9991 9.73432 17.9991 11.6673Z"
                fill="#333333"
              />
            </svg>
          </div>

          {/* text area */}
          <div className="text--area">
            <p className="small--text">Location</p>
            <p className="main--text">Rochester, NY, USA</p>
          </div>
        </div>
      </div>

      {/* contact form area */}
      <div className=" my-[60px] lg:my-[100px] flex items-start lg:items-center gap-[30px] flex-col lg:flex-row ">
        <form className="contact--form flex-1 flex flex-col gap-6 lg:gap-[40px] w-full lg:w-auto">
          <div className="single--input">
            <label htmlFor="name">Name</label>
            <input value={state.name} onChange={(e)=>{
              setState({
                ...state,
                name:e.target.value
              })
            }} type="text" name="name" id="name" placeholder="Write Name" />
          </div>
          <div className="single--input">
            <label htmlFor="email">Email</label>
            <input
            value={state.email}
            onChange={(e)=>{
              setState({
                ...state,
                email:e.target.value
              })
            }}
              type="email"
              name="email"
              id="email"
              placeholder="Write Email"
            />
          </div>
          <div className="single--input">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              value={state.message}
              onChange={(e)=>{
                setState({
                  ...state,
                  message:e.target.value
                })
              }}
              placeholder="Write message"
            ></textarea>
          </div>

          <button onClick={contactNow} className="py-2.5 px-[55px] bg-primaryColor text-sm leading-6 font-normal w-full lg:w-fit mr-auto rounded-[30px] text-[#fff] ">
            Submit
          </button>
        </form>

        {/* banner area */}
        <div className="flex-1 h-[300px] lg:h-[500px] rounded-[20px] overflow-hidden">
          <img className="w-full h-full object-cover" src={banner} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
