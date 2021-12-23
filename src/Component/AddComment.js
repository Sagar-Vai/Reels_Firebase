import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { database } from '../firebase';
import './AddComment.css'
const useStyles = makeStyles((theme) => ({
    cbtn:{
       marginRight:'1%',
       marginTop : '4%',
       color: 'red',
    }
    }))
function AddComment({userData = null,postData = null}) {
    const classes = useStyles();
    const[text,setText] = useState('');

    const manageText = (e)=>{
        console.log(e.target.value)
        let comment = e.target.value;
        setText(comment);
    }
    const handleOnEnter = ()=>{
        const obj = {
            text : text,
            uName : userData.username,
            uUrl : userData.profileUrl
        }
        console.log(obj);
        database.comments.add(obj).then(docRef=>{
            console.log(docRef)
            database.posts.doc(postData.postId).update({
                Comments:[...postData.postId,docRef.id]
            }).catch((e)=>{
                console.log(e+" ");
            })
            setText('');
        })
    }
    return (
        <div className='emojibox'>
            <TextField value ={text} onChange={manageText} fullWidth={true} label = 'Add a Comment'/>
            <Button onClick={handleOnEnter} className={classes.cbtn} color='primary' disabled={text==''?true:false}>Post</Button>
            
        </div>
    )
}

export default AddComment
