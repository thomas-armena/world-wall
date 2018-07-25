var express = require('express');
var router = express.Router();
var Wall = require('../models/wall');

router.post('/save', function(req, res, next){
    if(req.body.author && req.body.collaborators && req.body.items){
        var wallData = {
            author: req.body.author,
            collaborators: req.body.collaborators,
            wall: req.body.items,
        };

        Wall.create(wallData, function(err, wall){
            if(err) {
                return next(err);
            } else {
                req.session.wall = wall;
                res.send(wall);
            }
        });
    }
});

router.post('/load', function(req, res, next){
    console.log(req.body);
    if(req.body.author){
        var walls = Wall.find({ author: req.body.author }, function(err, walls){
            res.send(walls);
        });
    }
});

module.exports = router;
