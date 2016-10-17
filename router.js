var Profile = require('./profile.js');
var renderer = require('./renderer.js');
var querystring = require('querystring');

var commonHeaders = {'Content-Type': 'text/html'};

//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  //if url == '/' && GET
  if(request.url === '/') {
    if(request.method.toLowerCase() === 'get') {
      //show search
      response.writeHead(200, commonHeaders);
      renderer.view('header', {}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    } else {
      //if url == '/' && POST

      // get post data from body
      request.on('data', function(postBody) {
        // extract the username
        var query = querystring.parse(postBody.toString());
        response.writeHead(303, {'Location': '/' + query.username});
        response.end();
        //redirect to /:username
      });
    }
  }
}

//Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
  //if url == '/....'
  var userName = request.url.replace('/', '');
  if(userName.length > 1) {
    response.writeHead(200, commonHeaders);
    renderer.view('header', {}, response);

    //get json from Treehouse
    var studentProfile = new Profile(userName);

    //on 'end'
    studentProfile.on('end', function(profileJSON) {
      //show profile

      // store the values which we need
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        userName: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        jsPoints: profileJSON.points.JavaScript
      };
      // simple response
      renderer.view('profile', values, response);
      renderer.view('footer', {}, response);
      response.end();
    });

    //on 'error'
    studentProfile.on('error', function(error) {
      //show error
      renderer.view('error', {errorMessage: error.message}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    });
  }
}

module.exports.home = home;
module.exports.user = user;
