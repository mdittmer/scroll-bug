# Reproduce scroll bug/performance issue

This reproduces radically different scroll performance with a DOM recycling
scroller based on (now somewhat outdated) code
[here](https://github.com/mdittmer/mdn-confluence).

## Test on Github Pages

You can view the test page
[here](https://mdittmer.github.io/scroll-bug/table.html).

## Test Locally

Just serve this repository locally and visit `/table.html`.

## Getting (More) Results

Interacting with the scrolling view in different browsers illustrates the
difference. My experience has been performance is good on Chrome, reasonable on
Safari, mostly fine in Edge, but the scroll container is not sized properly, and
totally unusable on Firefox due to some weird scrolling bug.

The test page actually runs an automated test (as well as being simple to
interact with manually). After 10 seconds, script will attempt to scroll the
view while capturing timing data. After another 10 seconds a report is printed
to the console. On Chrome and Firefox, you can visit `table.html?showReport`
([Github Pages link](https://mdittmer.github.io/scroll-bug/table.html?showReport))
to have the page replaced with report-in-a-table; this doesn't work on Safari or
Edge because the automated scroll relies on the CSS feature
`scroll-behavior: smooth`.

## Sample Chrome and Firefox Results

### Chrome

![Chrome result](/screenshots/scroll_perf_chrome.png "Chrome").

### Firefox

![Firefox result](/screenshots/scroll_perf_firefox.png "Firefox").
