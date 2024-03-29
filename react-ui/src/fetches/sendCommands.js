const sendCommands = async(commandsArray) => {
    try{
        const response = await fetch('http://localhost:4000/commands', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                commandsArray
            }),
            credentials: 'include'
        })

        const data = await response.json()
        if(!response.ok){
            throw new Error(`http error! status: ${response.status}, message: ${data.message}`) 
        }

        console.log(data.message)

    }catch(err){
        //refactor this to show error message.
        console.log(err)
    }
}

export {sendCommands}