var mongoose = require('mongoose');

var cardSchema = new mongoose.Schema({
	title: String,
	description: String,
	priority: String,
    assignee: String,
	status: String,
	tasks: [
		{
			name: String,
			done: Boolean
		}
	]
});

cardSchema.methods.addTask = function(name) {
	this.tasks.push({
		name: name,
		done: false
	});
};

cardSchema.methods.updateTask = function(taskId, done) {
	var task = this.tasks.id(taskId);
	task.done = done;
}

cardSchema.methods.removeTask = function(taskId) {
	this.tasks.id(taskId).remove();
}

module.exports = mongoose.model('Card', cardSchema);