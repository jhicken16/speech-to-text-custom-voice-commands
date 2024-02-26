const loadCommands = async () => {
    try{
        const response = await fetch('http://localhost:4000/commands', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include'
        })

        const data = await response.json()
        if(!response.ok){
            throw new Error(`http error! status: ${response.status}, message: ${data.message}`)
        }

        return data
    }
    catch(err){
        console.log(err)
    }
}

export { loadCommands }