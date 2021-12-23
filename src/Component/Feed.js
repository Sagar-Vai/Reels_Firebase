import React,{useState,useEffect,useContext} from 'react'
import { AuthContext } from '../Context/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';
import { database } from '../firebase';
import Header from './Header'
import UploadFile from './UploadFile';
import './Feed.css'
import Post from './Post';

function Feed() {
    const[userData,setUserData] = useState(null);
    const{currentUser} = useContext(AuthContext); 
    useEffect(()=>{
        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc)=>{
            // console.log(doc.data());
            setUserData(doc.data());
        })
    },[currentUser])
    return (
       <>
       {userData == null?<CircularProgress />:<>
           <Header userData = {userData}/>
           <Post userData={userData}/>
           <div style = {{height : '9.5vh'}}/>
           <div className='feed-container'>
               <div className='center'>
                   <UploadFile userData = {userData}/>
               </div>
           </div>
         </>
       }
       </>
    )
}

export default Feed
