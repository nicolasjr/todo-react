var List = React.createClass({

	render: function() {
		const items = [];
		this.props.items.forEach(function(item, i) {
			items.push(React.createElement(Item, {
				task: item.task,
				done: item.done,
				key: i
			}));
		});

		return React.createElement("div", { className: "row" }, items);
	}

});


