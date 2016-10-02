var List = React.createClass({

	handleNewButtonClick: function() {
		this.props.handleEdit();
	},

	handleEditTask: function(task) {
		this.props.handleEdit(task);
	},

	handleDeleteTask: function(task) {
		this.props.handleDelete(task);
	},

	createTasks: function() {
		const self = this;
		const tasks = [];
		this.props.tasks.forEach(function(task, i) {
			tasks.push(React.createElement(Task, {
				task: task,
				handleEdit: self.handleEditTask,
				handleDelete: self.handleDeleteTask,
				key: task.id
			}));
		});

		return tasks;
	},

	render: function() {
		return React.createElement("div", { className: "container" },
			React.createElement("h1", null, "To Do List:"),
			React.createElement("div", { className: "row" }, 
				this.createTasks(),
				React.createElement("button", { className: "btn btn-link btn-new-task", onClick: this.handleNewButtonClick },
					React.createElement("span", { className: "glyphicon glyphicon-plus", style: { float: "right" } })
				)
			)
		);
	}

});


