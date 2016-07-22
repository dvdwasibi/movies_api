var restify = require('restify');
var Showtimes = require('showtimes');

/*
 * Get current movies that are currently playing
 */
function getCurrentMovies(req, res, next) {
  var showtimesApi = new Showtimes(req.params.address, {});
  showtimesApi.getMovies((error, movies) => {
    if(error) {
      next(new Error());
    } else {
      res.send(movies);
      next();
    }
  });
};

function getNearbyTheaters(req, res, next) {
  var showtimesApi = new Showtimes(req.params.address, {});
  showtimesApi.getTheaters((error, theaters) => {
    if(error) {
      next(new Error());
    } else {
      res.send(theaters);
      next();
    }
  });
};

var server = restify.createServer();
server.get('/movies/:address', getCurrentMovies);
server.get('/theaters/:address', getNearbyTheaters);

server.listen(process.env.PORT || 8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
