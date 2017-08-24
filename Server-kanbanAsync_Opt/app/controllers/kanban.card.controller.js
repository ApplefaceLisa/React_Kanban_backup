var Card = require('../models/kanban.card.model');

var list = function(req, res) {
	Card.find(function(err, cards) {
		if (err) {
			res.status(400).json({error: err.message});
		} else {
			res.json(cards);
		}
	});
};

var create = function(req, res) {
	var card = new Card();
	card.title = req.body.title;
	card.description = req.body.description;
	card.status = req.body.status;
	card.priority = req.body.priority;
    card.assignee = req.body.assignee;

	card.save(function(err) {
		if (err) {
			res.status(400).json({error: err.message});
		} else {
			res.status(201).json(card);
		}
	});
};

var read = function(req, res) {
	setTimeout(function() {
		Card.findById(req.params.card_id, function(err, card) {
			if (err) {
				res.status(404).json({error: err.message});
			} else {
				res.json(card);
			}
		});
	}, 3000)
};

var update = function(req, res) {
	Card.findById(req.params.card_id, function(err, card) {
		if (err) {
			res.status(404).json({error: err.message});
		} else {
			if (card !== null) {
				card.title = req.body.title;
				card.description = req.body.description;
				card.status = req.body.status;
				card.priority = req.body.priority;
    			card.assignee = req.body.assignee;

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
				card.remove(function(err) {
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

var removeAll = function(req, res) {
	Card.remove({}, function(err) {
		if (err) {
			res.status(400).json({error: err.message});
		} else {
			res.status(204).json({confirmation: 'success'});
		}
	});
};

module.exports = {
	list: list,
	create: create,
	read: read,
	update: update,
	remove: remove,
	removeAll: removeAll
};