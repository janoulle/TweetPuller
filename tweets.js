// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

//https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=dawgtransit&count=20

//Notes: use https and add https twitter to permissions
var req = new XMLHttpRequest();
var request = new XMLHttpRequest();
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
//Getting specific info about a single user
request.open(
    "GET",
    "https://api.twitter.com/1/users/show.json?" +  
    "screen_name=janetalkstech&" + 
    "include_entities=true",true);
request.onload = extendTweets;
request.send(null);

function extendTweets(){
    var usr = JSON.parse(request.responseText);
    //console.log(usr);  
}


var tweetdiv = null;
var username;
var date;
var tweet;
var pwrapper;
var datewrapper;
var contentattribute;
var dateattribute;
var user;
var breaker;
var link;

function showTweets(){
    var tweets = JSON.parse(req.responseText);
    //console.log(tweets);
    for (var i = 0, text; text = tweets[i]; i++){
        //Create node elements
        pwrapper = document.createElement("p");
        breaker = document.createElement("br");
        datewrapper = document.createElement("em");
        link = document.createElement("a");
        //Create text nodes
        newContent = document.createTextNode(text['text']);
        date = document.createTextNode(text['created_at']);
        //Setting up classes
        contentattribute = document.createAttribute("class");
        contentattribute.value = "singletweets";
        dateattribute = document.createAttribute("class");
        dateattribute.value = "date";
        //Modify date content
        datewrapper.appendChild(date);
        //Add content to pwrapper
        pwrapper.appendChild(newContent);
        pwrapper.appendChild(breaker);
        pwrapper.appendChild(datewrapper);
        //Get the pre-created div element
        tweetdiv = document.getElementById("dawgtweets");
        //Add the pwrapper to the div
        tweetdiv.appendChild(pwrapper);
        //Add the updated div to the body
        document.body.appendChild(tweetdiv);
        //Update attributes
        
    }
    var paragraphs = document.getElementsByTagName('p'); 
    for (var i = 0; i < paragraphs.length; i++) {
        paragraphs[i].className += "singletweet";
        console.log(paragraphs[i]);
    }
}

//Credit: http://geekswithblogs.net/Nettuce/archive/2010/03/03/javascript-twitter-linkify.aspx
function Linkify(text) {
    text = text.replace(/(https?:\/\/\S+)/gi, function (s) {
        return '<a href="' + s + '">' + s + '</a>';
    });

    text = text.replace(/(^|)@(\w+)/gi, function (s) {
        //Stripping out the @ symbol
        s = s.substring(1);
        return '<a href="http://twitter.com/' + s + '">' + s + '</a>';
    });

    text = text.replace(/(^|)#(\w+)/gi, function (s) {
        return '<a href="http://search.twitter.com/search?q=' + s.replace(/#/,'%23') + '">' + s + '</a>';
     });
    return text;
}

function formatDate(date){
    
}

function createImage(entity) {
  var pic = document.createElement("image");
  for (var i = 0, photo; photo = photos[i]; i++) {
    var img = document.createElement("image");
    img.src = constructImageURL(photo);
    document.body.appendChild(img);
  }
}

function constructImageURL(pic) {
  return "http://farm" + photo.getAttribute("farm") +
      ".static.flickr.com/" + photo.getAttribute("server") +
      "/" + photo.getAttribute("id") +
      "_" + photo.getAttribute("secret") +
      "_s.jpg";
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
  
