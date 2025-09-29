document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    let currentTopIndex = 0;
    const Z_STEP = 20; // Depth change per card (in pixels)
    const SCALE_STEP = 0.05; // Scale change per card

    // Function to apply the stacking effect based on the card's index
    function updateCardStack() {
        cards.forEach((card, i) => {
            const relativeIndex = i - currentTopIndex;
            let z = 0;
            let scale = 1;
            
            // Only style the top 3-4 visible cards
            if (relativeIndex >= 0 && relativeIndex < 4) {
                z = relativeIndex * -Z_STEP;
                scale = 1 - (relativeIndex * SCALE_STEP);
            } else if (relativeIndex >= 4) {
                // Hide or keep invisible cards far in the back
                z = -100;
                scale = 0.8;
                card.style.opacity = 0;
            } else {
                // Hidden cards (already swiped)
                card.style.opacity = 0;
            }

            card.style.transform = `translateZ(${z}px) scale(${scale})`;
            card.style.zIndex = cards.length - i; // Higher index means it's on top
            
            // Make the top card visible and clickable for the swipe action
            if (relativeIndex === 0) {
                card.style.opacity = 1;
                card.onclick = handleSwipe;
            } else {
                card.onclick = null;
            }
        });
    }

    // Function to handle the "swipe" action on the top card
    function handleSwipe(event) {
        const topCard = event.currentTarget;
        
        // 1. Animate the top card out (e.g., to the right and rotation)
        topCard.style.transform = 'translate(800px, -200px) rotate(45deg)';
        topCard.style.opacity = 0;
        topCard.style.pointerEvents = 'none'; // Make it unclickable after swipe

        // 2. Increment the top index to shift the stack
        currentTopIndex++;

        // 3. Update the transforms for the rest of the stack after a short delay
        // This makes the second card smoothly move to the front position.
        setTimeout(() => {
            updateCardStack();
        }, 100); // 100ms delay to let the old card start moving out

        // 4. (Optional) Put the swiped card at the back of the queue (looping)
        // You would need to re-insert it into the DOM here, but we'll skip that for simplicity.
    }

    // Initialize the stack when the page loads
    updateCardStack();
});