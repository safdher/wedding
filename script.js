// Add envelope lock on load to prevent scrolling
document.body.classList.add('envelope-locked');

document.addEventListener('DOMContentLoaded', () => {
    // --- Envelope Logic ---
    const waxSeal = document.getElementById('waxSeal');
    const envelope = document.querySelector('.envelope');
    const envelopeOverlay = document.getElementById('envelope-overlay');

    if (waxSeal && envelope && envelopeOverlay) {
        waxSeal.addEventListener('click', () => {
            // Open the envelope flap
            envelope.classList.add('open');

            // Wait for flap animation (1.5s) to finish, then fade out overlay
            setTimeout(() => {
                envelopeOverlay.classList.add('hidden');
                document.body.classList.remove('envelope-locked');

                // Initialize AOS animations AFTER envelope is opened
                AOS.init({
                    duration: 1000,
                    once: true,
                    offset: 100,
                    easing: 'ease-out-cubic'
                });
            }, 1500);
        });
    } else {
        // Fallback if envelope isn't present
        document.body.classList.remove('envelope-locked');
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }

    // --- Create active timeline scroll effect ---
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        // Create an active line element if it doesn't exist
        const activeLine = document.createElement('div');
        activeLine.id = 'active-line';
        timeline.appendChild(activeLine);

        const updateLine = () => {
            const timelineRect = timeline.getBoundingClientRect();
            // Calculate how far we've scrolled into the timeline
            const viewportHeight = window.innerHeight;

            // Start growing the line when timeline enters middle of viewport
            if (timelineRect.top < viewportHeight / 2) {
                let height = (viewportHeight / 2) - timelineRect.top;
                // Cap height at timeline's max height
                if (height > timelineRect.height) {
                    height = timelineRect.height;
                }
                activeLine.style.height = `${height}px`;
            } else {
                activeLine.style.height = '0px';
            }
        };

        window.addEventListener('scroll', updateLine);
        updateLine(); // Init on load
    }


});
