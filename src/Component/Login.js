import React,{useState,useContext,useEffect} from 'react'
import { AuthContext } from '../Context/AuthProvider'
import {useHistory} from 'react-router-dom'
function Login() {
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[error,setError] = useState('');
    const[loading,setLoading] = useState(false);
    const {login,currentUser} = useContext(AuthContext);
    const history = useHistory();
    const handleLogin = async(e)=>{
     e.preventDefault();
     try{
         console.log('login user')
        setLoading(true);
         await login(email,password);       
        setLoading(false);
        history.push('/');
     }catch{
     setError("failed to login");
     setTimeout(()=>setError(' '),2000);
     setLoading(false);
     }
    }
    useEffect(() => {
       if(currentUser){
           history.push('/');
       }
    }, [])
    return (
        <div>
            <form onSubmit = {handleLogin}>
                <div>
                    <label htmlFor = ''>Email</label>
                    <input type = 'mail' value = {email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor = ''>Password</label>
                    <input type = 'new-password' value = {password} onChange ={(e)=> setPassword(e.target.value)}/>
                </div>
                <button className = 'submit' disabled = {loading}>Login</button>
                
                {!currentUser?<>{error}</>:<></>}
            </form>
        </div>
    )
}

export default Login
