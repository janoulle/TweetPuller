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
        "screen_name=janetalkstech&" +
        "count=10",
    true);
req.onload = showTweets;
req.send(null);

var tweetdiv = null;

function showTweets(){
    var tweets = JSON.parse(req.responseText);
    console.log(tweets);
    for (var i = 0, text; text = tweets[i]; i++){
        //Create li element
        var liwrapper = document.createElement("li");
        //Create text node
        var newContent = document.createTextNode(text['text']);
        //Add content to liwrapper
        //var replacement = newContent.nodeValue.replace('http','my');
        //var replacement = linkifyTweet(newContent);
        var replacement = Linkify(newContent.nodeValue);
        newContent = document.createTextNode(replacement);
        console.log(replacement);
        liwrapper.appendChild(newContent);
        //Get the pre-created div element
        tweetdiv = document.getElementById("dawgtweets");
        //Add the liwrapper to the div
        tweetdiv.appendChild(liwrapper);
        //Add the updated div to the body
        document.body.appendChild(tweetdiv);
    }
}

//Credit: http://geekswithblogs.net/Nettuce/archive/2010/03/03/javascript-twitter-linkify.aspx
function Linkify(text) {
    text = text.replace(/(https?:\/\/\S+)/gi, function (s) {
        return '<a href="' + s + '">' + s + '</a>';
    });

    text = text.replace(/(^|)@(\w+)/gi, function (s) {
        s = s.substring(1);
        return '<a href="http://twitter.com/' + s + '">' + s + '</a>';
    });

    text = text.replace(/(^|)#(\w+)/gi, function (s) {
        return '<a href="http://search.twitter.com/search?q=' + s.replace(/#/,'%23') + '">' + s + '</a>';
     });
    return text;
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
  
