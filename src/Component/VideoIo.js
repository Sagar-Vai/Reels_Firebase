import React from 'react'

function VideoIo(props) {
    const handleMuted =(e)=>{
     e.preventDefault();
     e.target.muted = !e.target.muted
    }
    return (
        <>
            <video className = 'video-styles' onClick = {handleMuted} controls muted = 'muted' type = 'video.mp4'>
                <source src = {props.source} type = 'video/webm'></source>
                </video>
        </>
    )
}

export default VideoIo
