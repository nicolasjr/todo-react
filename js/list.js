var List = React.createClass({

	handleNewButtonClick: function() {
		this.props.edit( { task: "Teste maluco" } );
	},

	render: function() {
		const tasks = [];
		this.props.tasks.forEach(function(task, i) {
			tasks.push(React.createElement(Task, {
				task: task,
				key: task.id
			}));
		});

		return React.createElement("div", null,
				React.createElement("div", { className: "row" }, tasks),
				React.createElement("div", { className: "row"},
					React.createElement("button", { className: "btn btn-link", onClick: this.handleNewButtonClick },
						React.createElement("span", { className: "glyphicon glyphicon-plus", style: { float: "right" } })
					)
				)
			);
	}

});


