var Profile = require("./profile.js");


//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  //if url == "/" && GET
  if(request.url === '/') {
    //show search
    response.setHeader('Content-Type', 'text/plain');
    response.write('Header\n');
    response.write('Search\n');
    response.end('Footer\n');
  }
  //if url == "/" && POST
    //redirect to /:username
}

//Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
  //if url == "/...."
  var userName = request.url.replace('/', '');
  if(userName.length > 1) {
    response.setHeader('Content-Type', 'text/plain');
    response.write('Header\n');

    //get json from Treehouse
    var studentProfile = new Profile(userName);

    //on "end"
    studentProfile.on("end", function(profileJSON) {
      //show profile

      // store the values which we need
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        userName: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        jsPoints: profileJSON.points.JavaScript
      };
      // simple response
      response.write(values.userName + ' has ' + values.badges + ' total badge(s) and ' +
        values.jsPoints + ' points in JavaScript\n');
      response.end('Footer\n');
    });

    //on "error"
    studentProfile.on("error", function(error) {
      //show error
      response.write(error.message + '\n');
      response.end('Footer\n');
    });
  }
}

module.exports.home = home;
module.exports.user = user;
