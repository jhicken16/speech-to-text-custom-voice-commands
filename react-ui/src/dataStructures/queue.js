import Node from "./Node"

export default class Queue{
    constructor(){
        this.head = null
        this.queue = 0
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

            return temp
        }
    }

    addToQueue(data){
        if(this.head === null){
            this.head = new Node(data)
            return this.head
        }
        else{
            let current = this.head
            while(current.next !== null){
                current = current.getNextNode()
            }
            const node = new Node(data)
            current.setNextNode(node)
            return node


        }
    }
}