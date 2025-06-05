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
            exotic: new Audio('/exotic.mp3'),
            mythic: new Audio('/mythic.mp3'),
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
    const cardDiv = document.createElement('div')
    cardDiv.className = `card ${card.rarity}`
    cardDiv.dataset.cardId = card.id
    cardDiv.style.opacity = '0'
    cardDiv.style.transform = 'translateY(50px) rotateY(-15deg)'
    cardDiv.style.transition = 'all 0.6s ease-out'
    return cardDiv
}

getCardInnerHTML(card) {
    return `
        <div class="card-inner">
            <img src="${card.image}" alt="${card.name}" class="card-image">
            <div class="card-particles"></div>
            <div class="card-overlay">
                <div class="card-name">${card.name}</div>
                <div class="card-rarity">
                    <span class="rarity-badge ${card.rarity}">${RARITY_CONFIG[card.rarity].label}</span>
                    <span class="rarity-percentage">${card.percentage}%</span>
                </div>
            </div>
        </div>
    `
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
    this.currentFilter = filter

if (filter === 'all') {
    this.filteredCards = this.cards.filter(card => card.rarity !== 'exotic')
} else {
    this.filteredCards = this.cards.filter(card => card.rarity === filter)
}

    this.applySearch()

    const rarityOrder = ['common', 'uncommon', 'rare', 'legendary', 'mythic', 'exotic']

    this.filteredCards.sort((a, b) => {
        const rarityDiff = rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity)
        if (rarityDiff !== 0) return rarityDiff
        return parseFloat(b.percentage) - parseFloat(a.percentage)
    })

    this.renderCards()
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
    this.playSound('click')

    const multiplier = parseInt(this.rollMultiplier.value)
    const adjustedWeights = this.getAdjustedWeights(multiplier)

    const rarities = Object.keys(adjustedWeights)
    const rarityWeights = rarities.map(r => adjustedWeights[r])
    const totalRarityWeight = rarityWeights.reduce((a, b) => a + b, 0)

    let rand = Math.random() * totalRarityWeight
    let selectedRarity = rarities[0]

    for (let i = 0; i < rarities.length; i++) {
        rand -= rarityWeights[i]
        if (rand <= 0) {
            selectedRarity = rarities[i]
            break
        }
    }

    this.animateRollButton(selectedRarity)

    setTimeout(() => {
        this.rollBtn.disabled = false

        const cardsInRarity = this.cards.filter(c => c.rarity === selectedRarity)
        const totalCardWeight = cardsInRarity.reduce((sum, card) => {
            const weight = parseFloat(card.percentage)
            return isNaN(weight) ? sum : sum + weight
        }, 0)

        let randCard = Math.random() * totalCardWeight
        let selectedCard = null

        for (const card of cardsInRarity) {
            const weight = parseFloat(card.percentage)
            if (isNaN(weight) || weight <= 0) continue
            randCard -= weight
            if (randCard <= 0) {
                selectedCard = card
                break
            }
        }

        if (!selectedCard) selectedCard = cardsInRarity[Math.floor(Math.random() * cardsInRarity.length)]

        this.openModal(selectedCard)
    }, 800)
}


getAdjustedWeights(multiplier) {
const baseWeights = {
    common: 70,
    uncommon: 20,
    rare: 7.5,
    legendary: 2.3,
    mythic: 0.2,
    exotic: 0
}

if (multiplier === 2) {
    return {
        common: 45,
        uncommon: 24,
        rare: 23,
        legendary: 7,
        mythic: 3,
        exotic: 0
    }
}

if (multiplier === 3) {
    return {
        common: 0,
        uncommon: 5,
        rare: 25,
        legendary: 30,
        mythic: 15,
        exotic: 0
    }
}

    return baseWeights
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
    this.cardsGrid.innerHTML = ''
    this.cardObservers = []

    this.filteredCards.forEach(card => {
        const cardElement = this.createCardElement(card)
        this.cardsGrid.appendChild(cardElement)
        this.observeCard(cardElement)
    })
}
    
observeCard(cardElement) {
    if (!this.observer) {
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const el = entry.target
                if (entry.isIntersecting) {
                    if (!el.classList.contains('card-loaded')) {
                        const cardId = el.dataset.cardId
                        const cardData = this.cards.find(c => c.id === cardId)
                        el.innerHTML = this.getCardInnerHTML(cardData)
                        this.createParticles(el.querySelector('.card-particles'), cardData.rarity, RARITY_CONFIG[cardData.rarity].particleCount)
                        el.classList.add('card-loaded')
                        el.style.opacity = '1'
                        el.style.transform = 'translateY(0) rotateY(0deg) scale(1)'

                        el.querySelector('.card-inner').addEventListener('mouseenter', () => this.playSound('hover'))
                        el.querySelector('.card-inner').addEventListener('click', e => {
                            const x = e.clientX
                            const y = e.clientY
                            this.createClickParticles(x, y, cardData.rarity)
                            this.playSound('click')
                            setTimeout(() => this.openModal(cardData), 100)
                        })
                    }
                } else {
                    el.innerHTML = ''
                    el.classList.remove('card-loaded')
                    el.style.opacity = '0'
                    el.style.transform = 'translateY(50px) rotateY(-15deg)'
                }
            })
        }, {
            rootMargin: '200px',
            threshold: 0.05
        })
    }

    this.observer.observe(cardElement)
}
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PokemonCardViewer();
});
