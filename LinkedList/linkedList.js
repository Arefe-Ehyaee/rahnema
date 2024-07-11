class Node{
    constructor(value, next=null){
        this.value = value;
        this.next = next;
    }
    
}

class LinkedList {
    constructor(){
        this.head = null;
    }

    insert(value){
        const newNode = new Node(value, this.head);
        this.head = newNode; 
    }

    size(){
        let count = 0;
        let current = this.head;
        while (current !== null){
            count++;
            current = current.next;
        }
        return count;
    }

    insertList(value){
        const newNode = new Node(value);
        if(this.head === null){
            this.head = newNode;
        }else{
            let current = this.head;
            while (current.next !== null){
                current = current.next;
            }
            current.next = newNode;
        }
         
    }

    at(n){
        let count = 0;
        let current = this.head;
        while(current !== null && count<n){
            count++;
            current = current.next;
        }
        return current.value;
    }

    join(seperator){
        let string = '';
        let current = this.head;
        while(current !== null){
            string = string + current.value;
            if (current.next !== null){
                string = string + seperator;
            }
        }
        return current.value;
    }

    map(f){
        const newList = new LinkedList();
        let current = this.head;
        while (current !== null){
            newList.insertList(f(current.value));
            current = current.next;
        }   
        return newList;  
    }

    filter(f){
        const newList = new LinkedList();
        let current = this.head;
        while (current !== null){
            if(f(current.value)){
                newList.insertList(current.value);
            }
            current = current.next;
        }   
        return newList;  
    }

    find(f){
        const newList = new LinkedList();
        let current = this.head;
        while (current !== null){
            if(f(current.value)){
                return current.value;
            }
        }   
        return null;
    }


}