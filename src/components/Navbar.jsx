import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiArchiveIn } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import {HiSearch} from "react-icons/hi"
import {FaHeart} from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { toggleNavbar } from "../redux/service/navbarSlice";
import SearchInput from "./SearchInput";
import UserMenu from "../components/UserMenu"
import { useMediaQuery } from "react-responsive";
import { toggleDarkMode } from "../redux/service/darkModeSlice";


const Navbar = () => {
	const isTab = useMediaQuery({query : "(max-width : 992px)"});
	console.log(isTab,"isTab");
	const isOpen = useSelector((state) => isTab ? !state.navbar.isOpen : state.navbar.isOpen);
	const {mode} = useSelector(state=>state.darkMode);
	const dispatch = useDispatch();
	


	return (
		<>
		<nav className={`p-2 flex items-center justify-between space-x-5 cursor-pointer fixed z-40 top-2 left-0 right-0`}>
           <div className="flex items-center space-x-3">
            <div onClick={() => dispatch(toggleNavbar())} className="">
              {
                isOpen ? 

              <AiOutlineMenu className={`${mode?"text-black":"text-white"} text-2xl hover:bg-[#3c404314] cursor-pointer w-10 h-10 p-3 hover:rounded-full duration-100`}/> 
              :
              <AiOutlineMenu className={`${mode?"text-black":"text-white"} text-2xl hover:bg-[#3c404314] cursor-pointer w-10 h-10 p-3 hover:rounded-full duration-100`}/>
              }
            </div>
           <img className='w-[40px] hidden md:block' src="https://www.gstatic.com/images/branding/product/2x/contacts_2022_48dp.png" alt="" />
           <h1 className={`${mode?"text-[#5f6368]":"text-white"} text-2xl`}>Friends</h1>
          
			<SearchInput />
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
			
			{/* NAVBAR */}

			{/* SIDEBAR */}
			<div 
				className={`w-[65%] md:w-[14rem] absolute h-screen lg:h-96 lg:top-[60px] z-50 text-center shadow lg:shadow-none ${mode?"bg-[white]":"bg-[#040404]"} shadow-black cursor-pointer my-0 lg:my-5 ${
					isOpen ? "left-0" : "left-[-400px]"
				}`}
			>
				<Link to={"/create"}>
					<div
						className={` ms-3 font-medium lg:flex lg:flex-row hidden items-center space-x-2 p-2 mt-4 rounded-3xl shadow shadow-black hover:bg-[#e2eafc] ${mode ?"bg-white" : "bg-[#ccdbfd]"} ${mode ?"text-[#023e7d]" : "text-black"} hover:shadow-md hover:shadow-black`}
		
					>
						<svg
							className="me-1"
							width="36"
							height="36"
							viewBox="0 0 36 36"
						>
							<path fill="#34A853" d="M16 16v14h4V20z"></path>
							<path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
							<path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
							<path fill="#EA4335" d="M20 16V6h-4v14z"></path>
							<path fill="none" d="M0 0h36v36H0z"></path>
						</svg>
						<h1 className="text-sm">Create Contacts</h1>
					</div>
				</Link>

				<div className="flex lg:hidden items-center ms-2 mt-8 space-x-3">
					<img
						src="https://logodownload.org/wp-content/uploads/2014/09/google-logo-1.png"
						className="h-6"
						alt=""
					/>
					<span className={`${mode ?"text-[#040404]" : "text-white"} text-2xl`}>Friends</span>
					<AiOutlineClose
						className={`${mode ?"text-[#040404]" : "text-white"} ms-2`}
						onClick={() => dispatch(toggleNavbar())}
					/>
				</div>

				<div className="">
					<ul className="space-y-0 mt-6">
						<Link
							to="/"
							className={` space-x-7 flex items-center p-3 px-5 text-sm ${mode?"hover:hover:bg-[#e2eafc]":"hover:bg-[#33415c]"}`}
						>
							<BsFillPersonFill className={`ms-3 ${mode?"text-gray-700":"text-white"}`} />
							<p className={`${mode?"text-gray-700":"text-white"}`}>Contacts</p>
						</Link>
						<hr />
						<Link
							to="/favourite"
							className={` space-x-7 flex items-center p-3 px-5 text-sm ${mode?"hover:bg-[#e2eafc]":"hover:bg-[#33415c]"}`}
						>
							<FaHeart className={`ms-3 ${mode?"text-gray-700":"text-white"}`} />
							<p className={`${mode?"text-gray-700":"text-white"}`}>Favourite</p>
						</Link>
					</ul>
				</div>
			</div>
			{/* SIDEBAR */}
		</>
	);
};

export default Navbar;
