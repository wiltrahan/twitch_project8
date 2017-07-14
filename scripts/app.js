var myKey = config.token;
var route = config.route;

var model = {
  twitchList: []
};

// var users = [
//   "ESL_SC2",
//   "OgamingSC2",
//   "cretetion",
//   "freecodecamp",
//   "storbeck",
//   "habathcx",
//   "RobotCaleb",
//   "noobs2ninjas"
// ];

//pass users array, loop through each name
//push into twitchListarray

// function twitchLookup(users) {
//   for (var i = 0; i < users.length; i++) {
//     $.ajax({
//       url: route + "channels/" + users[i] + "?client_id=" + myKey,
//       success: function(response) {
//         model.twitchList.push(response);
//         // console.log(response);
//         // model.twitchList = response.results;

//       }
//     });
//   }
//   // displayUsers();
// console.log(model.twitchList);

// };
//
function twitchLookup() {
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
  setTimeout(function(){ displayUsers(); }, 200);
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
    var nameView = $("<li></li>").attr("class", "name-group-item").append(name);
    $("#users ul").append(nameView);
  });
}

$(document).ready(function() {
  twitchLookup();
  // displayUsers(twitchLookup(users))
});

// twitchLookup();
