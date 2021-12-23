import  React ,{useState,useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@material-ui/core/styles';
// import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {AuthContext} from '../Context/AuthProvider'
import {useHistory} from 'react-router-dom'
const useStyle = makeStyles((theme) => ({
    appb:{
      backgroundColor:"white"
    },
    icon:{
      color: 'black'
    },
    title :{
     fontFamily : 'Cursive',
     color : 'black'
    }
    }))

export default function Header(props) {
  const history = useHistory();
  const {logout} = useContext(AuthContext);
    const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState(null);

  // console.log(props.userData.userId);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async()=>{
    await logout();
    history.push('/login');
  }
  return (
    <Box  sx={{ flexGrow: 1 }}>
      
      <AppBar className = {classes.appb} position="fixed">
        <Toolbar>
          
          <Typography className = {classes.title} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Instagram
          </Typography>
          {(
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle className = {classes.icon}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}