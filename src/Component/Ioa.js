// import { dividerClasses } from '@mui/material'
import React,{useState,useEffect} from 'react'
import vid1 from './vid1.mp4'
import vid2 from './vid2.mp4'
import vid3 from './vid3.mp4'
import vid4 from './vid4.mp4'
import Video from './Video.js'

function Ioa() {
  const[sources , setSources] = useState([{url:vid1},{url:vid2},{url:vid3},{url:vid4}])

   const callback = enteries =>{
      enteries.forEach(element => {
        //   console.log(element);
          let el = element.target.childNodes[0];
          el.play().then(()=>{
            if(!el.paused && !element.isIntersecting)
                el.pause();
          })
      });
   }
  const Observer = new IntersectionObserver(callback ,{
      threshold : 0.9
  })
  useEffect(()=>{
      let elements = document.querySelectorAll('.videos')
          elements.forEach(el=>{
              Observer.observe(el)
              
          })
  })
    return (
        <div className = 'video-container'>
           <div className = 'videos'>
            <Video source = {sources[0].url}/>
           </div>
           <div className = 'videos'>
            <Video source = {sources[1].url}/>
           </div>
           <div className = 'videos'>
            <Video source = {sources[2].url}/>
           </div>
           <div className = 'videos'>
            <Video source = {sources[3].url}/>
           </div>
        </div>
    )
}

export default Ioa
