import { useContext, useEffect, useState } from "react";
import { Avatar, Loader, Table } from "@mantine/core";
import { MdOutlineDeleteOutline } from "react-icons/md"
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "../redux/Api/contactListApi";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addContacts, addFavourite } from "../redux/service/contactSlice";
import { Menu } from "@mantine/core";
import { RiMore2Fill } from "react-icons/ri";
import { FaUserEdit, FaUser, FaHeart } from "react-icons/fa";





const ContactList = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactQuery(token);
  const [deleteContact] = useDeleteContactMutation();
  const contacts = useSelector((state) => state.contactSlice.contacts);
  const searched = useSelector((state) => state.contactSlice.searched);
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const { mode } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addContacts(data?.contacts?.data));
  }, [data, dispatch]);

  // console.log(data);

  const deleteHandler = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-700 p-2 px-5 rounded-lg mx-2 text-[#F2F1F2]",
        cancelButton: "bg-red-700 p-2 px-5 rounded-lg text-[#F2F1F2]",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your contact has been deleted.",
            "success"
          );

          const { data } = await deleteContact({ id, token });
          console.log(data);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your contact has not been deleted)",
            "error"
          );
        }
      });
  };

  const rows = contacts
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
      return (
      
        
        <tr className={`${mode?"hover:bg-[#e2eafc]":"hover:[#e2eafc]"}  contact-list`} key={contact?.id}>
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
          <td
            className={`${
              mode ? "text-[#040404]" : "text-[#F2F1F2]"
            } hidden md:table-cell`}>
            {contact?.name === null ? "exampleName" : contact?.name}
          </td>
          <td className={`${mode ? "text-[#040404]" : "text-[#F2F1F2]"} md:table-cell`}>
            {contact?.email === null ? "example@gmail.com" : contact?.email}
          </td>
          <td
            className={`${
              mode ? "text-[#040404]" : "text-[#F2F1F2]"
            } hidden md:table-cell`}>
            {contact?.phone === null ? "-" : contact?.phone}
          </td>
          <td
            className={`${
              mode ? "text-[#040404]" : "text-[#F2F1F2]"
            } hidden md:table-cell`}>
            {contact?.address === null ? "-" : contact?.address}
          </td>
          <td className="del-icon">
            <div className="flex justify-end">
              <Menu width={201} shadow="md">
                <Menu.Target>
                  <div className=" flex items-center hover:bg-white w-[30px] h-[30px] rounded-[50%]">
                    <RiMore2Fill className="text-2xl ml-[3px] text-gray-400" />
                  </div>
                </Menu.Target>

                <Menu.Dropdown>
                
                  <Menu.Item>
                    <div onClick={() => deleteHandler(contact?.id)} className="flex justify-between items-center">
                    <p
                      
                      className=" text-red-700 cursor-pointer">
                      Delete
                     
                    </p>
                    <MdOutlineDeleteOutline className=" text-xl"/>
                    </div>
                   
                  </Menu.Item>

                  <Menu.Item target="_blank">
                  <Link to={`/detail/${contact?.id}`}>
                  <div className="flex justify-between items-center text-[#0466c8]">
                    
                      <p className="">Detail</p>
                    
                    <FaUser />
                    </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                  <div onClick={() => dispatch(addFavourite(contact))} className="flex justify-between items-center">
                    <p
                      
                      className=" text-blue-700 cursor-pointer">
                      Favourite
                    </p>
                    <FaHeart />
                    </div>
                  </Menu.Item>

                  <Menu.Item target="_blank">
                  <Link to={`/edit/${contact?.id}`}>
                  <div className="flex justify-between items-center">
                    
                      <p className="">Edit</p>
                    
                    <FaUserEdit />
                    </div>
                    </Link>
                  </Menu.Item>
                </Menu.Dropdown>
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
    <div className="flex justify-center md:justify-start">
      
      {data?.contacts?.data.length === 0 ? (
        <div className="flex justify-center flex-col gap-3 items-center h-screen w-[80%] mx-auto">
          <h1 className="text-3xl font-semibold text-blue-700">Hello Dear!</h1>
          <iframe src="https://embed.lottiefiles.com/animation/67375"></iframe>
          <div className="text-gray-500 text-sm text-center">
            <h1 className="">There are no contacts to display</h1>
            <p className="">Please check back later for updates</p>
          </div>
        </div>
      ) : (
        <div
          className={`w-screen lg:w-[70%] absolute ${
            isOpen ? "lg:left-[305px]" : "lg:left-0"
          } ${isOpen ? "lg:px-0" : "lg:px-3"} duration-500 transition-all ${
            isOpen ? "lg:w-[70%]" : "lg:w-full"
          }`}>
          <div className="flex pt-0 md:pt-10">
          
            <Table className=" relative top-[80px] md:top-16 sm:top[150px]">
            
              <thead className="">
                {mode ? <tr className=" mb-6 ">
                  
                <th
                    className={` text-sm font-semibold md:table-cell hidden` } >
                    
                  </th>
                  <th
                    className={` text-sm font-semibold md:table-cell hidden`} >
                    Name
                  </th>
                  <th className={` text-sm font-semibold md:table-cell hidden`}>
                    Email
                  </th>
                  <th
                    className={` text-sm font-semibold md:table-cell hidden`}>
                    Phone Number
                  </th>
                  <th
                    className={` text-sm font-semibold md:table-cell hidden`}>
                    Address
                  </th>
                </tr> : <tr className=" mb-6 ">
                  
                  <td
                      className={` text-white text-sm font-semibold md:table-cell hidden` } >
                      
                    </td>
                    <td
                      className={` text-white text-sm font-semibold md:table-cell hidden `} >
                      Name
                    </td>
                    <td className={` text-white text-sm font-semibold md:table-cell hidden`}>
                      Email
                    </td>
                    <td
                      className={`text-white text-sm font-semibold md:table-cell hidden`}>
                      Phone Number
                    </td>
                    <td
                      className={`text-white text-sm font-semibold md:table-cell hidden`}>
                      Address
                    </td>
                  </tr>}
                
                
              </thead>
              
              <tbody className={`${mode ? "text-gray-600" : "text-[#F2F1F2]"} mt-5`}>{rows}</tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
