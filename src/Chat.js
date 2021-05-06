import React, { useState } from 'react';
import './Chat.css';
import MicIcon from '@material-ui/icons/Mic';
import { IconButton } from '@material-ui/core';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChatID, selectChatName } from './ChatSlice';
import { useEffect } from 'react';
import db from './Firebase';
import firebase from 'firebase';
import { selectUser } from './UserSlice';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useContext } from 'react';
import { ShowContext } from './App';

const Chat = () => {

    const user = useSelector(selectUser);
    const [input, setInput] = useState('');
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatID);
    const [messages, setMessages] = useState([]);
    const [show, setShow] = useContext(ShowContext);

    useEffect(()=> {
        if(chatId){
            db.collection("chats")
            .doc(chatId)
            .collection("messages")
            .orderBy("timeStamp", "desc")
            .onSnapshot((snapshot)=>
            setMessages(
                snapshot.docs.map((doc)=>
                ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
            )
        }
    }, [chatId])

    const sendMessage = e =>{

        if(input){
            db.collection("chats").doc(chatId).collection("messages").add({
                timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                photo: user.photo,
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
    
            })
        }
        e.preventDefault();

        setInput('')

        //firebase magic
    }
    return (
        <div className="chat">
            <div className="chat_header">
                <IconButton>
                <ArrowBackIosIcon onClick={()=>setShow(true)} />
                </IconButton>
               <h4>To: <span className="chat_name">{chatName}</span></h4>
               <strong>Details</strong>
            </div>
            <div className="chat_message">
                <FlipMove>
            {messages.map(({id, data})=>
            <Message key={id} id={id} contents={data} />
            )}
            </FlipMove>
            </div>
            <div className="chat_input">
                  <form>
                  
                      <input value={input} onChange={e=> setInput(e.target.value)} placeholder="iMessage" type="text"/>
                    
                      <IconButton>
                         <SendIcon onClick={sendMessage} />
                      </IconButton>
                  </form>
                  <IconButton>
                      <MicIcon/>
                  </IconButton>
            </div>
        </div>
    );
};

export default Chat;