var ToDoList = /** @class */ (function () {
    function ToDoList() {
        this.Tasks = [];
    }
    ToDoList.prototype.addNewTask = function (task) {
        this.Tasks.push(task);
    };
    ToDoList.prototype.showAllTasks = function () {
        return this.Tasks;
    };
    ToDoList.prototype.filterById = function (id) {
        return this.Tasks = this.Tasks.filter(function (task) { return task.id == id; });
    };
    ToDoList.prototype.filterBytitle = function (title) {
        return this.Tasks = this.Tasks.filter(function (task) { return task.title == title; });
    };
    ToDoList.prototype.filterByStatus = function (id) {
        return this.Tasks = this.Tasks.filter(function (task) { return task.id == id; });
    };
    ToDoList.prototype.removeAllTasks = function () {
        this.Tasks = [];
    };
    ToDoList.prototype.TickTaskById = function (id) {
        this.Tasks.filter(function (task) { return task.id === id; }).map(function (task) { return task.status = true; });
    };
    ToDoList.prototype.UnTickTaskById = function (id) {
        this.Tasks.filter(function (task) { return task.id === id; }).map(function (task) { return task.status = false; });
    };
    return ToDoList;
}());
var todoList = new ToDoList();
var task1 = {
    id: 1,
    title: 'shopping',
    status: false
};
var task2 = {
    id: 2,
    title: 'home works',
    status: true
};
var task3 = {
    id: 1,
    title: 'cooking',
    status: false
};
todoList.addNewTask(task1);
todoList.addNewTask(task2);
todoList.addNewTask(task3);
var show = todoList.showAllTasks();
console.log(show);
var tickTask2 = todoList.TickTaskById(2);
