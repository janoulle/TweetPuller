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
	document.getElementById('displayWindow').addEventListener('click',function(e){
		//Condition is true if a button was clicked.
		//All caps is essential
		if (e.target.nodeName == "BUTTON" || e.target.nodeName == "INPUT" ){
			if (e.target.id == "submit"){
				submitForm();
			}
			else if (e.target.id == "yes"){
				yesClicked();
			}
			else if (e.target.id == "no"){
				noClicked();
			}
		}	
	});
	document.getElementById('navigation').addEventListener('click',function(e){
		if (e.target.id == "clear"){
			clearForm();
		}
		else if (e.target.id == "about"){
			aboutClicked();
		}
		else if (e.target.id == "signin"){
			authTwitter();
		}	
	});
	document.getElementById('displayWindow').addEventListener('keypress',function(e){
	    if (e.which == 13){
	        //Prevent the page from refreshing
	        e.preventDefault();
	    	console.log(e);
	    }	
	});
});

//About the writer
function aboutClicked(){
	var divider = document.getElementById('notices');
	divider.innerHTML = "<p class=alert alert-info>TweetPuller is written by Jane Ullah. "
						+ "Visit <a href=http://janeullah.com title='Jane Ullah's personal"
						+ " website for more information.'>my site</a>.";
	setTimeout(function() {divider.innerHTML = '';}, 2500);
}

function authTwitter(){
	console.log("Clicked Signin");
}

//Submit the form. Include more useful error feedback
function submitForm(){
    result = document.getElementById('username');
    if (!username){
        if (result.value.length > 0){
            username = result.value;
            openConnection();
        }
        else{
            error = document.getElementById('errordiv');
            error.setAttribute("style","display: all;");
            error.innerHTML = '<p class="alert alert-error">You didn\'t enter a username. Please do so before submitting this form.';
            setTimeout(function() {
                error.setAttribute("style","display: none;");
                error.innerHTML = '';
            }, 3000);
        }
    }
}

//Clear the tweets and open up the submit form again or saved options setting
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

//Displays info alerts on or off.
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

//Clicking the yes in response to the "Saved Options" options
function yesClicked(){
    username = localStorage["twitter_username"];
	
    info.setAttribute("style","display: none");
    submitForm();
}

//Clicking no in response to "Saved Options"
function noClicked(){
    noClick = true;
    username = '';
    info.setAttribute("style","display: none;");
    formDiv.setAttribute("style","display:all;");
}

//Get the Twitter JSON feed
function openConnection(){
	var tweetcount = localStorage["tweet_size"];
	if (!tweetcount){
		tweetcount = 10;
	}
    req = new XMLHttpRequest();
    req.open(
        "GET",
        "https://api.twitter.com/1/statuses/user_timeline.json?" +
            "include_entities=true&" +
            "include_rts=true&" +
            "screen_name=" + username + 
            "&count=" + tweetcount +
        true);
    req.onload = showTweets;
    req.send(null);
}

//Parse and display the Tweets
function showTweets(){
    //If a successful request was made, proceed.
    if (req.status == 200){
        //Hiding the form.
        document.getElementsByClassName('control-group')[0].setAttribute("style","display: none;");
        //Providing feedback to user.
        document.getElementById('notices').innerHTML = "<p class=lead>Tweets for <a href=http://twitter.com/" + username + ">" + username + "</a></p>";
        //Parse response and load tweets.
        tweets = JSON.parse(req.responseText);   
        //Remove for debugging
        //console.log(tweets[0].entities);    
        var i = 0, j = tweets.length;
        for (; i < j; i++){
            var ent = tweets[i].entities;
            console.log(ent);        
        }
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

//Credit: http://www.queness.com/post/8567/create-a-dead-simple-twitter-feed-with-jquery
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


