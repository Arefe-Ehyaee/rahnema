interface Task {
    id: number;
    status: boolean;
    title: string,
}

class ToDoList{
    Tasks: Task[] = [];

    addNewTask(task : Task){
        this.Tasks.push(task);
    }

    showAllTasks(){
        return this.Tasks;
    }

    filterById(id : number){
        return this.Tasks = this.Tasks.filter((task) => task.id == id)
    }

    filterBytitle(title : string): Task[] {
        return this.Tasks = this.Tasks.filter((task) => task.title == title);
    }

    filterByStatus(id : number): Task[]{
        return this.Tasks = this.Tasks.filter((task) => task.id == id);
    }

    removeAllTasks(){
        this.Tasks = [];
    }

    TickTaskById(id: number){ //done or not
        this.Tasks.filter( task => task.id === id).map(task => task.status= true);
    }

    UnTickTaskById(id: number){ //done or not
        this.Tasks.filter( task => task.id === id).map(task => task.status= false);
    }
}


const todoList = new ToDoList();


const task1: Task = {
  id: 1,
  title: 'shopping',
  status: false
};

const task2: Task = {
  id: 2,
  title: 'home works',
  status: true
};

const task3: Task = {
  id: 1,
  title: 'cooking',
  status: false
};


todoList.addNewTask(task1);
todoList.addNewTask(task2);
todoList.addNewTask(task3);
const show = todoList.showAllTasks();
console.log(show);
const tickTask2 = todoList.TickTaskById(2);