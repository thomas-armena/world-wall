var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.post('/', function(req, res, next){
	if(req.body.email &&
		req.body.username &&
		req.body.password &&
		req.body.passwordConf) {
		
		var userData = {
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
			passwordConf: req.body.passwordConf
		}

		//Insert data in database
		User.create(userData, function(err, user){
			if (err) {
				return next(err);
			} else {
				req.session.userId = user._id;
				res.send(user);
			}
		});

	} else if (req.body.logemail && req.body.logpassword) {
		User.authenticate(req.body.logemail, req.body.logpassword, function(error, user) {
			if( error || !user) {
				var err = new Error('Wrong Email or Password');
				err.status = 401;
				return next(err);
			} else {
				req.session.userId = user._id;
				res.send(user);
			}
		});
	}
	
});

router.get('/profile', function(req, res, next) {
	User.findById(req.session.userId)
		.exec(function(error, user){
			if(error){
				return next(error);
			} else {
				if (user === null) {
					var err = new Error('Not Authorized.'); err.status = 400;
					return next(err);
				} else {
					return res.send(user);
				}
			}
		});
});

router.get('/logout', function(req, res, next) {
	if (req.session){
		req.session.destroy(function(err) {
			if (err){
				return next(err);
			} else {
				res.send('successful');
			}
		})
	}
});

module.exports = router;
