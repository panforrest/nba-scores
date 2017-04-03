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

		// WINNER:
		//  <tr class="winner">
		//	  <td>
		//	    <a href="/teams/ATL/2017.html">Atlanta</a>
		//    </td>
		//    <td class="right">113</td>
		//    <td class="right gamelink">
		//      <a href="/boxscores/201702020HOU.html">Final</a>
		//	  </td>
		//	</tr>

		$ = cheerio.load(response.text)
		$('tr').each(function(i, element){   //$('<tr>').each(function(i, element){
            var className = element.attribs.class
                // console.log('CLASS= '+className)
                if (className == 'winner') {     //if (element = 'winner') {
                	console.log('CLASS= '+className)
                	// console.log('CHILDREN: '+element.children.length)
                	var td = element.children[0]
                	console.log('TD TAG: '+td)
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