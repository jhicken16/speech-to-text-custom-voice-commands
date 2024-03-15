export default function punctuationForIndexShift(text, frontLetter, command){

    let firstLetterCache = null
    

    for (let y = frontLetter; y < text.length; y++){
        
        if (text[y] === command[0]){

            firstLetterCache = y
           
            for ( let x = 1; x < command.length; x++){

                if (command[x] !== text[x + firstLetterCache]){

                    break;
                }

                if (x === command.length - 1){

                    //return the difference between the the old index and new index
                    return firstLetterCache - frontLetter
                }
            }
        }
    }

    //if not found
    return 0
}

