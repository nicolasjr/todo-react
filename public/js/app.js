var Controller = React.createClass({

	handleData: function(data) {
		this.setState( { tasks: data } );
	},

	componentDidMount: function() {
		$.get('/tasks', this.handleData);
	},

	getInitialState: function() {
		return { view: this.props.screen.list, tasks: [] };
	},

	createTask: function(taskDescription) {
		return { description: taskDescription };
	},

	editEntry: function(entry) {
		if (!entry)
			entry = this.createTask();

		this.setState( { view: this.props.screen.edit, task: entry } );
	},

	deleteEntry: function(task) {
		$.post('/delete-task', { id: task.id }, this.handleData);
	},

	closeEdit: function() {
		this.setState( { view: this.props.screen.list } );
	},

	addTask: function(task) {
		$.post('/new-task', { content: JSON.stringify(task) }, this.handleData);
	},

	render: function() {
		if (this.state.view === this.props.screen.list)
			return React.createElement(List, { tasks: this.state.tasks, handleEdit: this.editEntry, handleDelete: this.deleteEntry });
		if (this.state.view === this.props.screen.edit)
			return React.createElement(Edit, { task: this.state.task, handleClose: this.closeEdit, addTask: this.addTask } );
	}
});

Controller.defaultProps = {
	screen: {
		/*
		 * ToDo List.
		 */
		list: "list",

		/*
		 * Edit existing/new ToDo item.
		 */
		edit: "editItem"

	}
};

ReactDOM.render(
    React.createElement(Controller),
    document.getElementById("app")
);


