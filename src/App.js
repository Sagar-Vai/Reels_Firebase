// import logo from './logo.svg';
import './App.css';
// import Demo from './Component/Demo'
import Signup from './Component/Signup';
import AuthProvider from './Context/AuthProvider'
import Main from './MaterialUI/Main'
import Login from './Component/Login';
import Ioa from './Component/Ioa'
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom'
import Feed from './Component/Feed'
import PrivateRoute from './Component/PrivateRoute';
function App() {
  return (
   <Router>
     <AuthProvider>
       <Switch>
         <PrivateRoute exact path = '/' component={Feed}/>
         <Route path = '/login' component={Login}/>
         <Route path = '/signup' component = {Signup}/>
       </Switch>
     </AuthProvider>
   </Router>
  );
}

export default App;
