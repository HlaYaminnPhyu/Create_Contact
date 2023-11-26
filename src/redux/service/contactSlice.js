import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const initialState = {
    contacts: [],
    searched: '',
    favourite: [],
};
// export const setCookie = (name, json)=>{

//     let cookieValue = '';
//     let expire = '';
//     let period = '';
  
//     //Specify the cookie name and value
//     cookieValue = name + '=' + JSON.stringify(json) + ';';
  
//     //Specify the path to set the cookie
//     cookieValue += 'path=/ ;';
  
//     //Specify how long you want to keep cookie
//     period = 30; //days to store
//     expire = new Date();
//     expire.setTime(expire.getTime() + 1000 * 3600 * 24 * period);
//     expire.toUTCString();
//     cookieValue += 'expires=' + expire + ';';
  
//     //Set cookie
//     document.cookie = cookieValue;
//   };
 

export const contactSlice = createSlice({
    name: 'contactSlice',
    initialState,
    reducers: {
        addContacts: (state, { payload }) => {
            state.contacts = payload;
        },
        setSearched: (state, { payload }) => {
            state.searched = payload;
        },
        addFavourite: (state, { payload })=>{
            const isExisted=state.favourite.find(item=>item.id===payload.id);
            if(isExisted){
                return state;
            }else{
                state.favourite = [...state.favourite,payload];
            }
        },
        removeFavourite: (state,{payload})=>{
           
            state.favourite=state.favourite.filter((item)=>item.id!==payload.id);
           
        }
    }
})

export const { addContacts, setSearched, addFavourite, removeFavourite } = contactSlice.actions;
export default contactSlice.reducer;
