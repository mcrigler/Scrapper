// dependencies
var express = require('express');
var router = express.Router();
var Article = require('../models/articles');
var Note = require('../models/notes');
var scrapper = require('../controller/scrapper');

// home page route
router.get('/', function(request, response) {

	Article.find({}, function(error, data) {
		if (error) console.log("error getting articles", error);
		response.render('index', {title: "scrapper", articles: data});
	}); 
}); 

// scrapper route
router.get('/scrape', function(request, response) {
	scrapper.scrapePage(function() {
		response.redirect('/');
	});
});

// get notes route
router.get('/notes/:id', function(request, response) {
	Article.findOne({_id: request.params.id})
		.populate("notes")
		.exec(function(error, doc) {
			if (error) console.log("error getting notes", error);

			response.send(doc.notes);
			// console.log(doc.note);
		});
});

// post notes route
router.post('/notes/:id', function(request, response) {

	var newNote = new Note(request.body);

	newNote.save(function(error, doc) {
		Article.findOneAndUpdate(
			{_id: request.params.id},
			{$push: {notes: doc._id}},
			{new: true},
			function(err, anotherDoc) {
				if (error) console.log("caught an error", error);
				response.send(anotherDoc);
			});
	});
});

// delete note route
router.post('/deleteNotes/:id', function(request, response) {
	console.log(request.params.id);
	
	Note.findByIdAndRemove({_id: request.params.id}, function(error) {
		if (error) console.log('error deleting note', error);
		response.send();
	});
})


// This will get the articles we scraped from the mongoDB
router.get("/articles", function(req, res) {
  // Grab every doc in the Articles array
  Article.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});

// Grab an article by it's ObjectId
router.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  Article.findOne({ "_id": req.params.id })
  // ..and populate all of the notes associated with it
  .populate("note")
  // now, execute our query
  .exec(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});


// Create a new note or replace an existing note
router.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  var newNote = new Note(req.body);

  // And save the new note the db
  newNote.save(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise
    else {
      // Use the article id to find and update it's note
      Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
      // Execute the above query
      .exec(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        else {
          // Or send the document to the browser
          res.send(doc);
        }
      });
    }
  });
});

router.delete("/delete/:id", function (req, res) {

  Article.findById(req.params.id, function(err, article) {
      Note.findByIdAndRemove(article.note, function(err,note){
        Article.findOneAndUpdate({ "_id": req.params.id }, { "note": "" })
          .exec(function(err,doc) {
          console.log('\n\ndelete route - article' + article + "\n");
          console.log('\n');
          res.send(article);
          });
      });
  });

});



module.exports = router;