//https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=dawgtransit&count=20

var result;
var username; 
var req;
var tweetdiv;
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
var tweets;
var outer;
var rbn;
var rbnExtra;
var divTweet;
var formDiv;
var notice;
var info;
var rst;
var yesBtn;
var noBtn;
var clearBtn;
var noClick = false;



document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit').addEventListener('click', submitForm);
    addListeners();
});

function addListeners(){
  yesBtn = document.getElementById('yes');
  noBtn = document.getElementById('no');
  clearBtn = document.getElementById('clear');
  yesBtn.addEventListener('click',yesClicked);
  noBtn.addEventListener('click',noClicked);
  clear.addEventListener('click',clearForm);
}


//Submit the form
function submitForm(){
    result = document.getElementById('username');
    if (!username){
        username = result.value;
    }
    openConnection();
}

function clearForm(){
    username = '';
    rbnExtra = document.querySelectorAll('#resetbtn');
    for(var i = 0; i < rbnExtra.length; ++i) {
        rbnExtra[i].parentNode.removeChild(rbnExtra[i]);
    }
    divTweet = document.getElementById('tweetdiv');
    formDiv = document.getElementById('formdiv');
    notice = document.getElementById('notices');
    info  = document.getElementById('infodiv');    
    notice.innerHTML = '';
    divTweet.innerHTML = '';
    usr = localStorage["twitter_username"];
    toggleDivs(usr);
}

function toggleDivs(status){
    document.getElementsByClassName('control-group')[0].setAttribute("style","display: all;");
    if (status){
        info.setAttribute("style","display: all;");
        formDiv.setAttribute("style","display: none;");        
    }
    else {
        info.setAttribute("style","display: none;");
        formDiv.setAttribute("style","display: all;");
    }
}

function yesClicked(){
    username = localStorage["twitter_username"];
    info.setAttribute("style","display: none");
    submitForm();
}

function noClicked(){
    noClick = true;
    username = '';
    info.setAttribute("style","display: none;");
    formDiv.setAttribute("style","display:all;");
}

function openConnection(){
    req = new XMLHttpRequest();
    req.open(
        "GET",
        "https://api.twitter.com/1/statuses/user_timeline.json?" +
            "include_entities=true&" +
            "include_rts=true&" +
            "screen_name=" + username + 
            "&count=10",
        true);
    req.onload = showTweets;
    req.send(null);
}


function showTweets(){
    //If a successful request was made, proceed.
    //console.log(req.status);
    if (req.status == 200){
        //Hiding the form.
        document.getElementsByClassName('control-group')[0].setAttribute("style","display: none;");
        //Providing feedback to user.
        document.getElementById('notices').innerHTML = "<p class=lead>Tweets for <a href=http://twitter.com/" + username + ">" + username + "</a></p>";
        //Parse response and load tweets.
        tweets = JSON.parse(req.responseText);       
        tweetdiv = document.getElementById("tweetdiv");
        outer = document.createElement("ul");
        outer.setAttribute("class","tweets");
        for (var i = 0, text; text = tweets[i]; i++){
            //Create text nodes
            newContent = document.createTextNode(text['text']);
            date = document.createTextNode(text['created_at']);
            date.nodeValue  = formatDate(date.nodeValue);
            pwrapper = document.createElement("li");
            breaker = document.createElement("br");
            datewrapper = document.createElement("em");
            //Modify date content
            datewrapper.setAttribute("class","date");
            datewrapper.appendChild(date);
            //Add content to pwrapper
            pwrapper.appendChild(newContent);
            pwrapper.appendChild(breaker);
            pwrapper.appendChild(datewrapper);
            outer.appendChild(pwrapper);
            //Add the pwrapper to the div
            tweetdiv.appendChild(outer);
            //Add the updated div to the body
            document.body.appendChild(tweetdiv);
        }
    }
    //Otherwise, show an error message.
    else{
        //There was a problem with the XMLHttprequest
        var txt;
        var error = document.getElementById('errordiv');
        //Private account
        if (req.status == 401){
            txt = document.createTextNode("text");
            txt.nodeValue = 'This twitter account appears to be private. Only public tweets can be displayed.';
            error.appendChild(txt);
        }
        //No such user
        if (req.status == 404){
            txt = document.createTextNode("text");
            txt.nodeValue = 'This twitter account does not exist. Please check the username entered.';
            error.appendChild(txt);
        }
        error.setAttribute("style","display: all;");
        setTimeout(function() {
            error.setAttribute("style","display: none;");
            if (txt){txt.parentNode.removeChild(txt);}
            username = '';
        }, 2000);
        
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

//Function from: http://www.queness.com/post/8567/create-a-dead-simple-twitter-feed-with-jquery
function formatDate(dateString) {
        var rightNow = new Date();
        var then = new Date(dateString);
         
        if ($.browser.msie) {
            // IE can't parse these crazy Ruby dates
            then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
        }
 
        var diff = rightNow - then;
 
        var second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;
        
        if (isNaN(diff) || diff < 0) {
            return ""; // return blank string if unknown
        }
 
        if (diff < second * 2) {
            // within 2 seconds
            return "right now";
        }
 
        if (diff < minute) {
            return Math.floor(diff / second) + " seconds ago";
        }
 
        if (diff < minute * 2) {
            return "about 1 minute ago";
        }
 
        if (diff < hour) {
            return Math.floor(diff / minute) + " minutes ago";
        }
 
        if (diff < hour * 2) {
            return "about 1 hour ago";
        }
 
        if (diff < day) {
            return  Math.floor(diff / hour) + " hours ago";
        }
 
        if (diff > day && diff < day * 2) {
            return "yesterday";
        }
 
        if (diff < day * 365) {
            return Math.floor(diff / day) + " days ago";
        }
        
        else {
            return "over a year ago";
        }
    } // timeAgo()
  

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


