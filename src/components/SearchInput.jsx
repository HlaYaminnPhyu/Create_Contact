import { GoSearch } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setSearched } from "../redux/service/contactSlice";
import { BiArchiveIn } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {HiSearch} from "react-icons/hi"
import { useState } from "react";

export default function SearchInput() {
	const [click,setClick] = useState(true)
	const {mode} = useSelector(state=>state.darkMode);
	const dispatch = useDispatch();

	const searched = useSelector((state) => state.contactSlice.searched);

	const handleChange = (e) => {
		dispatch(setSearched(e.target.value));
	};

	const handleReset = () => {
		dispatch(setSearched(""));
	};

	return (
		<div className="">
			 <div className="lg:space-x-24 ">
           <HiSearch onClick={()=>setClick(!click)} className={`${mode? "text-[#040404]":"text-white"} absolute lg:top-[13px] left-[200px] lg:ms-[7rem] md:left-auto md:top-[9px] md:ms-3 top-[5px] hover:bg-[#3c404314] cursor-pointer w-12 h-12 lg:w-10 lg:h-10 p-3 hover:rounded-full duration-100`}/><input value={searched} onChange={handleChange} id="search_input" type="text" placeholder='Search' className={`${mode? "bg-white":"bg-[#404040]"} ${mode ? "placeholder:text-[#040404]":"placeholder:text-white"} lg:w-[600px] md:w-[400px] w-[12rem] p-3 outline-none rounded-lg md:px-16 pe-1 cursor-pointer absolute top-[5px] left-0 md:static ms-2 lg:ms-auto ${mode ? "shadow shadow-gray-900" : " shadow shadow-gray-300"} ${click ? "hidden" : "block"} md:block`}/> 
		   {!!searched.length && (
           <AiOutlineClose onClick={handleReset} className={`absolute top-[20px] md:top-[27px] lg:left-[785px] md:left-[595px]`}/>
			)}
           </div>
		</div>
		
	);
}
