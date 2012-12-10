// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be found in the LICENSE file.

// Called when a message is passed.  We assume that the content script wants to show the page action.
function onRequest(request, sender, sendResponse) {
  // Show the page action for the tab that the sender (content script) was on.
  console.log(request);
  console.log(sender);
  console.log(sendResponse);
  chrome.pageAction.show(sender.tab.id);
  // Return nothing to let the connection be cleaned up.
  sendResponse({});
};

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);
chrome.contextMenus.onClicked.addListener(onClickHandler);

function onClickHandler(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
}

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
    var contexts = ["page","selection","link","editable","image","video",
                  "audio"];
    var title = "Get user's tweets in TweetPuller";
    var id = chrome.contextMenus.create({"title": title, "contexts":["page"],"id": "context" + "page"});
    //console.log(id);
});

