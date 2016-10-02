var Task = React.createClass({

	getInitialState: function() {
		return { task: this.props.task };
	},

	handleCheckboxClick: function(e)  {
		var t = this.state.task;
		t.done = e.target.checked;
		this.setState( { task: t });
	},

	handleEditClick: function() {
		console.log("edit");
	},

	handleDeleteClick: function() {
		console.log("delete");
	},

	componentDidMount: function() {
		// TODO: add callbacks for edit and delete methods.
	},

	componentWillUnmount: function() {
		// TODO: remove callbacks for edit and delete methods.
	},

	render: function() {

		const textDecoration = this.state.task.done ?  "line-through" : "none";

		return React.createElement("div", { className: "col-md-12 col-sm-12 col-lg-12 col-xs-12" },
			React.createElement("div", { className: "row" },
				
				React.createElement("div", { className: "checkbox-inline" }, 
					React.createElement("label", null, 
						React.createElement("input", { type: "checkbox", value: "", checked: this.state.task.done, onChange: this.handleCheckboxClick })
					)
				),

				React.createElement("p", { style: { display: "inline-block", textDecoration: textDecoration } }, this.state.task.description),
				
				React.createElement("button", { className: "btn btn-link", onClick: this.handleEditClick }, 
					React.createElement("span", { className: "glyphicon glyphicon-pencil" })
				),

				React.createElement("button", { className: "btn btn-link", onClick: this.handleDeleteClick }, 
					React.createElement("span", { className: "glyphicon glyphicon-trash" })
				)
			)
		);
	}

});

