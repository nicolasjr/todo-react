var List = React.createClass({

	getInitialState: function() {
		return { filter: this.props.filter.all };
	},

	handleNewButtonClick: function() {
		this.props.handleEdit();
	},

	handleEditTask: function(task) {
		this.props.handleEdit(task);
	},

	handleDeleteTask: function(task) {
		this.props.handleDelete(task);
	},

	handleSortByToDoTask: function() {
		this.setState( { filter: this.props.filter.todo } );
	},

	handleSortByDoneTask: function() {
		this.setState( { filter: this.props.filter.done } );
	},

	handleSortAllTasks: function() {
		this.setState( { filter: this.props.filter.all } );
	},

	shouldDisplayTask: function(task) {
		return this.state.filter === this.props.filter.all 
			|| (task.done && this.state.filter === this.props.filter.done) 
			|| (!task.done && this.state.filter === this.props.filter.todo);
	},

	createTasks: function() {
		const self = this;
		const tasks = [];
		this.props.tasks.forEach(function(task, i) {

			if (self.shouldDisplayTask(task)) {
				tasks.push(React.createElement(Task, {
					task: task,
					handleEdit: self.handleEditTask,
					handleDelete: self.handleDeleteTask,
					key: task.id
				}));
			}
		});

		return tasks;
	},

	render: function() {
		return React.createElement("div", { className: "container" },
			React.createElement("h1", null, Strings.listScreenHeader),
			React.createElement("a", { className: "sort", onClick: this.handleSortByDoneTask },
				React.createElement("p", null, Strings.sortTypeDone)
			),
			React.createElement("a", { className: "sort", onClick: this.handleSortByToDoTask },
				React.createElement("p", null, Strings.sortTypeToDo)
			),
			React.createElement("a", { className: "sort", onClick: this.handleSortAllTasks },
				React.createElement("p", null, Strings.sortTypeAll)
			),
			React.createElement("div", { className: "row" }, 
				this.createTasks(),
				React.createElement("button", { className: "btn btn-link btn-new-task", onClick: this.handleNewButtonClick },
					React.createElement("span", { className: "glyphicon glyphicon-plus", style: { float: "right" } })
				)
			)
		);
	}

});

List.defaultProps = {
	filter: {
		all: "All",

		todo: "To Do",

		done: "Done"
	}
}

