import React,{useEffect,useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {database} from '../firebase'
import { color } from '@mui/system';
const useStyles =  makeStyles({
  like:{
      color:'#e74c3c',
      cursor:'pointer',
  },
  unlike:{
      color:'red',
      cursor:'pointer',
  }
})

function Likes({userData = null,postData = null}) {
    const classes = useStyles();
    const[like,setLike] = useState(null);

    useEffect(()=>{
      let check = postData.Likes.includes(userData?.userId)?true:false;
      setLike(check);
    },[postData])
    const handleLike = async()=>{
        if(like == true){
           let uarr = postData.Likes.filter(el=>{
               return el.userId != userData.userId
           })
           await database.posts.doc(postData.postId).update({

               likes:uarr
           })
           setLike(false)
        }else{
           let uarr = [...postData.Likes,userData.userId]
           await database.posts.doc(postData.postId).update({
               Likes:uarr
           })
           setLike(true)
        }
    }
    return (
        <div>
            {
                like != null?<>
                {
                    like == false?<FavoriteBorderIcon className={`${classes.unlike} icon-styling`} onClick={handleLike}/>:
                    <FavoriteIcon className={`${classes.like} icon-styling`} onClick={handleLike}/>
                }
                </>
                :<></>
            }
        </div>
    )
}

export default Likes

