var myKey = config.token;
var route = config.route;

var model = {
  twitchList: [],
  twitchOffline: [],
  twitchNotFound: [],
};
var users = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  // "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas",
  "brunofin",
  "comster404"
];

//2. gets users from array
//if online 'response.stream is not null', push to twitchlist array
//if offline, make call to users endpoint
//push info to twitchOffline array
//once calls complete, call displayUsers function
function twitchLookup() {
  $.each(users, function(i) {
    $.ajax({
      url: route + users[i] + "?",
      data: {
        client_id: myKey
      },
      success: function(response) {
        if (response.stream !== null) {
          model.twitchList.push(response);
        } else {
          $.ajax({
            url: "https://api.twitch.tv/kraken/channels/" + users[i] + "?",
            data: {
              client_id: myKey
            },
            success: function(response) {
              model.twitchOffline.push(response);
            },
            error: function() {
              model.twitchNotFound.push(response);
            }
          });
        }
      }
    });
  });
  setTimeout(function() {
    displayUsers();
  }, 1000);
}

//3. iterate over each array and show on screen
function displayUsers() {
  var name,
    status,
    logo,
    link,
    nameView,
    viewers,
    offName,
    offStatus,
    offLogo,
    offLink,
    offNameView,
    isOnline,
    noLink,
    noAccount,
    noNameView;

  model.twitchList.forEach(function(user) {
    isOnline = $("<h3></h3>").text("Streaming Live Now!").addClass("isLive");
    name = $("<h4></h4>").text(user.stream.channel.display_name);
    status = $("<p></p>").text(user.stream.channel.status);
    logo = $("<img>").attr("src", user.stream.channel.logo);
    viewers = $("<p></p>")
      .text(user.stream.viewers + " currently viewing")
      .addClass("viewers");
    link = $("<a>").attr("href", user.stream.channel.url).append(name);
    nameView = $("<li>")
      .attr("class", "name-group-item")
      .append(isOnline, link, logo, status, viewers)
      .addClass("online");
    $("#users ul").append(nameView);
  });

  model.twitchOffline.forEach(function(offUser) {
    offName = $("<h4></h4>").text(offUser.display_name);
    offStatus = $("<p></p>").text("currently offline");
    offLogo = $("<img>").attr("src", offUser.logo);
    offLink = $("<a>").attr("href", offUser.url).append(offName);
    offNameView = $("<li>")
      .attr("class", "name-group-item")
      .append(offLink, offLogo, offStatus);
    $("#users ul").append(offNameView);
  });

  model.twitchNotFound.forEach(function(notFound) {
    noLink = $("<p></p>").text(notFound._links.channel);
    noAccount = $("<p></p>").html("STATUS 404" + '<br>' + "aka: This fool deleted his/her account!");
    noNameView = $("<li>")
      .attr("class", "name-group-item")
      .append(noAccount, noLink);
    $("#users ul").append(noNameView);

  });
}

//1. on ready call twitchLookup
$(document).ready(function() {
  twitchLookup();
});


// model.twitchNotFound[0]._links.channel
