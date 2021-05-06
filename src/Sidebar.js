import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import RateReviewIcon from '@material-ui/icons/RateReview';
import IconButton from '@material-ui/core/IconButton';
import SidebarChat from './SidebarChat';
import './Sidebar.css';
import { useSelector } from 'react-redux';
import { selectUser } from './UserSlice';
import db, {auth} from './Firebase';
import { useEffect } from 'react';


const Sidebar = () => {
    const user = useSelector(selectUser);
    const [chats, setChats] = useState([]);
    
    useEffect(()=>{
        db.collection("chats").onSnapshot((snapshot)=>{
            setChats(
                snapshot.docs.map((doc)=>({
                    id:doc.id,
                    data:doc.data()
                }))
            )
        })
    }, [chats]);

    const addChat = () => {
        const chatName = prompt('Please Enter a Chat Name')
        db.collection("chats").add({
            chatName:chatName
        })
    }

    const signOut = () => {
        auth.signOut()
        window.location.reload(false)
    }
    return (
        <div className="sidebar">
            <div className="sidebar_header">
              <Avatar onClick={signOut}  src={user.photo} className="sidebar-avatar"/>
              <div className="sidebar_input">
                  <SearchIcon/>
                  <input placeholder="Search" type="text"/>
              </div>
              <IconButton variation="outlined" className="sidebar_inputButton">
                  <RateReviewIcon onClick={addChat} />
              </IconButton>
            </div>
            <div className="sidebar_chat">
                {chats.map(({id, data: {chatName}})=>
                    <SidebarChat key={id} id={id} chatName={chatName} />
                )}
              
            </div>
        </div>
    );
};

export default Sidebar;