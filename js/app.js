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
	editItem: "editItem"

};

const items = [ { task: "Clean garage", done: true }, { task: "Buy groceries", done: false } ];

var Controller = React.createClass({

	getInitialState: function() {
		return { items: items }
	},

	render: function() {
		return React.createElement("div", { className: "container" },
				React.createElement(List, { items: this.state.items })
			);
	}

});

ReactDOM.render(
    React.createElement(Controller),
    document.getElementById("app")
);
