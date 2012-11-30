// Saves options to localStorage.
function save_options() {
  var input = document.getElementById('username');
  var tweetsize = document.getElementById('tweetsize');
  var username = input.value;
  var sizeval = tweetsize.value;
  if (username.length > 0){
    localStorage["twitter_username"] = username;
  }
  else{
    alert("Defaulting to @twitterapi due to invalid response.");
  }
  if (sizeval > 0 && sizeval <= 40){
    localStorage["tweet_size"] = sizeval;
  }
  else{
    localStorage["tweet_size"] = 10;
    var message = document.createTextNode('text');
    alert("Defaulting to tweet size of 10 due to invalid value entered.");
  }

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 1500);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var username = localStorage["twitter_username"];
  var size = localStorage["tweet_size"];
  if (!username || !size){
    return;
  }
  localStorage["twitter_username"] = username;
  localStorage["tweet_size"] = tweetsize;
}

function erase_options(){
    var status = document.getElementById("status");
    localStorage.removeItem("twitter_username");
    localStorage.removeItem("tweet_size");
    status.innerHTML = "Stored options removed.";
    setTimeout(function() {
        status.innerHTML = "";
        location.reload();
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('save').addEventListener('click', save_options);
  document.getElementById('erase').addEventListener('click', erase_options);
});
