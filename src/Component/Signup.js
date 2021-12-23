import React,{useState,useContext,useEffect} from 'react'
import {AuthContext} from '../Context/AuthProvider'
import { storage,database } from '../firebase';
import {useHistory} from 'react-router-dom'
function Signup() {
    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[error,setError] = useState('');
    const[loading,setLoading] = useState(false);
    const[file,setFile] = useState(null);
    const {signup,currentUser} = useContext(AuthContext);
    const history = useHistory();
    // console.log(signup);
    const handleSignup = async (e)=>{
        e.preventDefault();
        try{ 
        setLoading(true);
        const res = await signup(email,password);
        const uid = res.user.uid;
        console.log(uid);
        const uploadTaskListener = storage.ref(`/users/${uid}/image/profileImage`).put(file);
        // fn1 -> track file uploading progess that how much file uploaded
        //  fn2 -> handle error in case error occure to uploading file
        // fn3 -> handle that file when file upload completely mean success

        uploadTaskListener.on('state_changed',fn1,fn2,fn3);
        function fn1(snapshot){
           var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           console.log('uploaded is',progress,'% done');
        }
        function fn2(error){
          setError(error);
          setTimeout(()=>{
              setError(' ')
        },2000);
          setLoading(false);
        }
       async function fn3(){
            const downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
            console.log(downloadUrl);
            await database.users.doc(uid).set({
                email : email,
                userId : uid,
                username : name,
                createdAt : database.getCurrentTimeStamp,
                profileUrl : downloadUrl,
                postIds : []
            })
            setLoading(false);
            console.log('user has sign up');
            history.push('/');
        }

    }catch(err){
       setError(err);
       setTimeout(()=>setError(' '),2000);
       setLoading(false);
    }
    }
    const handleFileSubmit = (e)=>{
        const file = e.target.files[0];
        console.log("file",file);
        if(file != null){
            setFile(file)
        }          
    }
    useEffect(() => {
       if(currentUser){
           history.push('/');
       }
    }, [])
    return (
        <div>
            <form onSubmit = {handleSignup}>
                <div>
                    <label htmlFor = ' '>UserName</label>
                    <input type = 'text' value = {name} onChange ={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor = ' '>Email</label>
                    <input type = 'email' value = {email} onChange ={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor = ' '>Password</label>
                    <input type = 'password' value = {password} onChange ={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor = 'profile'>Profile image</label>
                    <input type = 'file' accept = 'image/*' onChange = {handleFileSubmit}></input>
                </div>
                <button className = 'submit' disabled = {loading}>SignUp</button>
            </form>
        </div>
    )
}

export default Signup
