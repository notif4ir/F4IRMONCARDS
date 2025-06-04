// Easy to edit card data configuration
const CARD_DATA = [
    {
        id: 'franus',
        name: 'Franus',
        image: '/franus.png',
        description: 'A Pokémon-style trading card featuring a hamster. The card is titled "franus," and gives the hamster\'s stats: HT: 8 WT: 4 lbs. The card has two attacks: "chomik punch" for 5 damage and "chomik bite" for 100 damage.',
        rarity: 'common',
        percentage: 15.5
    },
    {
        id: 'notikaper',
        name: 'Notikaper',
        image: '/notikaper (1).png',
        description: 'A Pokémon-style trading card featuring an original character named "notikaper". The card is yellow and orange and depicts a Roblox-like character wearing a graduation cap and yellow hoodie. The card includes stats, abilities ("Pistol Pew" and "Animate Power"), and type weaknesses and resistances.',
        rarity: 'rare',
        percentage: 8.2
    },
    {
        id: 'noli',
        name: 'Noli',
        image: '/Noli (1).png',
        description: 'A Pokémon card featuring a stylized image of the Statue of Liberty, rendered in shades of purple and black. The card is titled "Noli," with a HP of 300. The Pokémon is described as "forsaken," with listed height and weight. Two moves are detailed: "Vortex Punch" (150 damage) and "Purple Charge" (100 damage to all enemies).',
        rarity: 'legendary',
        percentage: 2.1
    },
    {
        id: 'c00lkid',
        name: 'C00lkid',
        image: '/c00lkid.png',
        description: 'A Pokémon card depicting "c00lkid," a basic type with 400 HP. The card\'s artwork is primarily red and obscured, suggesting a damaged or corrupted image. The text displays the Pokémon\'s abilities: "Speed Override" (100 damage), which targets the lowest health enemy and sets it on fire, and "Pizza Delivery" (+100 health regeneration).',
        rarity: 'legendary',
        percentage: 1.8
    },
    {
        id: 'johndoe',
        name: 'John Doe',
        image: '/John Doe.png',
        description: 'A Pokémon-esque trading card featuring a Roblox character named John Doe. The card has a fiery orange background and depicts John Doe with a red, glowing eye. The card details include attack names "Corrupt Energy" and "Digital Footprint," along with HP, weakness and resistance stats.',
        rarity: 'rare',
        percentage: 7.5
    },
    {
        id: 'kj',
        name: 'KJ',
        image: '/KJ.png',
        description: 'A Pokémon card featuring a stylized illustration of KJ, a battlegrounds Pokémon. The card shows KJ with a fierce expression, primarily in shades of red and white. Its abilities include "Swift Sweep," which deals 125 damage, and "KJ Counter," which reflects damage dealt in the previous round.',
        rarity: 'rare',
        percentage: 6.8
    },
    {
        id: 'jason',
        name: 'Jason',
        image: '/Jason.png',
        description: 'This is a fan-made Pokémon card featuring Jason Voorhees from the Friday the 13th franchise. The card is designed in the style of a Pokémon card, with artwork showing Jason wearing his iconic hockey mask and wielding a machete. The card includes stats, abilities ("Sword Slash" and "Bursting Rage"), and type information.',
        rarity: 'legendary',
        percentage: 1.2
    },
    {
        id: 'lxlxlxl',
        name: '1x1x1x1',
        image: '/1x1x1x1.png',
        description: 'A Pokemon-style trading card featuring a stylized figure in sunglasses, predominantly green and red, with the name "lxlxlxl" at the top. The card details two attacks: "Mass Infection" which deals damage and weakens enemies, and "Entanglement" which blocks and damages a selected enemy.',
        rarity: 'legendary',
        percentage: 0.9
    },
    {
        id: 'imnotf4ir',
        name: 'Imnotf4ir',
        image: '/imnotf4ir (2).png',
        description: 'A Pokémon-style trading card featuring a Roblox character named "imnotf4ir." The character is depicted wearing a purple robe and a witch\'s hat, holding a green and purple drink. The card includes stats, abilities ("System Hack" and "Flaming Kick"), and artwork consistent with a Pokémon card design.',
        rarity: 'rare',
        percentage: 9.3
    },
    {
        id: 'gubby',
        name: 'Gubby',
        image: '/Gubby.png',
        description: 'A Pokémon-style trading card featuring "Gubby," a blocky, rabbit-like creature holding a shotgun. The card details Gubby\'s stats, including HP (300), attacks ("Gubby Blast" and "Kong Fu Kick"), and weaknesses/resistances. The design incorporates a dark, stylized background and clearly labeled attributes common to collectible card games.',
        rarity: 'common',
        percentage: 12.7
    }
];

// Rarity configuration - easy to edit
const RARITY_CONFIG = {
    exotic: {
        label: 'Exotic',
        minPercentage: 0,
        maxPercentage: 0,
        particleCount: 30,
        glowIntensity: 'extreme'
    },
    mythic: {
        label: 'Mythic',
        minPercentage: 0,
        maxPercentage: 0.3,
        particleCount: 25,
        glowIntensity: 'very-high'
    },
    legendary: {
        label: 'Legendary',
        minPercentage: 0.3,
        maxPercentage: 3,
        particleCount: 20,
        glowIntensity: 'high'
    },
    rare: {
        label: 'Rare',
        minPercentage: 3,
        maxPercentage: 10,
        particleCount: 12,
        glowIntensity: 'medium'
    },
    common: {
        label: 'Common',
        minPercentage: 10,
        maxPercentage: 100,
        particleCount: 6,
        glowIntensity: 'low'
    }
};

// Rarity percentage table for easy editing
const RARITY_PERCENTAGES = {
    exotic: 0.0,
    mythic: 0.2,
    legendary: 2.5,
    rare: 7.5,
    common: 89.8
};