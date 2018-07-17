const express  = require('express');
const Todo = require('../models/todo');

const router = express.Router();

router.get('/', (req, res) => {
    Todo.find()
        .exec((err, todos) => {
            if(err) throw err;
            res.json(todos);
        });
});

/*
    CREATE TODOS
    BODY SAMPLE : { "content" : "todocontent" }
    ERROR CODES:
        1: BAD CONTENT
 */
router.post('/', (req, res) => {

    // if(!regexp.test(req.body.content)) {
    //     return res.status(400).json({
    //         error: "BAD CONTENT",
    //         code: 1
    //     });
    // }

    console.log("api", req.body);
    let todo = new Todo( {
        id: String(Date.now()),
        content: req.body.content
    });

    todo.save(function(err){
        if(err) throw (err);
        res.json({success: true});
    });
});

module.exports = router;
