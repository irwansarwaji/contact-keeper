const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public

/**
 * The check on itself doesnt do anything, it just set the checks to the body.
 */
router.post(
	'/',
	[
		check('name', 'Please add name')
			.not()
			.isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 })
	],
	async (req, res) => {
		// res.send('Register a user');
		// res.send(req.body);
		const error = validationResult(req);
		//check if error is empty
		if (!error.isEmpty()) {
			return res.status(400).json({ errors: error.array() });
		}

		const { name, email, password } = req.body;

		try {
			// if there is an user with that email
			let user = await User.findOne({ email });

			if(user){
				return res.status(400).json({msg: 'User already exists'});
			}

			// created instance of user
			user = new User({
				name,
				email,
				password
			});

			//bcrypt
			//10 is default, determines how secure the salt is
			const salt = await bcrypt.genSalt(10);

			//take that salt to hash the password
			user.password = await bcrypt.hash(password, salt);

			//save to database
			await user.save();

			res.send('User saved');
			
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
			
		}
		// res.send('passed');
		// console.log(error);
	}
);

module.exports = router;
