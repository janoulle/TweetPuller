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
    
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('submit').addEventListener('click', submitForm);
  yesBtn = document.createElement('input');
    yesBtn.setAttribute("type","button");
    yesBtn.setAttribute("id","yes");
    yesBtn.setAttribute("value","Yes");
    yesBtn.setAttribute("class","btn btn-primary");
    yesBtn.addEventListener('click',yesClicked);

    noBtn = document.createElement('input');
    noBtn.setAttribute("type","button");
    noBtn.setAttribute("id","no");
    noBtn.setAttribute("value","No");
    noBtn.setAttribute("class","btn");
    noBtn.addEventListener('click',noClicked);
});


//Submit the form
function submitForm(){
    result = document.getElementById('username');
    username = result.value;
    openConnection();
}

function clearForm(){
    rbnExtra = document.querySelectorAll('#resetbtn');
    for(var i = 0; i < rbnExtra.length; ++i) {
        rbnExtra[i].parentNode.removeChild(rbnExtra[i]);
    }
    divTweet = document.getElementById('tweetdiv');
    formDiv = document.getElementById('formdiv');
    notice = document.getElementById('notices');
    info = document.getElementById('infodiv');
    info.appendChild(yesBtn);
    info.appendChild(noBtn);
    notice.innerHTML = '';
    divTweet.innerHTML = '';
    formDiv.setAttribute("style","display: none;");
    usr = localStorage["twitter_username"];
    document.getElementsByClassName('control-group')[0].setAttribute("style","display: all;");
    if (usr){
        info.setAttribute("style","display: all;");
        document.getElementById('yes').addEventListener('click',yesClicked);
        document.getElementById('no').addEventListener('click',noClicked);
    }
    else{
        formDiv.setAttribute("style","display:all");
    }
}

function yesClicked(){
    username = usr;
    info.setAttribute("style","display: none");
    openConnection();
}

function noClicked(){
    formDiv.setAttribute("style","display:all");
    info.setAttribute("style","display: none");
    openConnection();
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
        resetButton();
    }
    //Otherwise, show an error message.
    else{
        //There was a problem with the XMLHttprequest
        var error = document.getElementById('errordiv');
        error.setAttribute("style","display: all;");
        setTimeout(function() {
            error.setAttribute("style","display: none;");
        }, 1500);
    }
}

function resetButton(){
    rbn = document.createElement("input");
    rbn.setAttribute("id","resetbtn");
    rbn.setAttribute("class","btn btn-primary");
    rbn.setAttribute("type","button");
    rbn.setAttribute("value","Clear");
    rst = document.createElement("div")
    rst.appendChild(rbn);
    document.body.appendChild(rst);
    rbn.addEventListener('click',clearForm);
    
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

function link(data){
    var val = data.nodeValue;
    var link = document.createElement("a");
    

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


