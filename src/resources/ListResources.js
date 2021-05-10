const express = require("express");
const ListResources = express.Router();

const { ListController } = require('../controllers');

ListResources.get('/', ListController.readAll);
ListResources.post('/', ListController.createToDo);
ListResources.put('/:id', ListController.updateToDo);
ListResources.delete('/:id', ListController.deleteToDo);

module.exports = ListResources;