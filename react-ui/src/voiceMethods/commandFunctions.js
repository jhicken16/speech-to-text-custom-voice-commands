
/*
    This function are going to be interaction with the test useState. So they will be used in the set state function.
    therefor function should return the hole state that has been changed. 
*/


function deleteMethod(frontIndex, backIndex, to, text){
    
    //to skip space that is before command word.
    frontIndex -= 2
    
    // Make sure command was not the first word
    if(frontIndex < 1){
        return text
    }

    for(frontIndex; frontIndex > 0; frontIndex--){
        if(text[frontIndex] === to){
            
            const beforeCommand = text.substring(0, frontIndex)
            
            const afterCommand = text.substring(backIndex)
            
            return beforeCommand + afterCommand
        }
    }

    // is set char was not found return text. Maybe return text with out command word.
    return text

}

function punctuationMethod(frontIndex, backIndex, to, text){

    if(frontIndex < 1){
        return text
    }

    const beforeCommand = text.substring(0, frontIndex)

    const afterCommand = text.substring(backIndex)

    return beforeCommand + to + afterCommand    
}

export { deleteMethod, punctuationMethod }