class PokemonCardViewer {
    constructor() {
        this.cards = CARD_DATA;
        this.filteredCards = [...this.cards];
        this.currentFilter = 'all';
        this.sounds = {};
        
        this.initializeElements();
        this.loadSounds();
        this.createStarBackground();
        this.renderCards();
        this.setupEventListeners();
    }

    initializeElements() {
        this.cardsGrid = document.getElementById('cardsGrid');
        this.searchInput = document.getElementById('searchInput');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.rollBtn = document.getElementById('rollBtn');
        this.rollMultiplier = document.getElementById('rollMultiplier');
        this.modal = document.getElementById('cardModal');
        this.modalOverlay = document.getElementById('modalOverlay');
        this.modalClose = document.getElementById('modalClose');
        this.modalCardImage = document.getElementById('modalCardImage');
        this.modalCardName = document.getElementById('modalCardName');
        this.modalRarityLabel = document.getElementById('modalRarityLabel');
        this.modalRarityPercentage = document.getElementById('modalRarityPercentage');
        this.modalCardDescription = document.getElementById('modalCardDescription');
        this.modalParticles = document.getElementById('modalParticles');
    }

    createStarBackground() {
        const starsContainer = document.getElementById('stars');
        const starCount = 100;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.width = Math.random() * 3 + 1 + 'px';
            star.style.height = star.style.width;
            star.style.animationDelay = Math.random() * 2 + 's';
            star.style.animationDuration = (Math.random() * 3 + 2) + 's';
            starsContainer.appendChild(star);
        }
    }

    loadSounds() {
        // Load actual sound files
        this.sounds = {
            hover: new Audio('/hover.mp3'),
            click: new Audio('/click.mp3'),
            modal: new Audio('/modal.mp3'),
            legendary: new Audio('/legendary.mp3'),
            rare: new Audio('/rare.mp3'),
            common: new Audio('/common.mp3')
        };
        
        // Set volume for all sounds
        Object.values(this.sounds).forEach(sound => {
            sound.volume = 0.3;
        });
    }

    playSound(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play().catch(e => console.log('Sound play failed:', e));
        }
    }

    createParticles(container, rarity, count) {
        container.innerHTML = '';
        
        // Reduce particles in modal
        const isModal = container.id === 'modalParticles';
        const particleCount = isModal ? Math.min(count, 8) : count;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = `particle ${rarity}`;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(particle);
        }
    }

    createClickParticles(x, y, rarity) {
        const colors = {
            legendary: '#ffd700',
            rare: '#9b59b6',
            common: '#95a5a6'
        };
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'click-particle';
            particle.style.background = colors[rarity] || '#fff';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            const angle = (i / 12) * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            
            particle.style.setProperty('--dx', dx + 'px');
            particle.style.setProperty('--dy', dy + 'px');
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 800);
        }
    }

    createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = `card ${card.rarity}`;
        cardDiv.style.opacity = '0';
        cardDiv.style.transform = 'translateY(50px) rotateY(-15deg)';
        cardDiv.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        const rarityConfig = RARITY_CONFIG[card.rarity];
        
        cardDiv.innerHTML = `
            <div class="card-inner">
                <img src="${card.image}" alt="${card.name}" class="card-image">
                <div class="card-particles"></div>
                <div class="card-overlay">
                    <div class="card-name">${card.name}</div>
                    <div class="card-rarity">
                        <span class="rarity-badge ${card.rarity}">${rarityConfig.label}</span>
                        <span class="rarity-percentage">${card.percentage}%</span>
                    </div>
                </div>
            </div>
        `;

        // Add particles
        const particlesContainer = cardDiv.querySelector('.card-particles');
        this.createParticles(particlesContainer, card.rarity, rarityConfig.particleCount);

        // Add hover sound effect
        cardDiv.addEventListener('mouseenter', () => {
            this.playSound('hover');
        });

        // Add click event with particle effect
        cardDiv.addEventListener('click', (e) => {
            const rect = cardDiv.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;
            
            this.createClickParticles(x, y, card.rarity);
            this.playSound('click');
            
            setTimeout(() => this.openModal(card), 100);
        });

        return cardDiv;
    }

    openModal(card) {
        const rarityConfig = RARITY_CONFIG[card.rarity];
        
        this.modalCardImage.src = card.image;
        this.modalCardImage.alt = card.name;
        this.modalCardName.textContent = card.name;
        this.modalRarityLabel.textContent = rarityConfig.label;
        this.modalRarityLabel.className = `rarity-badge ${card.rarity}`;
        this.modalRarityPercentage.textContent = `${card.percentage}%`;
        this.modalCardDescription.textContent = card.description;

        // Add rarity class to modal for special effects
        this.modal.className = `modal ${card.rarity}`;

        // Create modal particles with reduced count
        this.createParticles(this.modalParticles, card.rarity, rarityConfig.particleCount);

        // Play modal sound
        this.playSound('modal');
        setTimeout(() => this.playSound(card.rarity), 200);

        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    filterCards(filter) {
        this.currentFilter = filter;
        
        if (filter === 'all') {
            this.filteredCards = [...this.cards];
        } else {
            this.filteredCards = this.cards.filter(card => card.rarity === filter);
        }
        
        this.applySearch();
        this.renderCards();
    }

    applySearch() {
        const searchTerm = this.searchInput.value.toLowerCase();
        
        if (searchTerm) {
            this.filteredCards = this.filteredCards.filter(card =>
                card.name.toLowerCase().includes(searchTerm) ||
                card.description.toLowerCase().includes(searchTerm)
            );
        }
    }

    rollRandomCard() {
        const multiplier = parseInt(this.rollMultiplier.value);
        
        // Adjust rarity weights based on multiplier
        const adjustedWeights = this.getAdjustedWeights(multiplier);
        
        // Calculate cumulative weights
        const weights = [];
        let totalWeight = 0;
        
        this.cards.forEach(card => {
            const weight = adjustedWeights[card.rarity] || 1;
            totalWeight += weight;
            weights.push(totalWeight);
        });
        
        // Generate random number and find the card
        const random = Math.random() * totalWeight;
        let selectedCard = this.cards[this.cards.length - 1]; // fallback
        
        for (let i = 0; i < weights.length; i++) {
            if (random <= weights[i]) {
                selectedCard = this.cards[i];
                break;
            }
        }
        
        // Add roll animation to button
        this.rollBtn.style.transform = 'rotate(720deg) scale(1.2)';
        this.rollBtn.disabled = true;
        
        setTimeout(() => {
            this.rollBtn.style.transform = 'rotate(0deg) scale(1)';
            this.rollBtn.disabled = false;
            this.openModal(selectedCard);
        }, 800);
        
        this.playSound('click');
    }

    getAdjustedWeights(multiplier) {
        const baseWeights = {
            common: 89.8,
            rare: 7.5,
            legendary: 2.5,
            mythic: 0.2,
            exotic: 0.0
        };

        if (multiplier === 1) {
            return baseWeights;
        }

        // 2x Roll: Boost rare+ cards significantly
        if (multiplier === 2) {
            return {
                common: 40,
                rare: 35,
                legendary: 20,
                mythic: 4.5,
                exotic: 0.5
            };
        }

        // 3x Roll: Heavily favor legendary+ cards
        if (multiplier === 3) {
            return {
                common: 10,
                rare: 25,
                legendary: 45,
                mythic: 18,
                exotic: 2
            };
        }

        return baseWeights;
    }

    setupEventListeners() {
        // Filter buttons
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.filterCards(button.dataset.filter);
            });
        });

        // Roll button
        this.rollBtn.addEventListener('click', () => {
            this.rollRandomCard();
        });

        // Search input
        this.searchInput.addEventListener('input', () => {
            this.filterCards(this.currentFilter);
        });

        // Modal events
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modalOverlay.addEventListener('click', () => this.closeModal());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });

        // Prevent modal close when clicking on modal content
        document.querySelector('.modal-content').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    renderCards() {
        this.cardsGrid.innerHTML = '';

        this.filteredCards.forEach(card => {
            const cardElement = this.createCardElement(card);
            this.cardsGrid.appendChild(cardElement);
        });

        // Enhanced entrance animation with stagger effect
        setTimeout(() => {
            const cards = this.cardsGrid.querySelectorAll('.card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) rotateY(0deg) scale(1)';
                }, index * 150 + Math.random() * 100);
            });
        }, 100);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PokemonCardViewer();
});