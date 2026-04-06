// Initialize AOS animations
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Create active timeline scroll effect
document.addEventListener('DOMContentLoaded', () => {
    const timeline = document.querySelector('.timeline');
    if(timeline) {
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

    // RSVP form submission simulation
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = rsvpForm.querySelector('.submit-btn');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.style.backgroundColor = 'var(--color-navy)';
            
            setTimeout(() => {
                btn.textContent = 'RSVP Sent Successfully!';
                btn.style.backgroundColor = '#28a745'; // Success green
                rsvpForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                }, 3000);
            }, 1000);
        });
    }
});
