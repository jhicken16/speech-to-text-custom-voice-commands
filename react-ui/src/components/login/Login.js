import { useState } from 'react'
import { logUserIn, registerUser } from '../../fetches/logAndRegister'
import './login.css'


export default function Login(props){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [register, setRegister] = useState(false)

    const [error, setError] = useState(null)
    

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleError = (response) => {
        setError(response.message)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let response
        if(register){
           response = await registerUser(email, password)
        }
        else{
           response = await logUserIn(email, password)
        }

        if (!response.ok){
            //add error logic preevnt other code from running
            handleError(response)
        }
        else{
            props.handleLogin()
            props.loadUserCommands()
        }

    }

    const isRegister = () => {
        setRegister(true)
    }
    const notRegister = () => {
        setRegister(false)
    }
    
    return (props.trigger) ? (
        <div id="login-div">
            <div>
                <div id="loginHeader">
                    {register ? <h3 id="title">Register</h3> : <h3 id="title">Login</h3>}
                    <button onClick={props.handleLogin}>x</button>
                </div>
         
                {error ? <p className="error"> {error} </p> : null}
                <form onSubmit={handleSubmit}>
                    <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
                    <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                    <input type="submit" value="Submit" />
                </form>
                <button onClick={isRegister}>Register</button>
                <button onClick={notRegister}>Login</button>
            </div>
        </div>
    ) : "";
}