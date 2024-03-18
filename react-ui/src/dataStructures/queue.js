import Node from "./Node"

export default class Queue{
    constructor(){
        this.head = null
        this.length = 0
    }

    removeHead(){
        if(this.head){
            const temp = this.head
            if(this.head.next){
                this.head = this.head.next
            }
            else{
                this.head = null
            }
            this.length--
            return temp
        }
    }

    addToQueue(data){
        if(this.head === null){
            this.head = new Node(data)
            this.length++
            return this.head
        }
        else{
            let current = this.head
            while(current.next !== null){
                current = current.getNextNode()
            }
            const node = new Node(data)
            current.setNextNode(node)
            this.length++
            return node


        }
    }

    //changes the indexes by amount that removed from text to keep indexes relevant needs to be updated when head is new.
    changeIndexes(amount){
        this.head.data.firstLetterIndex += amount
        this.head.data.lastLetterIndex += amount
    }
}