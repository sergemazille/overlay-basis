let overlay;
let body;

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
        registerEvents(overlay);
    }

    show () {

        // forbid body to be scrollable
        body.classList.add('is-locked');

        // overlay won't be clickable until 'transitionend' event
        overlay.classList.add('--cursor-locked');

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
        overlay.classList.add('is-locked');
    }
}

function registerEvents (overlay) {

    // watch for transition end
    overlay.addEventListener('transitionend', () => {

        // overlay is hidden: clean up
        if (! overlay.classList.contains('is-visible')) {
            overlay.classList.remove('is-locked');
            overlay.classList.remove('--cursor-locked');
        }

        // overlay is visible: remove temporary transitioning lock (unless overlay is locked)
        if (overlay.classList.contains('is-visible') && ! overlay.classList.contains('is-locked')) {
            overlay.classList.remove('--cursor-locked');
        }

        // overlay is visible: add locked cursor icon if need be
        if (overlay.classList.contains('is-visible') && overlay.classList.contains('is-locked')) {
            overlay.classList.add('--cursor-locked');
        }
    });
}
