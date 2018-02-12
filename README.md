# Reproduce scroll bug/performance issue

This reproduces radically different scroll performance with a DOM recycling
scroller based on (now somewhat outdated) code
[here](https://github.com/mdittmer/mdn-confluence).

## Running the code

Serve this repository locally, then visit `/table.html`. Interacting with the
scrolling view in different browsers illustrates the difference. My experience
has been performance is good on Chrome, reasonable on Safari, and totally
unusable on Edge and Firefox.

After 10 seconds, script will attempt to scroll the view while capturing timing
data. After another 10 seconds a report is printed to the console. Visit
`table.html?showReport` to have the page replaced with report-in-a-table. Note
that `?showReport` outputs uninteresting data on Edge because the automated
scroll relies on `scroll-behavior: smooth`, which Edge does not support.
