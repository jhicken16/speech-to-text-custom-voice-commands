export default class Node{
    constructor(data){
        this.data = data
        this.next = null
    }

    setNextNode(node){
        if(node instanceof Node || node === null){
            this.next = node
        }
        else{
            throw Error('Next must be instance of Node')
        }
    }

    getNextNode(){
        return this.next
    }
}