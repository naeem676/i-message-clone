
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { auth } from './Firebase';
import Imessage from './Imessage';
import Login from './Login';
import { selectUser, login, logout } from './UserSlice';

export const ShowContext = createContext();
function App() {
  const  [show, setShow] = useState(true)

  const user = useSelector(selectUser)

  const dispatch = useDispatch();

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
           
            dispatch(
              login({
              uid: authUser.uid,
              photo: authUser.photoURL,
              email: authUser.email,
              displayName: authUser.displayName
            })
       )
      }
       else{
     
      dispatch(logout());
      }
    })
  }, [dispatch]);
  return (
    <div className="app">
      <ShowContext.Provider value={[show, setShow]} >
      
      {user ? <Imessage/> : <Login/>}
      
      </ShowContext.Provider>
      
    </div>
  );
}

export default App;
