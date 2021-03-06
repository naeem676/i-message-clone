import { Avatar } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setChat } from './ChatSlice';
import db from './Firebase';
import './SidebarChat.css';
import * as timeago from 'timeago.js';
import { useContext } from 'react';
import { ShowContext } from './App';

const SidebarChat = ({id, chatName}) => {

    const dispatch = useDispatch();
    const [chatInfo, setChatInfo] = useState([]);

    const [show, setShow] = useContext(ShowContext)

    useEffect(()=>{
        db.collection("chats")
        .doc(id)
        .collection("messages")
        .orderBy("timeStamp", "desc")
        .onSnapshot(snapshot => {
            setChatInfo(snapshot.docs.map((doc)=> doc.data()))
        })
    },[id])

    const showAndDispatch = ()=>{
        dispatch(
            setChat({
                chatId: id,
                chatName: chatName
            })
            
        )
        setShow(false)
    }
    
    return (
        <div onClick={showAndDispatch} className="sidebarChat">
            <Avatar src={chatInfo[0]?.photo} />
            <div className="sidebarChat_info">
                <h3>{chatName}</h3>
                <p>{chatInfo[0]?.message}</p>
                <small>{timeago.format( new Date(chatInfo[0]?.timeStamp?.toDate()).toLocaleString())}</small>
            </div>
            
        </div>
    );
};

export default SidebarChat;