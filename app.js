var app = new Vue({
  el: "#app",
  data: {
    streamers: [],
    statusToSearch: "red"
  },
  methods: {
    switchStatus: function () {
      var display = $("#status-to-search");
      if (this.statusToSearch === "red") {
        this.statusToSearch = "green";
        display.removeClass("red");
        display.addClass("green");
      } else if (this.statusToSearch === "green") {
        this.statusToSearch = "both";
        display.removeClass("green");
        display.addClass("both");
      } else if (this.statusToSearch === "both") {
        this.statusToSearch = "red";
        display.removeClass("both");
        display.addClass("red");
      }
    },
    goto: function (msg) {
      console.log(msg);
    }
  }
});


function getUser(name, success) {
  var url = "https://wind-bow.glitch.me/twitch-api/users/";
  $.getJSON(url+name+"?callback=?", function (res) {
    success(res)
  });
}

function getStreamFor(user, success) {
  var url = "https://wind-bow.glitch.me/streams/"+user._id;
  $.getJSON(url+"?callback=?", function (res) {
    success(user, res.stream);
  });
}

function handleUsers(usernames) {
  for (var x = 0; x < usernames.length; x++) {
    console.log(usernames[x]);
    getUser(usernames[x], function(res) {
      getStreamFor(res, handleStream)
    });
  }
}

function handleStream(user, stream) {
  var status = stream ? true : false;

  app.streamers.push({
    online: status,
    name: user.display_name,
    current: status ? stream.channel.status : "Not playing.",
    profile: user.logo,
    link: status ? tream.channel.url : ''
  });
}

$(document).ready(function () {
  var users = ['freecodecamp', 'riotgames', 'summit1g', 'esl_sc2'];
  handleUsers(users);
});

// function formatResult(res) {
//   if (!res.stream) {
//     return {
//       name: res.display_name,
//       current: "Not online.",
//       online: false,
//       profile: ""
//     }
//   }
//   return {
//     name: res.stream.display_name,
//     current: stream.status,
//     online:
//   };
// }
