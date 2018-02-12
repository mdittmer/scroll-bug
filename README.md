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
Safari, and totally unusable on Edge and Firefox.

The test page actually runs an automated test (as well as being simple to
interact with manually). After 10 seconds, script will attempt to scroll the
view while capturing timing data. After another 10 seconds a report is printed
to the console. Visit `table.html?showReport` to have the page replaced with
report-in-a-table. Note that `?showReport` outputs uninteresting data on Edge
because the automated scroll relies on `scroll-behavior: smooth`, which Edge
does not support.
