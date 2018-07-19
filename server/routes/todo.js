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

    let todo = new Todo( {
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

module.exports = router;
