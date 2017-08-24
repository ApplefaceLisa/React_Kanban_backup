var express = require('express');
var router = express.Router();

require('./routes/kanban.routes')(router);

module.exports = router;