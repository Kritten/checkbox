# checkbox

You created some checkboxes and you want to toggle them with at least one  main checkbox (à la 'select all')?<br> 
Use this library!

## Features
* written in native JavaScript, no depencies!
* supports different groups of checkboxes per page
* optimized for performance

## Prerequisites
none

## Browser Support
Tested with the following browser versions (other browsers or versions will most probably also work):
* Chrome 64+

## Quickstart
1. Include the script into your webpage:
```html
<script src="kritten_checkbox.min.js"></script>
```
2. Add the data attribute 'kritten_checkbox' to your checkboxes:
```html
<input type="checkbox" data-kritten_checkbox>
```
3. Add the data attribute 'kritten_checkbox_main' to your main checkboxes:
```html
<input type="checkbox" data-kritten_checkbox_main>
```
4. Thats it!

## Usage
## Multiple checkbox groups
Simply add the same value to each 'kritten_checkbox' and 'kritten_checkbox_main' data attribute group to distinguish the different checkbox groups:
```html
<!-- First group -->
<input type="checkbox" data-kritten_checkbox_main="group1">
<input type="checkbox" data-kritten_checkbox="group1">
<input type="checkbox" data-kritten_checkbox="group1">
<!-- Second group -->
<input type="checkbox" data-kritten_checkbox_main="group2">
<input type="checkbox" data-kritten_checkbox="group2">
<input type="checkbox" data-kritten_checkbox="group2">
```
