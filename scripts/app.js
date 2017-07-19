var myKey = config.token;
var route = config.route;

var model = {
  twitchList: []
};

function twitchLookup() {
  var users = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  // "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"
];
  $.each(users, function(i) {
    $.ajax({
      url: route + "channels/" + users[i] + "?",
      data: {
        client_id: myKey
      },
      success: function(response) {
        model.twitchList.push(response);

      }
    })

  });
  setTimeout(function(){ displayUsers(); }, 600);
};




function displayUsers() {
  model.twitchList.forEach(function(user) {
    var name = $("<h4></h4>").text(user.display_name);
    var status = $("<p></p>").text(user.status);
    var logo = $("<img>").attr("src", user.logo);
    var link = $("<a>").attr("href", user.url).append(name);

    // $('<a>').append(name);

    var nameView = $("<li>").attr("class", "name-group-item").append(link, logo, status);

    $("#users ul").append(nameView);
  });
}

$(document).ready(function() {
  twitchLookup();
});





$
