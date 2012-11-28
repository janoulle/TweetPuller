// Save this script as `options.js`

// Saves options to localStorage.
function save_options() {
  var input = document.getElementById('username');
  var username = input.value;
  console.log(username);
  localStorage["twitter_username"] = username;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 7050);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var username = localStorage["twitter_username"];
  if (!username){
    return;
  }
  localStorage["twitter_username"] = username;
}

function erase_options(){
    localStorage.removeItem("twitter_username");
    location.reload();

}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('save').addEventListener('click', save_options);
});
