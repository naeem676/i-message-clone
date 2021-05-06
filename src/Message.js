import { Avatar } from '@material-ui/core';
import React from 'react';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import './Message.css';
import { selectUser } from './UserSlice';

const Message = forwardRef(({
    id, contents : {timeStamp, displayName, email, message, photo, uid}
}, ref
) => {

    const user = useSelector(selectUser)
    return (
        <div ref={ref} className={`message ${user.email === email && "message_sender"}`}>
            <Avatar className="message_photo" src={photo} />
             <p>{message}</p>
             <small>{new Date(timeStamp?.toDate()).toLocaleString()}</small>
        </div>
    );
});

export default Message;