import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';
import { formHelperTextClasses } from '@mui/material';
// import { ClassNames } from '@emotion/react';
const useStyle = makeStyles((theme)=> ({
btn :{
display:"flex",
   marginTop:'5vw',

    // position:'fixed',
    '&:hover': {
        backgroundColor: '#black',
        color: 'white',
    }
}
// //     display: flex;
// margin-top: 9vw;
// width: 100vw;
// justify-content: center;
// align-items: center;
}))
function Buttons() { 
    const classes = useStyle();
    return (
        <div className = {classes.btn} >
             <Button  color ='primary'>Primary</Button>
            
        </div>
    )
}

export default Buttons
