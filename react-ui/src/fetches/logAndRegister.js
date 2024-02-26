const logUserIn = async (email, password) => {
    try{
        const response = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            }),
            credentials: 'include'
        })

        const data = await response.json()
        if(!response){
            throw new Error(`http error! status: ${response.status}, message: ${data.message}`)
        }
        return data
    }
    catch(err){
        console.log(err)
    }
}

const registerUser = async (email, password) =>{
    try{
        const response = await fetch('http://localhost:4000/auth/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await response.json()
        if(!response){
            throw new Error(`http error! status: ${response.status}, message: ${data.message}`)
        }
        return data
    }
    catch(err){
        console.log(err)
    }
}


export { logUserIn, registerUser }