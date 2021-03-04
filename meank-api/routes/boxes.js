var express = require('express');
var router  = express.Router();
var Box     = require('../models/Box')


// -------------------------------------------------------------------------
//
// List
//
// -------------------------------------------------------------------------
router.get ('/', (req, res, next) => {
 	Box.find ({}, (err, boxes) => {
 		if (err) return res.status(500).send (err);
		res.status(200).json (boxes);
 	});
});


// -------------------------------------------------------------------------
//
// by ID
//
// -------------------------------------------------------------------------
router.get ('/:id', (req, res, next) => {
 	Box.findById (req.params.id, (err, boxes) => {
 		if (err) return res.status(500).send (err);
		res.status(200).json (boxes);
 	});
});

// -------------------------------------------------------------------------
//
// test force
//
// -------------------------------------------------------------------------
router.get ('/force/add', (req, res, next) => {
	let box = new Box ({
		title       : 'first box',
		description : 'first box to be added'
	});
	box.save (err => {
		if (err) return res.status(500).send (err);
		res.status(200).json ({
			message: 'Box was placed in the warehouse'
		});
	});
});

// -------------------------------------------------------------------------
//
// Post
//
// -------------------------------------------------------------------------
router.post ('/', (req, res, next) => {
	let box = new Box ({
		title       : req.body.title,
		description : req.body.description
	});
	Box.save (err => {
		if (err) return res.status(500).send (err);
		res.status(200).json ({
			message: 'Box was placed in the warehouse'
		});
	});
});

module.exports = router;
