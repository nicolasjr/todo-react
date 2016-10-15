var Task = React.createClass({

	getInitialState: function() {
		return { task: this.props.task };
	},

	handleCheckboxClick: function(e)  {
		var t = this.state.task;
		t.done = e.target.checked;
		this.setState( { task: t });
		this.props.handleUpdate();
	},

	handleEditClick: function() {
		this.props.handleEdit(this.state.task);
	},

	handleDeleteClick: function() {
		this.props.handleDelete(this.state.task);
	},

	render: function() {

		const textDecoration = this.state.task.done ?  "line-through" : "none";

		return React.createElement("div", { className: "task" },
			React.createElement("div", { className: "row" },
				
				React.createElement("div", { className: "checkbox-inline" }, 
					React.createElement("label", null, 
						React.createElement("input", { type: "checkbox", value: "", checked: this.state.task.done, onChange: this.handleCheckboxClick })
					)
				),

				React.createElement("p", { style: { display: "inline-block", textDecoration: textDecoration } }, this.state.task.description),

				React.createElement("button", { className: "btn btn-link btn-task", onClick: this.handleDeleteClick }, 
					React.createElement("span", { className: "glyphicon glyphicon-trash" })
				),
				
				React.createElement("button", { className: "btn btn-link btn-task", onClick: this.handleEditClick }, 
					React.createElement("span", { className: "glyphicon glyphicon-pencil" })
				)
			)
		);
	}

});

