document.addEventListener('DOMContentLoaded', () => {
    // List of all 40 images from the Logos folder
    const cardData = [
        "AI-Audio-Studio.jpeg",
        "Amazon-Nova-Canvas.jpeg",
        "Amazon-Nova-Reel-11.jpeg",
        "Bagoodex-Web-Search.jpeg",
        "DeepClaude.jpeg",
        "DeepSeek-Prover-V2.jpeg",
        "DeepSeek-V3-old.jpeg",
        "Deepgram-Nova-3.jpeg",
        "Empirio-Search.jpeg",
        "Gemini-25-Flash-TTS.jpeg",
        "Gemini-25-Pro-TTS.jpeg",
        "Gemma-3-27B.jpeg",
        "Janus-Pro-DeepSeek.jpeg",
        "K2-Think.jpeg",
        "Linkup-Deep-Search.jpeg",
        "Linkup-Standard.jpeg",
        "Lyria-2.jpeg",
        "Magistral-Medium-2506-Thinking.jpeg",
        "Midjourney-Create.jpeg",
        "Mistral-Medium-3.jpeg",
        "Mistral-Medium-31.jpeg",
        "Mistral-Small-31.jpeg",
        "Murfai.jpeg",
        "Nova-Lite-10.jpeg",
        "Nova-Micro-10.jpeg",
        "Nova-Premier-10.jpeg",
        "Nova-Pro-10.jpeg",
        "OpenAI-audio-to-text.jpeg",
        "Perplexity-Deep-Research.jpeg",
        "Perplexity-R1-1776.jpeg",
        "Perplexity-Sonar-Pro.jpeg",
        "Perplexity-Sonar-Rsn-Pro.jpeg",
        "Perplexity-Sonar-Rsn.jpeg",
        "Perplexity-Sonar.jpeg",
        "Phi-4.jpeg",
        "Qwen-3-Max.jpeg",
        "SFX-Generator-ML.jpeg",
        "Stable-Audio-20.jpeg",
        "Stable-Audio-25.jpeg",
        "Video-and-Sound.jpeg"
    ];

    // Generate title from filename (remove .jpeg, dashes to spaces)
    function filenameToTitle(filename) {
        return filename
            .replace(/\.jpeg$/i, '')
            .replace(/-/g, ' ')
            .replace(/\b([a-z])/g, (m) => m.toUpperCase());
    }

    const container = document.querySelector('.card-stack-container');
    let cards = [];

    // Create cards dynamically for all images
    function createCards() {
        container.innerHTML = '';
        cardData.forEach((filename, i) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.index = i;
            card.innerHTML = `
                <img src="Logos/${filename}" alt="${filenameToTitle(filename)} Logo">
                <h2>${filenameToTitle(filename)}</h2>
                <p></p>
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
            container.appendChild(topCard);
            cards.push(cards.shift());

            // Reset transform so it can animate in again
            topCard.style.transition = 'none';
            topCard.style.transform = '';
            void topCard.offsetWidth;
            topCard.style.transition = '';

            updateCardStack();
        }, 400);
    }

    // Initialize
    createCards();
    updateCardStack();
});
