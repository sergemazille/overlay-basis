# Overlay Basis

Simple overlay component

Works on modern browsers only (uses es6 modules and css custom properties)


## Usage

On page load, Overlay Basis creates and appends an `#overlay` element on the DOM.

To create and use the overlay component in your project, import and initialize the library:
```typescript
import Overlay from 'overlay-basis/src/scripts/overlay';
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