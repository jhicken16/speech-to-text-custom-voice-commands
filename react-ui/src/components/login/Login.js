import { useState } from 'react'

export default function Login(props){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your form submission logic here
    }
    
    return (props.trigger) ? (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    ) : "";
}