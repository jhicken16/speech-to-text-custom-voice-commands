export  const commandFunction = {
    deleteWord(set, indexStartCommand, indexEndCommand, charToDeleteUpTo){
        set(prev => {
            let position = indexStartCommand - 2
            while(prev[position] !== charToDeleteUpTo){
                position--
            }
            position--

            const partBefore = prev.subString(0, position)
            const partAfter = prev.subString(indexEndCommand+1, prev.length)

            return partBefore + partAfter
        })
    }
}