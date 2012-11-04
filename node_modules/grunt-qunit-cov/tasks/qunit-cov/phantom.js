/*
 * grunt
 * https://github.com/cowboy/grunt
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
 */

/*global phantom:true*/

var fs = require('fs');

// The temporary file used for communications.
var tmpfile = phantom.args[0];
// The QUnit helper file to be injected.
var qunit = phantom.args[1];
// The QUnit .html test file to run.
var url = phantom.args[2];

// Keep track of the last time a QUnit message was sent.
var last = new Date();

// Messages are sent to the parent by appending them to the tempfile.
function sendMessage(args) {
  last = new Date();
  fs.write(tmpfile, JSON.stringify(args) + '\n', 'a');
  // Exit when all done.
  if (/^done/.test(args[0])) {
    phantom.exit();
  }
}

// Send a debugging message.
function sendDebugMessage() {
  sendMessage(['debug'].concat([].slice.call(arguments)));
}

// Abort if QUnit doesn't do anything for a while.
setInterval(function() {
  if (new Date() - last > 5000) {
    sendMessage(['done_timeout']);
  }
}, 1000);

// Create a new page.
var page = require('webpage').create();

// QUnit sends its messages via alert(jsonstring);
page.onAlert = function(args) {
  sendMessage(JSON.parse(args));
};

// Keep track if QUnit has been injected already.
var injected;

// Additional message sending
page.onConsoleMessage = function(message) {
  sendMessage(['console', message]);
};
page.onResourceRequested = function(request) {
  if (/\/qunit\.js$/.test(request.url)) {
    // Reset injected to false, if for some reason a redirect occurred and
    // the test page (including qunit.js) had to be re-requested.
    injected = false;
  }
  sendDebugMessage('onResourceRequested', request.url);
};
page.onResourceReceived = function(request) {
  if (request.stage === 'end') {
    sendDebugMessage('onResourceReceived', request.url);
  }
};

page.open(url, function(status) {
  // Only execute this code if QUnit has not yet been injected.
  if (injected) { return; }
  injected = true;
  // The window has loaded.
  if (status !== 'success') {
    // File loading failure.
    sendMessage(['done_fail', url]);
  } else {
    // Inject QUnit helper file.
    sendDebugMessage('inject', qunit);
    page.injectJs(qunit);
    // Because injection happens after window load, "begin" must be sent
    // manually.
    sendMessage(['begin']);
  }
});

















function prettyJSON(obj)
{
    console.log(JSON.stringify(obj, null, 2));
}

function readFileLines(filename)
{
    var stream = fs.open(filename, 'r');
    var lines = [];
    var line;
    while (!stream.atEnd()) {
        lines.push(stream.readLine());
    }
    stream.close();
    
    return lines;
}

function getCoverageInfo()
{
    return JSON.parse(page.evaluate(function() { return JSON.stringify(_$jscoverage); }));
}

function waitFor(testFx, onReady, timeOutMillis)
{
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3001, //< Default Max Timout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            }
            else
            {
                if(!condition)
                {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 100); //< repeat check every 250ms
};

var scanDirectory = function (path) {
    var fs = require('fs');
    if (fs.exists(path) && fs.isFile(path)) {
        console.log(path);
    } else if (fs.isDirectory(path)) {
        fs.list(path).forEach(function (e) {
            if ( e !== "." && e !== ".." ) {    //< Avoid loops
                scanDirectory(path + '/' + e);
            }
        });
    }
};








