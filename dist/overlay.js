let overlaySingleton;
let overlay;
let body;

export default class {

    constructor () {

        // avoid multiple declarations
        if (! overlaySingleton) {

            // create an #overlay element...
            overlay = document.createElement('div');
            overlay.setAttribute('id', 'overlay');

            // ...and append it on DOM
            body = document.querySelector('body');
            body.appendChild(overlay);

            overlaySingleton = this;

            registerEvents(overlay, overlaySingleton);

        } else {
            return overlaySingleton;
        }
    }

    get domElement () {
        return overlay;
    }

    show () {

        // forbid body to be scrollable
        body.classList.add('is-locked');

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

function registerEvents (overlay, overlaySingleton) {

    // click event
    overlay.addEventListener('click', () => {

        // do nothing if overlay is locked
        if (overlay.classList.contains('is-locked')) {
            return;
        }

        // else hide overlay
        overlaySingleton.hide();
        overlay.dispatchEvent(new Event('hiding'));
    });

    // watch for transition end
    overlay.addEventListener('transitionend', () => {

        // overlay is hidden: clean up
        if (! overlay.classList.contains('is-visible')) {
            overlay.classList.remove('is-locked');
            overlay.classList.remove('--cursor-locked');
            overlay.dispatchEvent(new Event('hidden'));
        }

        // overlay is visible
        if (overlay.classList.contains('is-visible')) {

            if (overlay.classList.contains('is-locked')) {
                overlay.classList.add('--cursor-locked');
            }

            overlay.dispatchEvent(new Event('shown'));
        }
    });
}
