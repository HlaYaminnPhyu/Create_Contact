import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";
import { useGetSingleContactQuery } from "../redux/Api/contactListApi";
import { Loader } from "@mantine/core";
import a1 from "../images/7309681.jpg";
import {
  BsTelephone,
  BsQuestionOctagon,
} from "../../node_modules/react-icons/bs";
import { GoMail } from "../../node_modules/react-icons/go";
import { SlPlus } from "../../node_modules/react-icons/sl";
import { RxTwitterLogo } from "../../node_modules/react-icons/rx";
import gmail from "../images/gmail.svg";
import facebook from "../images/facebook.svg";
import twitter from "../images/twitter.svg";
import {AiOutlineStar,AiOutlinePrinter,AiFillStar,AiOutlineClose, AiOutlineMenu } from "../../node_modules/react-icons/ai";
import { BiArchiveIn } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { BsThreeDotsVertical,BsSearch } from "../../node_modules/react-icons/bs";
import { CiExport } from "../../node_modules/react-icons/ci";
import { FiSettings } from "../../node_modules/react-icons/fi";
import { BiHelpCircle } from "../../node_modules/react-icons/bi";
import { useSelector,useDispatch } from "react-redux";
import { addFavourite, removeFavourite } from "../redux/service/contactSlice";
import { useState } from "react";
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {  Group, Button, TextInput } from '@mantine/core';
import SearchInput from "./SearchInput";
import { toggleNavbar } from "../redux/service/navbarSlice";
import { toggleDarkMode } from "../redux/service/darkModeSlice";
import UserMenu from "./UserMenu";


