import React,{useState} from 'react'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import {v4 as uuidv4} from 'uuid'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@mui/material/LinearProgress';
import { database,storage } from '../firebase';
const useStyles = makeStyles((theme)=>({
//    button:{
//        marginTop: '5%'
//    }
}));


function UploadFile(props) {
    const classes = useStyles();
    const[error,setError] = useState(null);
    const[loading,setLoading] = useState(false);
    const types = ['video/mp4','video/webm','video/gg']
    const onChange =(e)=>{
     const file = e?.target?.files[0];
     if(!file){
         setError('Please select a file');
         setTimeout(()=>{setError(null)},2000);
         return;
     }
     if(types.indexOf(file.type) == -1){
        setError('Please select a video file');
        setTimeout(()=>{setError(null)},2000);
        return;
     }
     if(file.size/(1024*1024) > 100){
         setError('This file is too much');
         setTimeout(()=>{setError(null)},2000);
         return;
     }
     console.log(file);
     const id = uuidv4();
     const uploadTask = storage.ref(`/posts/${props.userData.Id}/{file.name}`).put(file);
     uploadTask.on('state_changed',fn1,fn2,fn3);
     function fn1(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('uploaded is',progress,'% done');
     }
     function fn2(error){
       setError(error);
       setTimeout(()=>{
           setError(null)
     },2000);
       setLoading(false);
     }
     async function fn3(){
         setLoading(true);
         uploadTask.snapshot.ref.getDownloadURL().then(url=>{
             const obj ={
                 Comments :[],
                 Likes :[],
                 pId : id,
                 pUrl : url,
                 uName : props?.userData?.username,
                 uProfile : props?.userData?.profileUrl,
                 userId : props?.userData?.userId,
                 createdAt : database.getCurrentTimeStamp
             }
             console.log(obj);
             console.log(props.userData);
             database.posts.add(obj).then(async docRef=>{
              const res = await database.users.doc(props.userData.userId).update({
                     postIds:[...props.userData.postIds,docRef.id]
               })
             }).then(()=>{
                 setLoading(false);
             }).catch(e=>{
                 setError(e);
                 setTimeout(()=>{setError(' ')},2000)
                 setLoading(false)
             })
         })
     }

    }
    return (
        <>
        {error != null?<Alert severity="error">{error}</Alert>:<>
        <input
        type = 'file'
        id = 'icon-button-file'
        onChange = {onChange}
        style = {{display:'none'}}
        />       
        
        <label htmlFor = 'icon-button-file'>
        <Button disabled = {loading} component = 'span' size = 'medium' className={classes.button}
         variant='outlined' color="secondary">Secondary</Button>
        </label>
        {loading ?<LinearProgress style ={{marginTop:'6%'}} color="secondary" />:<></> }
        </>

        }
        </>
    )
}

export default UploadFile
