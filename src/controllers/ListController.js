const { List } = require('../models');

const readAll = (req, res) => {
    List.readAll((toDos) => {
        res.send(toDos);
    });
};

const createToDo = (req, res) => {    
    const { body } = req;
    const newToDo = new List(body);
    List.readAll((toDos) => {
        const repeated = toDos.filter( toDo => {
            if(toDo.todo === newToDo.todo){
                return toDo;
            }
        })
        if(repeated.length > 0){
            return res.status(409).send({
                message: 'This to do already exists, insert a new one',
            });
        }
        newToDo.save();
        res.status(201).send({
            message: 'New to do added!',
            id: newToDo.getId(),
        });
    });    
};

const updateToDo = (req, res) => {
    const { params: { id }, body } = req;
    List.readAll((toDos) => {
      const toDo = toDos.find(ent => ent.id === id);
      if(toDo) {
        const repeated = toDos.filter(t => {
            if(t.todo === body.todo){
                return t;
            }
        })
        if(repeated.length > 0){
            return res.status(409).send({
                message: 'This to do already exists, insert a new one',
            });
        }
        Object.assign(toDo, body);
        List.update(toDos);
        res.send({
          message: 'To do successfully updated!',
        });
      } else {
        res.status(404).send({
          message: 'To do not found :(',
        });
      }
    });
};

const deleteToDo = (req, res) => {
    const { id } = req.params;
  // Read all
  List.readAll((toDos) => {
    // Filter by id
    const toDoId = toDos.findIndex(ent => ent.id === id);

    if (toDoId !== -1) {
      toDos.splice(toDoId, 1);
      List.update(toDos);
      res.send({
        message: 'To do successfully deleted!',
      });
    }
    else {
      res.status(404).send({
        message: 'To do not found :(',
      });
    }
  });
};

module.exports = {
    readAll,
    createToDo,
    updateToDo,
    deleteToDo,
};