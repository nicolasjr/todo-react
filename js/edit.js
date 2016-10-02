var Edit = React.createClass({

	componentDidMount: function() {
		this.textAreaValue = this.props.item.task;
	},

	handleChange: function(e) {
		this.textAreaValue = e.target.value;
	},

	handleCreate: function() {
		this.props.addTask(this.textAreaValue);
		this.props.close();
	},

	handleCancel: function() {
		this.props.close();
	},

	render: function() {
		return React.createElement("div", { className: "row" }, 
			React.createElement("textarea", { onChange: this.handleChange, defaultValue: this.textAreaValue } ),
			React.createElement("br", { style: { clear: "both" } }),
			React.createElement("button", { className: "btn btn-link", onClick: this.handleCreate }, "Create"),
			React.createElement("button", { className: "btn btn-link", onClick: this.handleCancel }, "Cancel")
		);
	}

});

