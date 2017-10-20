/*
* to create and use the overlay component in your project, import and initialize the library:
*
* import Overlay from 'overlay-basis/src/scripts/overlay';
* let overlay = new Overlay();
* overlay.init()
*
* you can then use its methods:
*
* overlay.lock();
* overlay.show();
* overlay.hide();
*/

let overlay;
let body;
let locked = false;

export default class {

    constructor () {

        // avoid multiple declarations
        if (! overlay) {

            // create an #overlay element...
            overlay = document.createElement('div');
            overlay.setAttribute('id', 'overlay');

            // ...and append it on DOM
            body = document.querySelector('body');
            body.appendChild(overlay);

        } else {
            return this;
        }
    }

    init () {
        registerEvents(overlay, this);
    }

    show () {

        if (locked) {

            // forbid body to be scrollable
            body.classList.add('is-locked');

            // overlay won't be clickable until 'transitionend' event
            overlay.classList.add('--cursor-locked');
        }

        // display overlay
        overlay.classList.add('is-visible');
    }

    hide () {

        // body is scrollable again
        body.classList.remove('is-locked');

        // hide overlay
        overlay.classList.remove('is-visible');

        // hide eventual locked cursor icon
        overlay.classList.remove('--cursor-locked');
    }

    lock () {

        // overlay will remain locked after transition
        locked = true;
    }
}

/*
* @param overlay: node
* @param Overlay: class
*/

function registerEvents (overlay, Overlay) {

    // watch for transition end
    overlay.addEventListener('transitionend', () => {

        // overlay is hidden: clean up
        if (! overlay.classList.contains('is-visible')) {
            overlay.classList.remove('is-locked');
            overlay.classList.remove('--cursor-locked');
            locked = false;
        }

        // overlay is visible: remove temporary transitioning lock (unless overlay is locked)
        if (overlay.classList.contains('is-visible') && ! locked) {
            overlay.classList.remove('is-locked');
        }

        // overlay is visible: add locked cursor icon if need be
        if (overlay.classList.contains('is-visible') && locked) {
            overlay.classList.add('--cursor-locked');
        }
    });

    // dismiss on click if not locked
    overlay.addEventListener('click', () => {
        if (locked) {
            return;
        }

        Overlay.hide();
    });
}
