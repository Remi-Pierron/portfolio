document.addEventListener('DOMContentLoaded', function () {
    const selector = '.software-logos .logos img';

    // ...existing code (randomize animation duration/delay)...
    const logosInitial = document.querySelectorAll(selector);
    if (logosInitial.length) {
        const minDuration = 4.0; // secondes (plage minimale) — augmenté pour ralentir
        const maxDuration = 7.0; // secondes (plage maximale) — augmenté pour ralentir
        const maxDelay = 2.4; // secondes (délai max avant démarrage) — un peu plus de variance

        logosInitial.forEach((img, i) => {
            const rand = Math.random();
            img.style.animationDuration = (minDuration + rand * (maxDuration - minDuration)).toFixed(2) + 's';
            img.style.animationDelay = (Math.random() * maxDelay + (i * 0.06)).toFixed(2) + 's';

            const timingOptions = ['ease-in-out','cubic-bezier(.2,.9,.3,.95)','ease','linear'];
            img.style.animationTimingFunction = timingOptions[Math.floor(Math.random() * timingOptions.length)];
        });
    }

    // Helper to swap two elements in the DOM
    function domSwap(a, b) {
        const parent = a.parentNode;
        const afterB = b.nextSibling;
        parent.insertBefore(b, a);
        parent.insertBefore(a, afterB);
    }

    // New: FLIP + arc jump + bounce animation using Web Animations API
    function jumpSwap(a, b) {
        if (!a || !b || a === b) return Promise.resolve();
        if (a.dataset.swapping === '1' || b.dataset.swapping === '1') return Promise.resolve();

        a.dataset.swapping = '1';
        b.dataset.swapping = '1';
        a.classList.add('swapping');
        b.classList.add('swapping');

        // capture start rects
        const rectA = a.getBoundingClientRect();
        const rectB = b.getBoundingClientRect();

        // perform DOM swap so layout now reflects final positions
        domSwap(a, b);

        // capture new rects (after swap)
        const newRectA = a.getBoundingClientRect();
        const newRectB = b.getBoundingClientRect();

        // inverse deltas (how much to translate so element visually stays in its original place)
        const deltaAX = rectA.left - newRectA.left;
        const deltaAY = rectA.top - newRectA.top;
        const deltaBX = rectB.left - newRectB.left;
        const deltaBY = rectB.top - newRectB.top;

        // determine a reasonable jump height (based on distance)
        const distance = Math.hypot(deltaAX - deltaBX, deltaAY - deltaBY);
        const baseJump = Math.min(120, Math.max(40, distance * 0.45)); // px

        // Build keyframes for element A (the hovered element) to do an arc then bounce
        const framesA = [
            { transform: `translate(${deltaAX}px, ${deltaAY}px)` }, // start (inverse)
            { transform: `translate(${deltaAX * 0.5}px, ${deltaAY - baseJump}px)` }, // mid-air arc
            { transform: `translate(${deltaAX * 0.15}px, ${8}px)` }, // slight overshoot down
            { transform: 'translate(0px, 0px)' } // final
        ];

        // For element B, do a subtle shift and settle (so both feel dynamic)
        const framesB = [
            { transform: `translate(${deltaBX}px, ${deltaBY}px)` },
            { transform: `translate(${deltaBX * 0.5}px, ${deltaBY + Math.min(18, baseJump * 0.18)}px)` },
            { transform: `translate(${deltaBX * 0.05}px, ${2}px)` },
            { transform: 'translate(0px, 0px)' }
        ];

        const timing = {
            duration: 920, // ms — augmenté depuis 560 pour un saut plus lent
            easing: 'cubic-bezier(.22, .9, .29, 1.05)', // un easing légèrement plus doux
            fill: 'forwards'
        };

        // Apply immediate inverse transforms so elements visually remain in place before animation starts
        a.style.transform = `translate(${deltaAX}px, ${deltaAY}px)`;
        b.style.transform = `translate(${deltaBX}px, ${deltaBY}px)`;

        // start animations
        const animA = a.animate(framesA, timing);
        const animB = b.animate(framesB, timing);

        // return a promise that resolves when both animations finish and clean up
        return Promise.all([animA.finished, animB.finished]).then(() => {
            // cleanup inline styles and classes
            a.style.transition = '';
            b.style.transition = '';
            a.style.transform = '';
            b.style.transform = '';
            a.classList.remove('swapping');
            b.classList.remove('swapping');
            delete a.dataset.swapping;
            delete b.dataset.swapping;
        }).catch(() => {
            // ensure cleanup on error/timeouts
            a.style.transform = '';
            b.style.transform = '';
            a.classList.remove('swapping');
            b.classList.remove('swapping');
            delete a.dataset.swapping;
            delete b.dataset.swapping;
        });
    }

    // Attach hover handlers: on mouseenter swap with a random other logo (use jumpSwap)
    function attachHoverSwap() {
        document.querySelectorAll(selector).forEach(img => {
            if (img._hasHoverSwap) return;
            img._hasHoverSwap = true;

            img.addEventListener('mouseenter', () => {
                const list = Array.from(document.querySelectorAll(selector));
                if (list.length < 2) return;
                const others = list.filter(x => x !== img);
                const target = others[Math.floor(Math.random() * others.length)];
                jumpSwap(img, target).catch(() => {/* ignore */});
            });
        });
    }

    // initial attach
    attachHoverSwap();

    // observe container for changes and re-attach if needed
    const logosContainer = document.querySelector('.software-logos .logos');
    if (logosContainer) {
        const observer = new MutationObserver(() => attachHoverSwap());
        observer.observe(logosContainer, { childList: true, subtree: false });
    }
});
