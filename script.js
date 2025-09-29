document.addEventListener('DOMContentLoaded', () => {
    // List of images and info in Logos folder
    const cardData = [
        {
            img: 'Logos/gemini-2.5-pro-tts-logo.png',
            title: 'Gemini-2.5-Pro-TTS',
            desc: 'Google’s highest‑quality text‑to‑speech model preview...'
        },
        {
            img: 'Logos/sfx-generator-ml-logo.png',
            title: 'SFX-Generator-ML',
            desc: 'Generate lifelike sound effects using text prompts...'
        },
        {
            img: 'Logos/mistral-medium-3.1-logo.png',
            title: 'Mistral-Medium-3.1',
            desc: 'A high-performance, enterprise-grade language model...'
        }
    ];

    const container = document.querySelector('.card-stack-container');
    let cards = [];

    // Create cards dynamically
    function createCards() {
        container.innerHTML = '';
        cardData.forEach((data, i) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.index = i;
            card.innerHTML = `
                <img src="${data.img}" alt="${data.title} Logo">
                <h2>${data.title}</h2>
                <p>${data.desc}</p>
            `;
            container.appendChild(card);
        });
        cards = Array.from(container.querySelectorAll('.card'));
    }

    let currentTopIndex = 0;
    const Z_STEP = 20;
    const SCALE_STEP = 0.05;

    function updateCardStack() {
        cards.forEach((card, i) => {
            const relativeIndex = (i - currentTopIndex + cards.length) % cards.length;
            let z = 0;
            let scale = 1;

            if (relativeIndex >= 0 && relativeIndex < 4) {
                z = relativeIndex * -Z_STEP;
                scale = 1 - (relativeIndex * SCALE_STEP);
                card.style.opacity = 1;
                card.style.pointerEvents = (relativeIndex === 0) ? 'auto' : 'none';
            } else {
                z = -100;
                scale = 0.8;
                card.style.opacity = 0;
                card.style.pointerEvents = 'none';
            }

            card.style.transform = `translateZ(${z}px) scale(${scale})`;
            card.style.zIndex = cards.length - relativeIndex;

            if (relativeIndex === 0) {
                card.onclick = handleSwipe;
            } else {
                card.onclick = null;
            }
        });
    }

    function handleSwipe(event) {
        const topCard = event.currentTarget;

        // Animate the top card out
        topCard.style.transform += ' translate(800px, -200px) rotate(45deg)';
        topCard.style.opacity = 0;
        topCard.style.pointerEvents = 'none';

        setTimeout(() => {
            // Move the swiped card to the end of the array for looping
            container.appendChild(topCard); // DOM order
            cards.push(cards.shift()); // JS array order

            // Reset transform so it can animate in again
            topCard.style.transition = 'none';
            topCard.style.transform = '';
            void topCard.offsetWidth; // force reflow
            topCard.style.transition = '';

            updateCardStack();
        }, 400); // Match transition duration
    }

    // Initialize
    createCards();
    updateCardStack();
});
