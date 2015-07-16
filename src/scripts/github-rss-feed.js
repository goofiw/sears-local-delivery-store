
google.load("feeds", "1");

function initialize() {
  var feed = new google.feeds.Feed("https://github.com/goofiw.atom");
  feed.load(function(result) {
    if (!result.error) {
      console.log(result);
      var container = document.getElementById('github-content');
      for (var i = 0; i < result.feed.entries.length; i++) {
        var entry = result.feed.entries[i];
        var div = document.createElement("div");
        div.innerHTML = '<a href=' + entry.link + '>' + entry.contentSnippet + '</a>';
        //div.appendChild(document.createTextNode(entry.content));
        container.appendChild(div);
      }
    }
  });
}

google.setOnLoadCallback(initialize);
