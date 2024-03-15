import Login from '../login/Login'
import { useState } from 'react'
import './nav.css'

export default function Nav({ loadUserCommands }){
    
    const [loginPopUp, setLoginPopUp] = useState(false)

    function handleLogin(){
        setLoginPopUp(prev => !prev)  
    }

    return (
        <>
            <div id="nav">
                <h1 id="title">Speech To Text</h1>
                <button id="login-btn" onClick={handleLogin}>Login</button>
                
            </div>
            <Login trigger={ loginPopUp } loadUserCommands={ loadUserCommands } />
        </>
    )
}