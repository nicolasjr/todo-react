var Item = React.createClass({

	getInitialState: function() {
		return { task: this.props.task, done: this.props.done };
	},

	handleCheckboxClick: function(e)  {
		this.setState( {done: e.target.checked});
	},

	handleEditClick: function() {
		console.log("edit");
	},

	handleDeleteClick: function() {
		console.log("delete");
	},

	render: function() {
		const textDecoration = this.state.done ?  "line-through" : "none";

		return React.createElement("div", { className: "col-md-12 col-sm-12 col-lg-12 col-xs-12" },
			React.createElement("div", { className: "row" },
				
				React.createElement("div", { className: "checkbox-inline" }, 
					React.createElement("label", null, 
						React.createElement("input", { type: "checkbox", value: "", checked: this.state.done, onChange: this.handleCheckboxClick })
					)
				),

				React.createElement("p", { style: { display: "inline-block", textDecoration: textDecoration } }, this.state.task),
				
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

