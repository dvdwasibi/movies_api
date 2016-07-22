var restify = require('restify');
var Showtimes = require('showtimes');

/*
 * Get current movies that are currently playing
 */
function getCurrentMovies(req, res, next) {
  var showtimesApi = new Showtimes({});
  showtimesApi.getMovies((error, movies) => {
    //TODO(dvdwasibi) Error Handling
    res.send(movies);
    next();
  });
};

var server = restify.createServer();
server.get('/movies', getCurrentMovies);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
