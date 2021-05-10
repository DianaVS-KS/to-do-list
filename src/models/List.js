const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const p = path.join(path.dirname(require.main.filename), 'data', 'todos.json');

module.exports = class List {
    constructor(data) {
        const { todo } = data;
        this.id = uuid.v4();
        this.todo = todo;
    }

    getId() {
        return this.id;
    }

    save() {
        // We read the file everytime we need to modify it
        fs.readFile(p, (err, data) => {
        let toDos = [];
        if (!err) {
            toDos = JSON.parse(data);
        }
        toDos.push(this);
        // Write the file
        fs.writeFile(p, JSON.stringify(toDos), (err) => console.log(err));
        });
    }

    static update(toDos) {
        fs.writeFile(p, JSON.stringify(toDos), (err) => console.log(err));
    }

    static readAll(cb){
        fs.readFile(p, (err, data) => {
            if (err) res.status(500).json({ err });
            let toDos = [];
            toDos = JSON.parse(data);
            cb(toDos);
        });
    }
};