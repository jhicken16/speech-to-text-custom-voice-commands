import { useState } from 'react'
import { logUserIn, registerUser } from '../../fetches/logAndRegister'

export default function Login(props){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [register, setRegister] = useState(false)
    

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(register){
            registerUser(email, password)
        }
        else{
            logUserIn(email, password)
        }
        props.handleLogin()
    }

    const isRegister = () => {
        setRegister(true)
    }
    const notRegister = () => {
        setRegister(false)
    }
    
    return (props.trigger) ? (
        <div>
            {register ? 'Register' : 'Login'}
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                <input type="submit" value="Submit" />
            </form>
            <button onClick={isRegister}>Register</button>
            <button onClick={notRegister}>Login</button>
        </div>
    ) : "";
}