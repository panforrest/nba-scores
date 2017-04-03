var express = require('express');
var router = express.Router();
var superagent = require('superagent')
var cheerio = require('cheerio')

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

		$ = cheerio.load(response.text)
		$('tr').each(function(i, element){   //$('<tr>').each(function(i, element){
            var className = element.attribs.class
                // console.log('CLASS= '+className)
                if (className = 'winner') {     //if (element = 'winner') {
                	console.log('CLASS= '+className)
                }

			// var attribs = element.attribs
			// if (attribs != null){
			// 	console.log()
			// }
		})

		res.send(response.text)
	})

    // res.json({

    // 	confirmation: 'success'

    // })


});

module.exports = router;