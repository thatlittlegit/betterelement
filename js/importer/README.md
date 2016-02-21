# Importer
Using the same top bar on every single page of your site, and don't want to copy and paste
it all, bulking up everything? Then Importer'll be your friend!
## How it works
1. You import BetterElement and Importer.
    **BetterElement is 100% REQUIRED for Importer to work!**
2. You create the Placeholder() object as well as provide a name and a URL.
    * the URL is what page to move there.
    * the name is what will be entered into the placeholder. For example, if the name was 'hg',
    then `<hg>` would import that page.
3. You write in the placeholder into the HTML. The placeholder's tag will be either:
    * ```html
    <p name="placeholder_name"></p>
    ```
    (placeholder_name being the name of the placeholder from step 1)
    * ```html
    <placeholder_name />
    ```
    (placeholder_name still being the name of the placeholder from step 1)
    
    Only the 1st one is actually valid, however it may be easier to comprehend `<name>`
    than `<p name="name">`.

4. You call the Placeholder() object's `do()` method.
5. You're all done!

## Tags that WILL NOT be tranferred
If we transported everything, you might as well use an iFrame. So, here are some that you'll need to *tell*
Importer to carry.
```html
<html>
<body> (except for contents)
<style>
<frame> (100% old)
<frameset>
<!DOCTYPE>
<script>
<canvas> (as no scripts are transported, they would just be big white rectangles)
```
You can tell Importer to keep them through JSON:
```javascript
var myPlaceholder = new Placeholder("myp", "toolbar.html", {
    "canvas":true,
    "script":true
});
```
That simple code will notify Importer to keep your `<canvas>` and `<script>` elements to the new page.