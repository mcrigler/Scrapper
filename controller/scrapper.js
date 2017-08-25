// require packages and models
var cheerio = require('cheerio');
var request = require('request');
var Article = require('../models/articles');

// set the webpage
var website = 'https://www.tmz.com';

//scrape the headline and links
function scrapePage(callback) {
	request(website, function(error, response, body) {
		if (error) console.log("scraping error", error);

		var $ = cheerio.load(body)

		$('h1').each(function(i, element) {
			var title = $(this).text().trim();
			var link = $(element).parent().attr("href");
			var nextArticle = new Article({
				title: title,
				link: link
				});

			
			nextArticle.save(function(error) {
				if (error) console.log("couldn't save article!", error);
			}); 
		}); 
		callback();
	}); 
} 

// export the scraping
exports.scrapePage = scrapePage;