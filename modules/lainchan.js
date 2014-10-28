var https = require("https");

lainchan_regex = /(lainchan\.org\/[\w|%]+\/res\/\d+)/;

function register(bot){
  bot.addListener('message', function(from, to, message){
    if ((result = lainchan_regex.exec(message))) {
      url = 'https://'+result[0]+'.json';
      threadTeaser(url, function(teaser){
        bot.say(to, "Thread: " + teaser);
      });
    }
  });
}

function threadTeaser(url, callback) {
  https.get(url, function(res) {
    var body = '';

    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      var lain = JSON.parse(body).posts[0]
      callback("sub" in lain ? lain.sub : lain.com.slice(0,60));
    });
  })
}

module.exports = {"register": register};
