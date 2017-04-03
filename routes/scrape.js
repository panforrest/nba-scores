var express = require('express');
var router = express.Router();
var superagent = require('superagent')

/* GET users listing. */
router.get('/', function(req, res, next) {

	var url = 'http://www.basketball-reference.com/boxscores/'

	var query = {
		month: 2,
		day: 2,
		year: 2017
	}

	superagent
	.get(url)
	.query(query)
	.end(function(err, response){
		if (err){
			res.json({
				confirmation: 'fail',
				message: err
			})
			return
		}

		res.send(response.text)
	})

    // res.json({

    // 	confirmation: 'success'

    // })


});

module.exports = router;