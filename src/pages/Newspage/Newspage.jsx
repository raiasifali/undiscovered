import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import SectionTop from "../../components/Home/SectionTop/SectionTop";
import axios from "axios";
import { useEffect, useState } from "react";
import NewsWrapper from "../../components/Home/AllNewsArea/NewsWrapper";
import { BASE_URL } from "../../baseurl/baseurl";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
const Newspage = () => {
const [filternews,setFilter]=useState("")
const [news,setNews]=useState([])
useEffect(()=>{
getNews()
},[])
const getNews=async()=>{
try{
let response=await axios.get(`${BASE_URL}/getNews`)
let {news}=response.data
setNews(news)
}catch(error){

    if(error?.response && error?.response?.data){
        toastr.error(error?.response?.data?.error)
        }else{
        toastr.error("Server error please try again")
        
        }
        
        
}
}
console.log("NEW NEWS")
console.log(news)

  return (
    <div className=" py-4 lg:py-[40px]">
      <SectionTop title={"All News"} />

      {/* tabs area wrapper */}
      <div className="home--news--tab">
        <Tabs focusTabOnClick={false}>
          <TabList>
            <Tab onClick={(e)=>{

              setFilter("topnews")
            }}>Top news</Tab>
            <Tab onClick={(e)=>{
              setFilter("highlight")
            }}>Hightlight</Tab>
            <Tab onClick={(e)=>{
              setFilter("interview")
            }}>Interviews</Tab>
          </TabList>

          <div className=" py-5 lg:py-10">
            {/* <TabPanel>{news && <NewsWrapper newsData={news} />}</TabPanel> */}
            <TabPanel>
              {news && <NewsWrapper newsData={news.filter(u=>u.type.startsWith(filternews)).slice(-3, -1)} />}
            </TabPanel>
            {/* <TabPanel>{news && <NewsWrapper newsData={news} />}</TabPanel> */}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Newspage
