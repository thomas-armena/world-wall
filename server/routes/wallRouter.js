var express = require('express');
var router = express.Router();
var Wall = require('../models/wall');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, newFilename);
    },
});

const upload = multer({ storage });

router.post('/save', function(req, res, next){
    /*
    pass author, collaborators, and wall in order to save wall data
    pass author, collaborators, wall, and url to set url

    */

    if(req.body.author && req.body.collaborators && req.body.items){

        var wallData = {
            author: req.body.author,
            collaborators: req.body.collaborators,
            wall: req.body.items,
        };

        if(req.body.url){
            console.log('setting url')
            Wall.find({ 'url': req.body.url }, (err, walls) => {
                console.log(walls);
                var duplicate = false;
                if(walls){
                    for (var record of walls){
                        if(record.author != wallData.author || record.wall.title != wallData.wall.title){
                            duplicate = true
                            break;
                        }
                    }
                }
                if (duplicate){
                    console.log('duplicate found');
                    var err = new Error('URL is taken.');
                    return next(err);
                } else {
                    console.log('url set');
                    var urlData = { url: req.body.url };
                    Wall.update({ 'wall.title': wallData.wall.title, author: wallData.author }, urlData, { upsert: true }, (err, wall) => {
                        if(err){
                            return next(err);
                        } else {
                            req.session.wall = wall;
                            res.send(wall);
                        }
                    });
                }


            });

        } else {
            console.log('saving wall data')
            Wall.update({ 'wall.title': wallData.wall.title, author: wallData.author }, wallData, { upsert: true }, (err, wall) => {
                if(err){
                    return next(err);
                } else {
                    req.session.wall = wall;
                    res.send(wall);
                }
            });

        }


    }
});


router.post('/load', function(req, res, next){
    /*
    pass author to get all walls
    pass url to get wall of that url
    pass author and wall to get url

    */


    console.log(req.body);
    if(req.body.author && req.body.items){
        Wall.findOne({ 'wall.title': req.body.items.title, author: req.body.author }, function(err,wall){
            res.send(wall.url);
        });
    } else if(req.body.author){
        var walls = Wall.find({ author: req.body.author }, function(err, walls){
            res.send(walls);
        });
    } else if(req.body.url){
        var walls = Wall.find({ url: req.body.url }, function(err, walls){
            res.send(walls);
        });
    }
});



router.post('/imageupload', upload.single('test'), function(req, res, next){
    console.log('image file:')
    console.log(req.file.path);
    res.send(req.file.path);
});

router.post('/imageget', function(req, res, next){
    console.log(path.resolve(__dirname+'/../'+req.body.src));
    //res.send(req.body);
    res.sendFile(path.resolve(__dirname+'/../'+req.body.src));
});

module.exports = router;
