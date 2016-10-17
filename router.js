var Profile = require('./profile.js');
var renderer = require('./renderer.js');

//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  //if url == '/' && GET
  if(request.url === '/') {
    //show search
    response.setHeader('Content-Type', 'text/plain');
    renderer.view('header', {}, response);
    renderer.view('search', {}, response);
    renderer.view('footer', {}, response);
    response.end();
  }
  //if url == '/' && POST
    //redirect to /:username
}

//Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
  //if url == '/....'
  var userName = request.url.replace('/', '');
  if(userName.length > 1) {
    response.setHeader('Content-Type', 'text/html');
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