const Detail = () => {
  const {mode} = useSelector(state=>state.darkMode);
  const token = Cookies.get("token");
  const { id } = useParams();
  const { data, isLoading } = useGetSingleContactQuery({ id, token });
  const favlist = useSelector((state) => state.contactSlice.favourite)
  const isFav = favlist.some((el,i,arr)=> el.id === Number(id));
  const dispatch = useDispatch();
  const [responsiveNav,setResponsiveNav] = useState(true)

  const [opened, { open, close }] = useDisclosure(false);

  console.log(isFav)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader color="grape" variant="dots" />
      </div>
    );
  }

  return (
    <div className={` min-h-min ${mode?"bg-white":"bg-black"}`}>
  
     <nav className={`${mode?"bg-white":"bg-black"} p-2 flex items-center justify-between space-x-5 cursor-pointer fixed z-40 top-0 left-0 right-0`}>
           <div className={` ${mode ?"text-[#5f6368]" : "text-white"} flex items-center space-x-3`}>
            <Link to={"/"}><div className="">
              <AiOutlineMenu className={`text-xl hover:bg-[#3c404314] cursor-pointer w-10 h-10 p-3 hover:rounded-full duration-100`}/> 
            </div></Link>
           
           <img className='w-[40px] hidden md:block' src="https://www.gstatic.com/images/branding/product/2x/contacts_2022_48dp.png" alt="" />
           <h1 className= {`${mode ?"text-[#5f6368]" : "text-white"} cursor-pointer text-2xl `}>Friends</h1>
      
			
           </div>
           <div className='flex items-center lg:space-x-5 space-x-2'>
                    <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input onClick={()=>dispatch(toggleDarkMode())} type="checkbox" id="toggleB" className="sr-only" defaultChecked={!mode}/>
                        <div className={`block ${mode?"bg-[#040404]":"bg-[#F2F1F2]"}  w-14 h-8 rounded-full`}></div>
                        <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                      </div>
                    </label>
             
				<UserMenu/>
              </div>
        </nav>


      <div className={` min-h-screen px-10`}>
        <div className=" flex flex-col gap-10 w-full">
          {/* Avator */}
          <div className=" img flex flex-col md:flex-row justify-center gap-12 items-center mt-12">
            <img
              src={a1}
              alt=""
              className=" w-48 h-48 mt-20 object-cover rounded-full"
            />
            <div className=" flex flex-col gap-3">
              <p className={`font-semibold text-2xl mb-3 mt-0 sm:mt-20 text-gray-700 font-sans tracking-wide ${mode ? "text-slate-900" : "text-white"}`}>
                {data.contact.name}
              </p>
              <div>
                <button className={`flex items-center shadow py-2 px-4 font-sans text-sm ${mode ? "text-gray-500" : "text-white"} font-normal border border-gray-200 rounded`}>
                  Add Label
                  <SlPlus className={`${mode ? "text-gray-700" : "text-white"} ms-2`} />
                </button>
              </div>
              <div className="flex items-center mt-10">
                {
                  isFav ? (
                    <button onClick={()=> dispatch(removeFavourite(data.contact)) }>
                      <AiFillStar className={`${mode ? "text-gray-500" : "text-white"} text-lg me-4`}/>
                    </button>
                  ):(
                    <button>
                    <AiOutlineStar className={`${mode ? "text-gray-500" : "text-white"} text-lg me-4`} onClick={()=>dispatch(addFavourite(data.contact))}/>
                    </button>
                  )
                }
                <button>
                <AiOutlinePrinter className={`${mode ? "text-gray-600" : "text-white"} text-lg me-4`} onClick={()=> window.print()}/>
                </button>
                <button>
                <CiExport className={`${mode ? "text-gray-600" : "text-white"} text-lg`} />
                </button>
                <Link to={`/edit/:${data.contact.id}`}>
				        <button className=" font-sans font-bold bg-slate-700 ms-3 text-white px-4 py-2 leading-4 rounded">
                  Edit
                </button>
				        </Link>
                <Link to={`/`}>
				        <button className=" font-sans font-bold bg-slate-700 ms-3 text-white px-4 py-2 leading-4 rounded">
                  Back
                </button>
				        </Link>
              </div>
            </div>
          </div>
          {/* info & interaction */}
          <div className=" flex flex-col md:flex-row justify-center gap-5">
            {/* contact info */}
            <div >
				<div className=" shadow px-4 py-6 border w-auto md:w-[500px]">
					<p className={`${mode?"text-gray-700":"text-white"} h-6 font-sans font-semibold`}>Contact info</p>
					<div className=" mt-4">
					<div className=" flex items-center">
						<BsTelephone className={`${mode?"text-gray-500":"text-white"} inline font-bold me-3`} />
						<a
						href="#"
						className={`${mode?"text-gray-700":"text-gray-300"} font-sans font-medium`}>
						{data?.contact?.phone}
						</a>
					</div>
					<div className=" flex items-center">
						<GoMail className={`${mode?"text-gray-500":"text-white"} inline font-bold me-3`} />
						<a
						href="#"
						className={`${mode?"text-gray-700":"text-gray-300"} font-sans font-medium`}>
						{data?.contact?.name}@gmail.com
						</a>
					</div>
					<div className=" flex items-center">
						<RxTwitterLogo className={`${mode?"text-gray-500":"text-white"} inline font-bold me-3 `} />
						<a
						href="#"
						className={`${mode?"text-gray-700":"text-gray-300"} font-sans font-medium`}>
						https://twitter.com/{data?.contact?.name}
						</a>
					</div>
					</div>
				</div>
			</div>
            {/* recent interaction */}
            <div>
              <div className="  shadow px-4 py-6 border md:w-[450px]">
                <p className={`${mode?"text-gray-700":"text-white"} h-6 font-sans font-semibold`}>
                  Recent Interaction
                </p>
                <div className=" mt-4">
                  <div className=" flex items-center my-2">
                    <img src={gmail} alt="" className=" w-6 me-3" />
                    <p className={`${mode ?"text-gray-500":"text-gray-300"} font-sans font-normal text-sm`}>
                      how is going today Gilb?
                    </p>
                  </div>
                  <div className=" flex items-center my-2">
                    <img src={twitter} alt="" className=" w-6 me-3" />
                    <p className={`${mode ?"text-gray-500":"text-gray-300"} font-sans font-normal text-sm`}>
                      {" "}
                      sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                  <div className=" flex items-center my-2">
                    <img src={gmail} alt="" className=" w-6 me-3" />
                    <p className={`${mode ?"text-gray-500":"text-gray-300"} font-sans font-normal text-sm`}>
                      {" "}
                      ipsum dolor sit amet.
                    </p>
                  </div>
                  <div className=" flex items-center">
                    <img src={facebook} alt="" className=" w-6 me-3" />
                    <p className={`${mode ?"text-gray-500":"text-gray-300"} font-sans font-normal text-sm`}>
                      amet consectetur adipisicing elit. Libero in corporis
                      voluptate.
                    </p>
                  </div>
                </div>
              </div>
			  {/* history */}
			<div className=" flex justify-start flex-nowrap">
				<div>
					<span className={` ${mode?"text-gray-500":"text-gray-200"} h-6 font-sans font-normal`}>
				history
				<BsQuestionOctagon className={`${mode?"text-gray-500":"text-gray-200"} inline-block ms-2 mb-1`} />
					</span>
					<div className=" mt-4">
					<pre className={` ${mode?"text-gray-700":"text-gray-400"} text-sm font-sans font-normal`}>
						last edited at{" "}
						<span className={` ${mode?"text-gray-500":"text-gray-200"} text-sm font-sans font-normal`}>
						{" "}
						{data.contact.updated_at}
						</span>
					</pre>
				
					</div>
				</div>
			</div>
            </div>
          </div>
		  
        </div>
      </div>

    </div>
  );
};

export default Detail;
