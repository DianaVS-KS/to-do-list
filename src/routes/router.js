const express = require('express');
const router = express.Router();

const { ListResources } = require("../resources");
router.use('/todos', ListResources);

module.exports = router;