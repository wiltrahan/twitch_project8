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

  // console.log(model.twitchList);
  // displayUsers();
  setTimeout(function(){ displayUsers(); }, 500);
};


// var view = {
//   displayUsers: function() {
//     model.twitchList.forEach(function(user) {
//       var name = $("<h4></h4>").text(user.name)
//       var nameView = $("<li></li>")
//         .attr("class", "name-group-item")
//         .append(name);
//         $("#users ul").append(nameView);
//     });
//   }
// };

function displayUsers() {
  model.twitchList.forEach(function(user) {
    var name = $("<h4></h4>").text(user.name);
    var logo = $("<img>");
    logo.attr("src", user.logo);
    // logo.attr("src");
    var nameView = $("<li></li>").attr("class", "name-group-item").append(name, logo);
    // var logo = $("<li></li>").attr("class", "name-group-item").append()
    $("#users ul").append(nameView);
  });
}

$(document).ready(function() {
  twitchLookup();

});




