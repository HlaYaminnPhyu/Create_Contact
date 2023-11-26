import { Avatar, Button, Loader, Menu, Table } from "@mantine/core";
import { useGetContactQuery } from "../redux/Api/contactListApi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { FiHeart } from "react-icons/fi";
import { removeFavourite } from "../redux/service/contactSlice";
import Navbar from "./Navbar";

const Favourite = () => {
  const token = Cookies.get("token");
  const { isLoading } = useGetContactQuery(token);
  const {mode} = useSelector(state=>state.darkMode);
  const searched = useSelector((state) => state.contactSlice.searched);
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const {favourite}  = useSelector((state) => state.contactSlice);
 
  console.log(favourite);
 
  const dispatch = useDispatch();


  const rows = favourite
    ?.filter((item) => {
      if (searched === "") {
        return item;
      } else if (
        item?.name.toLowerCase().includes(searched.toLocaleLowerCase())
      ) {
        return item;
      }
    })
    ?.map((contact) => {
      console.log(contact);

      return (
        <tr className="contact-list" key={contact?.id}>
         <td className="hidden md:table-cell">
            {contact?.email === null ? (
              <Avatar color="pink" size="md" radius="xl"></Avatar>
            ) : (
              <Avatar color="pink" size="md" radius="xl">
                {" "}
                <p className="text-lg">{contact?.name.substring(0, 1)}</p>{" "}
              </Avatar>
            )}
          </td>
          <td className={`hidden md:table-cell`}>
            {contact?.name === null ? "exampleName" : contact?.name}
          </td>
          <td>
            {contact?.email === null ? "example@gmail.com" : contact?.email}
          </td>
          <td className="hidden lg:table-cell">
            {contact?.phone === null ? "-" : contact?.phone}
          </td>
          <td className="hidden lg:table-cell">
            {contact?.address === null ? "-" : contact?.address}
          </td>
          <td className="del-icon">
            <div className="flex justify-end">
              <Menu width={200} shadow="md">
                <Menu.Target>
                  
                    <FiHeart onClick={() => dispatch(removeFavourite(contact))} 
                      className={` text-2xl ${mode? "fill-[#abc4ff]" :"fill-[#ccdbfd]"}`}
                    />
            
                </Menu.Target>
              </Menu>
            </div>
          </td>
        </tr>
      );
    });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader color="grape" variant="dots" />;
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      {favourite.length === 0 ? (
        <div>
          
          <Navbar/>

        <div className={`flex flex-col justify-center items-center h-screen`}>
        <h1 className="text-3xl font-semibold text-blue-700">Hello Dear!</h1>
        <iframe src="https://embed.lottiefiles.com/animation/85023" className=" "></iframe>
          <div className={`${mode ?"text-gray-500":"text-gray-300"} text-sm text-center`}>
            <h1 className="">There is no favourite to display</h1>
            <p className="">Please check back later for updates</p>
          </div>
        </div>
          
          </div>
        
      ) : (
        <div>
          <Navbar/>
        <div
          className={`lg:w-[70%] w-screen absolute ${
            isOpen ? "lg:left-[305px]" : "lg:left-0"
          } ${isOpen ? "lg:px-0" : "lg:px-3"} duration-500 transition-all ${
            isOpen ? "lg:w-[70%]" : "lg:w-full"
          }`}>
          <div className="flex justify-start pt-0 md:pt-10">
            <Table className="relative top-24 lg:top-12 md:top-16 table-auto">
              <thead className="">
                <tr className="">
                <th
                    className={`${mode ? "text-gray-600" : "text-[#F2F1F2]"}`} >
                    
                  </th>
                  <th
                    className={`${mode ? "text-gray-600" : "text-[#F2F1F2]"} text-sm font-semibold`} >
                    Name
                  </th>
                  <th className={`${mode ? "text-gray-600" : "text-[#F2F1F2]"}`}>
                    Email
                  </th>
                  <th
                    className={`${mode ? "text-gray-600" : "text-[#F2F1F2]"}`}>
                    Phone Number
                  </th>
                  <th
                    className={`${mode ? "text-gray-600" : "text-[#F2F1F2]"}`}>
                    Address
                  </th>
                </tr>
              </thead>
              <tbody className={`${mode ? "text-gray-600" : "text-[#F2F1F2]"}`}>{rows}</tbody>
            </Table>
          </div>
        </div>
        </div>
        
      )}
    </div>
  );
};

export default Favourite;
