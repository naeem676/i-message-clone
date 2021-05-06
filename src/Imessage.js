import React, { useContext } from 'react';
import { ShowContext } from './App';
import Chat from './Chat';
import './Imessage.css';
import Sidebar from './Sidebar';

const Imessage = () => {
    const [show, setShow] = useContext(ShowContext)
    return (
        <div className="imessage">
            {show ? <Sidebar/> : <Chat/> }
           
           
        </div>
    );
};

export default Imessage;