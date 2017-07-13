var myKey = config.token;
var route = config.route;

var model = {
  twitchList: []
};

var users = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"
];

function twitchLookup(user) {
  $.ajax({
    url: route + user + "?client_id=" + myKey,
    success: function(response) {
      model.twitchList.push(response);
      console.log(response);
      console.log(model.twitchList);
    }
  });
}

// console.log(twitchLookup(users[3]));

$(document).ready(function() {
  twitchLookup(users[3]);
});
