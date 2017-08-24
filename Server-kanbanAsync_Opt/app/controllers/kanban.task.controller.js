var Card = require('../models/kanban.card.model');

var create = function(req, res) {
	Card.findById(req.params.card_id, function(err, card) {
		if (err) {
			res.status(404).json({error: err.message});
		} else {
			if (card !== null) {
				card.addTask(req.body.taskname);

				card.save(function(err) {
					if (err) {
						res.status(400).json({error: err.message});
					} else {
						res.status(201).json(card);
					}
				});
			} else {
				res.status(404).json({error: 'card not found'});
			}
		}
	});
};

var update = function(req, res) {
	Card.findById(req.params.card_id, function(err, card) {
		if (err) {
			res.status(404).json({error: err.message});
		} else {
			if (card !== null) {
				card.updateTask(req.params.task_id,
								req.body.taskstatus);

				card.save(function(err) {
					if (err) {
						res.status(400).json({error: err.message});
					} else {
						res.json(card);
					}
				});
			} else {
				res.status(404).json({error: 'card not found'});
			}
		}
	});
};

var remove = function(req, res) {
	Card.findById(req.params.card_id, function(err, card) {
		if (err) {
			res.status(404).json({error: err.message});
		} else {
			if (card !== null) {
				card.removeTask(req.params.task_id);

				card.save(function(err) {
					if (err) {
						res.status(400).json({error: err.message});
					} else {
						res.status(204).json({confirmation: 'success'});
					}
				});
			} else {
				res.status(404).json({error: 'card not found'});
			}
		}
	});
};

module.exports = {
	create: create,
	update: update,
	remove: remove
};