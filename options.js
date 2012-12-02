document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('controlBtns').addEventListener('click',function(e){
	    if (e.target.nodeName == "BUTTON" || e.target.nodeName == "INPUT" ){
            if (e.target.id == "save"){
		        save_options();
            }
            else if (e.target.id == "erase"){
                erase_options();
            }
        }

	});
});

// Saves options to localStorage.
function save_options() {
  var input = document.getElementById('username');
  var tweetsize = document.getElementById('tweetsize');
  var err = document.getElementById('errordiv');
  var msg = document.createTextNode('text');
  var msg2 = document.createTextNode('text');
  var breaker = document.createElement('br');
  var username = input.value;
  var sizeval = tweetsize.value;
  var img = document.getElementById('imagesOn');
  localStorage["images_on"] = img.checked;
  console.log(img.checked);
  //Making sure username field is not empty
  if (username.length > 0){
    localStorage["twitter_username"] = username;
  }
  else{
    localStorage["twitter_username"] = "twitterapi";  
    msg.nodeValue = "Defaulting to @twitterapi due to invalid response.";
    err.appendChild(msg);
    err.appendChild(breaker);
    err.setAttribute("style","display: all;");
  }
  //Making sure tweet count is in the range [1,40]
  if (sizeval > 0 && sizeval <= 40){
    localStorage["tweet_size"] = sizeval;
  }
  else{
    localStorage["tweet_size"] = 10;
    msg2.nodeValue = "Defaulting to tweet size of 10 due to invalid value entered.";
    err.appendChild(msg2);
    err.setAttribute("style","display: all;"); 
  }
  setTimeout(function() {
    err.setAttribute("style","display: none;");
    err.innerHTML = '';
    }, 2000);  

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  status.setAttribute("style","display: all;"); 
  setTimeout(function() {
    status.setAttribute("style","display: none;");
    status.innerHTML = "";
  }, 1500);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var username = localStorage["twitter_username"];
  var size = localStorage["tweet_size"];
  var imagesOn = localStorage["images_on"]
  if (!username || !size || !imagesOn){
    return;
  }
  localStorage["twitter_username"] = username;
  localStorage["tweet_size"] = tweetsize;
  localStorage["images_on"] = imagesOn;
}

function erase_options(){
    var status = document.getElementById("status");
    localStorage.removeItem("twitter_username");
    localStorage.removeItem("tweet_size");
    localStorage.removeItem("images_on");
    status.innerHTML = "Stored options removed.";
    status.setAttribute("style","display: all;");
    setTimeout(function() {
        status.setAttribute("style","display: none;");    
        status.innerHTML = "";
        location.reload();
    }, 2000);
}

