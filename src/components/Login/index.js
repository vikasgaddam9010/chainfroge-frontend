import {useNavigate} from 'react-router-dom'
import { FiEye ,  FiEyeOff } from "react-icons/fi";
import { useState } from 'react';
import Cookies from "js-cookie"

import './index.css'


const Login = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("")
    const [passwordError, setPasswordError] = useState('');
    const [apiState, setApiState] = useState("")
    const [serverState, setServerState] = useState('')

    document.title = "Chainfroge-Login"
    const navigate = useNavigate()
    const handleSingup = () => {
        navigate("/sign-up")
    }

    const loginSubmitHnadler = async e => {
        e.preventDefault()
        
        if(email !== "" && password !== ""){
            if(passwordError.length === 0 && error.length === 0){
                setApiState("loading")                
                const url = "https://chainfroge-backend.onrender.com/log-in/"
                const options = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email, password})
                }
                const serverRes = await fetch(url, options)
                const serverJsonData = await serverRes.json()
                             
                if(serverRes.ok){
                    setApiState("success")
                    setEmail("")
                    setPassword("")
                    setServerState(serverJsonData.message) 
                    Cookies.set("jwt", serverJsonData.jwtToken, {expires: 30})
                    navigate("/profile")

                }else{
                    setApiState("failed")
                    setServerState(serverJsonData.message)
                }      
            }else{
                return alert("Must Pass Mail and Password Validations")
            }                  
        }else{
            return alert("Please Enter Registered Credentials")
        }        
    }

    const validatePassword = (value) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecialChar = /[!@#$%^&*]/.test(value);

        if (value.length < minLength) {
            setPasswordError('Password must be at least 8 characters long.');
        } else if (!hasUpperCase) {
            setPasswordError('Password must include at least one uppercase letter.');
        } else if (!hasLowerCase) {
            setPasswordError('Password must include at least one lowercase letter.');
        } else if (!hasNumber) {
            setPasswordError('Password must include at least one number.');
        } else if (!hasSpecialChar) {
            setPasswordError('Password must include at least one special character (e.g., !@#$%^&*).');
        } else {
            setPasswordError('');
        }
    }

    const handlePassword = e => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    }
    
    const handleMail = e =>{
        const gmailRegex = /^[^\s@]+@gmail\.com$/;
        const result = gmailRegex.test(e.target.value);
        if(result){
            setEmail(e.target.value)
            setError("")
        }else{
            setEmail(e.target.value)
            setError("Plase Enter Correct Mail")
        }
    }
    
    return (
        <div className="login-container d-flex-column">
            <h2 style={{marginBottom:"30px"}}>Login to Chainforge</h2>
            <form onSubmit={loginSubmitHnadler} className="d-flex-column forms-container">
                <label htmlFor="username">Email</label>
                <input className='input-username' type="text" id="username" onChange={handleMail} value={email} placeholder="example@gmail.com" />
                {error.length > 0 ? <p className='error'>{error}</p> : <p>  </p>}
                
                <label htmlFor="password">Password</label>
                <div className='password-filed'>
                    <input className='input-password' type={passwordVisibility ? "text" : "password"} id="password" placeholder="******" value={password} onChange={handlePassword} name="password"/>
                    <button type="button" className='eye-btn' onClick={() => setPasswordVisibility(!passwordVisibility)}>{passwordVisibility ?<FiEye/> :  <FiEyeOff/>}</button>
                    
                </div>
                {passwordError.length > 0 ? <p className='error'>{passwordError}</p> : <p>  </p>}
                
                <div style={{display: "flex", justifyContent:"space-between"}}>
                    {apiState === "loading" ? <button style={{backgroundColor:"lightgray", border:"none"}} className='main-btn' >Please Wait</button>:<button className='main-btn' type="submit">Login</button>}<button onClick={handleSingup}>Signup</button>
                </div>
                <p style={{textAlign:"center", color:"brown", fontWeight:"700", marginTop:"30px"}}>{serverState}</p>                
            </form>
        </div>
    )
}

export default Login