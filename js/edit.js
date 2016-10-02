var Edit = React.createClass({

	componentDidMount: function() {
		this.textAreaValue = this.props.task.description;
	},

	handleChange: function(e) {
		this.textAreaValue = e.target.value;
	},

	handleCreate: function() {
		if (!this.textAreaValue) {
			return;
		}
		this.props.task.description = this.textAreaValue;

		this.props.addTask(this.props.task);
		this.props.handleClose();
	},

	handleCancel: function() {
		this.props.handleClose();
	},

	render: function() {
		return React.createElement("div", { className: "container" },
			React.createElement("div", { className: "row" }, 
				React.createElement("h1", null, "Task"),
				React.createElement("textarea", { onChange: this.handleChange, defaultValue: this.props.task.description } ),
				React.createElement("br", { style: { clear: "both" } }),
				React.createElement("button", { className: "btn btn-link", onClick: this.handleCreate }, "Save"),
				React.createElement("button", { className: "btn btn-link", onClick: this.handleCancel }, "Cancel")
			)
		);
	}

});

