import React,{useState,useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// import MoreVertIcon from '@mui/icons/MoreVert';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import IconButton from '@mui/material/IconButton';
// import Ticker from 'reactticker';
// import MusicNoteIcon from '@mui/icons/MusicNote';
import './Post.css'
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import MuiDialogContent from '@mui/material/DialogContent';
import Video from './Video';
import { database } from '../firebase';
import { ClassNames } from '@emotion/react';
import Likes from './Likes';
import AddComment from './AddComment';
import Comments from './Comments';
const useStyles = makeStyles({
    root: {
      width: '100%',
      padding: '0px'
    },
    loader: {
      position: 'absolute',
      left: '50%',
      top: '50%'
    },
    typo: {
      marginLeft: '2%'
    },
    vac: {
      marginLeft: '3.5%',
      color: '#8e8e8e',
      cursor:'pointer'
    },
    dp: {
      marginLeft: '2%'
    },
    cc: {
      height: '50vh',
      overflowY: 'auto'
    },
    seeComments:{
      height:'54vh',
      overflowY:'auto'
    },
    ci:{
    
      color: 'black',
      // left:'9%',
      marginLeft: '26%',
      cursor:'pointer'
    },
    mn:{
      color:'white',
      
     
    },
    tmn:{
      color:'white'
    }
  
  });

function Post({userData = null}) {
  const[openId,setOpenId] = useState(null);
  const[open,setOpen] = useState(null);
    const classes = useStyles();
    const[posts,setPosts] = useState(null);
    const handleClickOpen = (id) => {
    console.log('helllo')
      setOpenId(id);
      setOpen(true);
    };
    const handleClose = () => {
      setOpenId(null);
      setOpen(false);
    };
    const callback = enteries =>{
        enteries.forEach(element => {
            // console.log(element);
            let el = element.target.childNodes[0];
            el.play().then(()=>{
              if(!el.paused && !element.isIntersecting)
                  el.pause();
            })
        });
     }
     const Observer =  new IntersectionObserver(callback,{threshold: 0.85});
     useEffect(()=>{
         let parr=[];
      const unsub = database.posts.orderBy('createdAt','desc').onSnapshot(querySnapshot =>{
         parr=[];
         querySnapshot.forEach((doc)=>{
            //  console.log(doc.data()," ",doc.id)
             let data = {...doc.data(),postId:doc.id}
             parr.push(data);
         })
         console.log(parr);
         setPosts(parr);
      })
      return unsub;
     },[])
     useEffect(()=>{
         const elements = document.querySelectorAll('.videos')
         elements.forEach((el)=>{
             Observer.observe(el);
         })
         return ()=>{
             Observer.disconnect();
         }
     },[posts])

    return (
      <>
      <div className='place'>
      </div>
      {posts==null?<CircularProgress className={classes.loader} color="secondary" />:
      <div className='videocontainer' id='videocontainer'>
        {
          
          posts.map((post)=>(
            <React.Fragment key={post.postId}>
              <div className='videos'>
                <Video source={post.pUrl} id={post.pId}/>
                <div className='fa' style={{display:'flex'}}>
                  <Avatar src={post.uProfile}></Avatar>
                  <h4>{post.uName}</h4>
                </div>
                 <ChatBubbleIcon  onClick={() => handleClickOpen(post.pId)} className={`${classes.ci} iconstyling`} />
                <Likes userData={userData} postData={post}/>
                    <Dialog maxWidth="md" open ={open} onClose={handleClose} arialabelledby="customizeddialogtitle" >
                      <MuiDialogContent>
                        <div className='dcontainer'>
                          <div className='videopart'>
                            <video  className='videostyles2' controls id={post.id} muted="muted" type="video/mp4" >
                              <source src={post.pUrl} type="video/webm" />
                            </video>
                          </div>
                          <div className='infopart'>
                            <Card>
                              <CardHeader
                                avatar={
                                  <Avatar src={post?.uProfile} arialabel="recipe" className={classes.avatar}>
                                  </Avatar>
                                }
                                action={
                                  <IconButton arialabel="settings">
                                    <MoreVertIcon />
                                  </IconButton>
                                }
                                title={post?.uName}

                              />
                              
                              <hr style={{ border: "none", height: "1px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
                              <CardContent className={classes.seeComments}>
                                
                              <Comments userData={userData} postData={post} />
                              </CardContent>
                              
                            </Card>
                            <div className='extra'>
                            <div className='likes'>
                              <Typography className={classes.typo} variant='body2'>Liked By {post.Likes.length == 0 ? 'nobody' : ` others`}</Typography>
                              </div>
                              <AddComment  userData={userData} postData={post}/> 
                              </div>
                          </div>
                        </div>
                      </MuiDialogContent>
                    </Dialog>
              </div>

              <div className='place'></div>
            </React.Fragment>
          ))
        }

      </div>
      }
      </>
        
    )
}

export default Post
