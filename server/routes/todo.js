const express  = require('express');
const Todo = require('../models/todo');

const router = express.Router();

/*
    READ TODOS : GET /api/todos
 */
router.get('/', (req, res) => {
    Todo.find()
        .exec((err, todos) => {
            if(err) throw err;
            res.json(todos);
        });
});

/*
    CREATE TODOS : POST /api/todos
    BODY SAMPLE : { "content" : "todocontent" }
    ERROR CODES:
        1: BAD CONTENT
 */
router.post('/', (req, res) => {
    let regexp = /[\#$<>\=_]/gi;

    if(regexp.test(req.body.content)) {
        console.log("BAD");
        return res.status(400).json({
            error: "BAD CONTENT",
            code: 1
        });
    }

    const todo = new Todo( {
        id: String(Date.now()),
        content: req.body.content
    });

    todo.save(function(err){
        if(err) throw (err);
        res.json({
            success: true,
            todo: todo
        });
    });
});

/*
    DELETE TODOS: DELETE /api/todos/:id
    ERROR CODES:
        1: NO RESOURCE
 */
router.delete('/:id', (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(err) throw err;

        if(!todo) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 1
            })
        }

        Todo.remove({ _id: req.params.id }, err => {
            if(err) throw err;
            res.json({
                success: true,
                todo: todo
            });
        });
    });
});

module.exports = router;
