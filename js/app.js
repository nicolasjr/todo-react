const Screens = {
	/*
	 * ToDo List.
	 */
	list: "list",

	/*
	 * Edit existing ToDo item.
	 */
	edit: "editItem"

};

function generateUUID() {
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

var Controller = React.createClass({

	getInitialState: function() {
		const tasks = [ this.createTask("Create ToDo list with React.js"), this.createTask("Buy pizza (loads of pizza)") ];

		return { view: Screens.list, tasks: tasks };
	},

	createTask: function(taskDescription) {
		return { description: taskDescription, done: false, id: generateUUID() };
	},

	editEntry: function(entry) {
		if (!entry)
			entry = this.createTask();

		this.setState( { view: Screens.edit, task: entry } );
	},

	deleteEntry: function(task) {
		const tasks = this.state.tasks;

		for (var i = 0; i < tasks.length; i++) {
			if (task.id === tasks[i].id) {
				tasks.splice(i, 1);
				break;
			}
		}

		this.setState( { tasks: tasks } );
	},

	closeEdit: function() {
		this.setState( { view: Screens.list } );
	},

	addTask: function(task) {
		const tasks = this.state.tasks;
		
		var exists = false;
		for (var i = 0; i < tasks.length; i++) {
			if (task.id === tasks[i].id) {
				tasks[i] = task;
				exists = true;
				break;
			}
		}
		if (!exists)
			tasks.push(task);

		this.setState( { tasks: tasks } );
	},

	render: function() {
		if (this.state.view === Screens.list)
			return React.createElement(List, { tasks: this.state.tasks, handleEdit: this.editEntry, handleDelete: this.deleteEntry });
		if (this.state.view === Screens.edit)
			return React.createElement(Edit, { task: this.state.task, handleClose: this.closeEdit, addTask: this.addTask } );
	}

});

ReactDOM.render(
    React.createElement(Controller),
    document.getElementById("app")
);


