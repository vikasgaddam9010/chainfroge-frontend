import { useNavigate } from 'react-router-dom'

import { FiEye ,  FiEyeOff } from "react-icons/fi";
import { useState } from 'react'

import './index.css'

const Signup = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setMailError] = useState('');
    const [error, setError] = useState('');
    const [serverState, setServerState] = useState('')
    const [apiState, setApiState] = useState('')

    document.title = "Chainfroge-Sing Up"

    const navigate = useNavigate()
    const handleSingup = () => {
        navigate("/log-in")
    }

    const handleSubmit = async e => {
        e.preventDefault()
        console.log(email, password)
        if(email !== "" && password !== ""){
            console.log(err, error)
            if(err.length === 0 && error.length === 0){
                setApiState("loading")
                setServerState("")
                const url = "http://localhost:5000/register/"
                const options = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email, password})
                }
                const serverRes = await fetch(url, options)
                console.log(serverRes)
                const serverJsonData = await serverRes.json()
                if(serverRes.ok){
                    setApiState("success")
                    setEmail("")
                    setPassword("")
                    setServerState(serverJsonData.message)
                    navigate("/log-in")
                }else{
                    setApiState("failed")
                    setServerState(serverJsonData.message)
                }         
            }else{
                return alert("Must Pass Mail and Password Validations")
            }              
        }else{
            return alert("Please Enter Valid Credentials")
        }
    }

    const validatePassword = (value) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecialChar = /[!@#$%^&*]/.test(value);

        if (value.length < minLength) {
            setError('Password must be at least 8 characters long.');
        } else if (!hasUpperCase) {
            setError('Password must include at least one uppercase letter.');
        } else if (!hasLowerCase) {
            setError('Password must include at least one lowercase letter.');
        } else if (!hasNumber) {
            setError('Password must include at least one number.');
        } else if (!hasSpecialChar) {
            setError('Password must include at least one special character (e.g., !@#$%^&*).');
        } else {
            setError('');
        }
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        validatePassword(value);
    };

    const handleUsername = e =>{
        const gmailRegex = /^[^\s@]+@gmail\.com$/;
        const result = gmailRegex.test(e.target.value);
        if(result){
            console.log(e.target.value)
            setEmail(e.target.value)
            setMailError("")
        }else{
            setEmail(e.target.value)
            setMailError("Plase Enter Correct Mail")
        }
    }

    console.log(serverState)
    return (
        <div className="login-container d-flex-column">
            <h2 style={{marginBottom:"30px"}}>Register to Chainforge</h2>
            <form onSubmit={handleSubmit} className="d-flex-column forms-container">
                <label htmlFor="username">Registered Email</label>
                <input className='input-username'  type="text" id="username" value={email} onChange={handleUsername} placeholder="example@gmail.com"/>
                {err.length > 0 ? <p className='error'>{err}</p> : <p>  </p>}
                
                <label htmlFor="password">Password</label>
                <div className='password-filed'>
                    <input className='input-password' onChange={handleChange} type={passwordVisibility ? "text" : "password"} id="password" placeholder="********" value={password}  name="password"/>
                    <button type="button" className='eye-btn' onClick={() => setPasswordVisibility(!passwordVisibility)}>{passwordVisibility ?<FiEye/> :  <FiEyeOff/>}</button>
                </div>
                {error.length > 0 ? <p className='error'>{error}</p> : <p>  </p>}
                
                <div style={{display: "flex", justifyContent:"space-between"}}>
                    {apiState === "loading" ? <button style={{backgroundColor:"lightgray", border:"none"}} className='main-btn' disabled>PLease Wait</button> :<button className='main-btn' type="submit">Signup</button>}<button onClick={handleSingup}>Login</button>
                </div>
                <p style={{textAlign:"center", color:"brown", fontWeight:"700", marginTop:"30px"}}>{serverState}</p>
            </form>
        </div>
    )
}

export default Signup