var myKey = config.token;
var route = config.route;

var model = {
  twitchList: [],
  twitchOffline: []
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

function twitchLookup() {
  $.each(users, function(i) {
    $.ajax({
      url: route + users[i] + "?",
      data: {
        client_id: myKey
      },
      success: function(response) {
        if(response.stream !== null) {
          model.twitchList.push(response);
        } else {
          $.ajax({
            url: "https://api.twitch.tv/kraken/channels/" + users[i] + "?",
            data: {
              client_id: myKey
            },
            success: function(response){
              model.twitchOffline.push(response);
            }
          })
        }
      }
    })
  });
  setTimeout(function(){ displayUsers(); }, 1000);
};
//model.twitchOffline.push(response);

// model.twitchList[0].stream.channel.name


function displayUsers() {
  var name, status, logo, link, nameView,
  offName, offStatus, offLogo, offLink, offNameView;

    model.twitchList.forEach(function(user) {
      name = $("<h4></h4>").text(user.stream.channel.name);
      status = $("<p></p>").text(user.stream.channel.status);
      logo = $("<img>").attr("src", user.stream.channel.logo);
      link = $("<a>").attr("href", user.stream.channel.url).append(name);
      nameView = $("<li>").attr("class", "name-group-item").append(link, logo, status).addClass('online');
      $("#users ul").append(nameView);
    });

    model.twitchOffline.forEach(function(offUser) {
    offName = $("<h4></h4>").text(offUser.display_name);
    offStatus = $("<p></p>").text(offUser.status);
    offLogo = $("<img>").attr("src", offUser.logo);
    offLink = $("<a>").attr("href", offUser.url).append(offName);


    offNameView = $("<li>").attr("class", "name-group-item").append(offLink, offLogo, offStatus);

    $("#users ul").append(offNameView);
  });

}

$(document).ready(function() {
  twitchLookup();
});


//first call to stream
//if not null, get name, logo, game, stream_type=live or not, status
//if null call to https://api.twitch.tv/kraken?
//get name, logo

// url: route + "channels/" + users[i] + "?",
