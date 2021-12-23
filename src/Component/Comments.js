import React,{useState,useEffect} from 'react'
import { makeStyles } from '@mui/styles';
import {CircularProgress} from '@material-ui/core'
import {database} from '../firebase'
import { Avatar } from '@mui/material';
import './Comments.css'
const useStyles = makeStyles((theme) => ({
    da:{
        marginRight: '2%',
        marginTop: '2%'
    }
    }))
function Comments(props) {
    const classes = useStyles();
    const[comments,setComments] = useState(null);
    
    useEffect(async()=>{
            let arr=[];
            console.log(props.postData);
            for(let i = 0; i < props.postData.Comments.length;i++){
                let cid = props.postData.Comments[i];
                let data = await database.comments.doc(cid).get();
                arr.push(data);
            }
            setComments(arr);
    },[props.postData])
    return (
       <>
       { comments == null? <CircularProgress/>:
       comments.map((comment,index)=>(
           <div key={index} className='comment-div'>
               <Avatar src={comments.uUrl} className={classes.da}/>
               <p><span style={{fontWeight:'bold', display: 'inline-block'}}>{comments.uName}</span>&nbsp;&nbsp;{comments.text}</p>
           </div>
       ))

       }
       </>
    )
}

export default Comments
