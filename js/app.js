const Screens = {
	/*
	 * ToDo List.
	 */
	list: "list",

	/*
	 * To Do item.
	 */
	item: "item",

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
		const tasks = [ { description: "Clean garage", done: false, id: generateUUID() }, { description: "Buy groceries", done: false, id: generateUUID() } ];

		return { view: Screens.list, tasks: tasks };
	},

	editEntry: function(entry) {
		this.setState( { view: Screens.edit, task: entry } );
	},

	closeEdit: function() {
		this.setState( { view: Screens.list } );
	},

	createTask: function(taskDescription) {
		return { description: taskDescription, done: false, id: generateUUID() };
	},

	addTask: function(taskDescription) {
		const tasks = this.state.tasks;
		tasks.push(this.createTask(taskDescription));

		this.setState( { tasks: tasks } );
	},

	render: function() {
		if (this.state.view === Screens.list)
			return React.createElement(List, { tasks: this.state.tasks, edit: this.editEntry });
		if (this.state.view === Screens.edit)
			return React.createElement(Edit, { item: this.state.task, close: this.closeEdit, addTask: this.addTask } );
	}

});

ReactDOM.render(
    React.createElement(Controller),
    document.getElementById("app")
);
