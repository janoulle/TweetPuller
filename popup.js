// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

//https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=dawgtransit&count=20

//Notes: use https and add https twitter to permissions
var req = new XMLHttpRequest();
req.open(
    "GET",
    "https://api.twitter.com/1/statuses/user_timeline.json?" +
        "include_entities=true&" +
        "include_rts=true&" +
        "screen_name=dawgtransit&" +
        "count=20",
    true);
console.log(req);
req.onload = showTweets;
req.send(null);

function showTweets(){
    var tweets = JSON.parse(req.responseText);
    for (var i = 0, text; text = tweets[i]; i++){
        console.log(text['text']);
        var tweet = document.createElement("p")
    }
}

/* Google Analytics Tracking*/
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-23444397-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

/* Tracking Button Clicks */
function trackButton(e) {
    _gaq.push(['_trackEvent', e.target.id, 'clicked']);
};

/* Adding Event Listeners to Buttons*/
var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', trackButtonClick);
}  
  
function showPhotos() {
  var photos = req.responseXML.getElementsByTagName("photo");
  for (var i = 0, photo; photo = photos[i]; i++) {
    var img = document.createElement("image");
    img.src = constructImageURL(photo);
    document.body.appendChild(img);
  }
}

// See: http://www.flickr.com/services/api/misc.urls.html
function constructImageURL(photo) {
  return "http://farm" + photo.getAttribute("farm") +
      ".static.flickr.com/" + photo.getAttribute("server") +
      "/" + photo.getAttribute("id") +
      "_" + photo.getAttribute("secret") +
      "_s.jpg";
}
