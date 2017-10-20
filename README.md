# Overlay Basis

Simple overlay component

Works on modern browsers only (uses es6 modules and css custom properties)


## Usage

On page load, Overlay Basis creates and appends an `#overlay` element on the DOM.

You need to add Overlay Basis stylesheet to your own (change this examples with your file path):

if you use less or sass:

`@import '~overlay-basis/src/overlay';`

or directly in your html file:

`<link rel="stylesheet" href="stylesheets/overlay.css">`

To create and use the overlay component in your project, import and initialize the library in your javascript file:

```typescript
import Overlay from 'overlay-basis/src/overlay';
let overlay = new Overlay();
overlay.init()
``` 

You can then use its methods:

### show()

Nothing really fancy here, the overlay will appear on screen:

`overlay.show();`

### hide()

Hide the overlay:

`overlay.hide();`

### lock()

You can add the `.is-locked` class to the overlay by calling `overlay.lock()` before showing it:

`overlay.lock();`

`overlay.show();`

By default it will use a 'not-allowed' icon cursor on mouse hovering.
The `body` element of the page will also be locked (not scrollable).