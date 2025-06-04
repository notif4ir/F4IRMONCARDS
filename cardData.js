// Easy to edit card data configuration
const CARD_DATA = [
    {
        id: 'franus',
        name: 'Franus',
        image: '/franus.png',
        description: 'franus is an very cool chomik, he likes seeds and cheez. (only 1 exists)',
        rarity: 'exotic',
        percentage: -1
    },
    {
        id: 'notikaper',
        name: 'Notikaper',
        image: '/notikaper (1).png',
        description: 'plays roblox, animates and tests sometimes. friend of imnotf4ir',
        rarity: 'exotic',
        percentage: -1
    },
    {
        id: 'noli',
        name: 'Noli',
        image: '/Noli (1).png',
        description: 'Yet another killer from the roblox game "Forsaken", he is very scary looking with his purple glitched appearance.',
        rarity: 'legendary',
        percentage: 1.5
    },
    {
        id: 'sonicexe',
        name: 'SONIC.EXE',
        image: '/SONIC.EXE',
        description: '.. / .- -- / --. --- -.. .-.-.- / .... .- .... .- .... .- .... .-',
        rarity: 'mythic',
        percentage: 0.7
    },
    {
        id: 'guest666',
        name: 'Guest 666',
        image: '/Guest 666.png',
        description: 'The ultimate myth back in the days, comes from roblox. 6̴̱̟̱̝̼̘͚̌̈́̂́̈̕̚͠6̶͚̳͛͌̚͜͝͠ͅ6̶̭̬̱͍̝̅̽̈́̇̔̌ͅ',
        rarity: 'mythic',
        percentage: 0.9
    },
    {
        id: 'jk',
        name: 'JK',
        image: '/JK.png',
        description: 'Worst enemy of KJ, he is the oppisite. (his attacks can only be used against KJ lol)',
        rarity: 'legendary',
        percentage: 1
    },
        {
        id: 'rush',
        name: 'Rush',
        image: '/Rush.png',
        description: 'Comes from the game Doors in Roblox, he doesnt like people that are in his way when hes rushing the halls.',
        rarity: 'common',
        percentage: 13
    },
    {
        id: 'seek',
        name: 'Seek',
        image: '/Seek.png',
        description: 'Comes from the game Doors in Roblox like Rush or Figure, it chases down anyone that irritates him.',
        rarity: 'legendary',
        percentage: 3
    },
    {
        id: 'figure',
        name: 'Figure',
        image: '/Figure.png',
        description: 'Comes from the game Doors in Roblox, it is made out of an meaty like substance. It is known for being blind and being super smelly too.',
        rarity: 'rare',
        percentage: 4
    },
    {
        id: 'c00lkid',
        name: 'C00lkid',
        image: '/c00lkid.png',
        description: 'Popular roblox hacker back in the days, killer from the game "Forsaken" on roblox. He is a very cool kid.',
        rarity: 'legendary',
        percentage: 2
    },
    {
        id: 'johndoe',
        name: 'John Doe',
        image: '/John Doe.png',
        description: 'He likes playing with playdough',
        rarity: 'rare',
        percentage: 3
    },
    {
        id: 'kj',
        name: 'KJ',
        image: '/KJ.png',
        description: 'Do not ever mess with KJ, this guy can destroy the whole universe in seconds. NAZENARINA! (comes from the KJ Saga on youtube)',
        rarity: 'legendary',
        percentage: 2
    },
    {
        id: 'jason',
        name: 'Jason',
        image: '/Jason.png',
        description: 'Killer from the game "Forsaken" on roblox and one of the popular myths back in the days.',
        rarity: 'rare',
        percentage: 4.5
    },
    {
        id: 'lxlxlxl',
        name: '1x1x1x1',
        image: '/1x1x1x1.png',
        description: 'This is 1eggs from "Forsaken" on roblox, he has an ghost like appearance. He is one of the strongest killers in forsaken, thats why he has so much power in his attacks.',
        rarity: 'mythic',
        percentage: 0.9
    },
    {
        id: 'imnotf4ir',
        name: 'Imnotf4ir',
        image: '/imnotf4ir (2).png',
        description: '(maybe) Popular roblox developer, made many games and hosts groups such as "Sub Infection Team" and "Nonexistant Studios". friend of notikaper',
        rarity: 'exotic',
        percentage: -1
    },
    {
        id: 'gubby',
        name: 'Gubby',
        image: '/Gubby.png',
        description: 'This guy is the best killer in Forsaken (lie), he is very sweet AND OVERPOWERED (lie).',
        rarity: 'common',
        percentage: 16
    },
    {
        id: 'slap',
        name: 'Slap',
        image: '/Slap.png',
        description: 'One of KJs enemies, he likes to slap KJ till he gets mad.',
        rarity: 'common',
        percentage: 12
    }
];

// Rarity configuration - easy to edit
const RARITY_CONFIG = {
    exotic: {
        label: 'Exotic',
        minPercentage: 0,
        maxPercentage: 0,
        particleCount: 15,
        glowIntensity: 'extreme'
    },
    mythic: {
        label: 'Mythic',
        minPercentage: 0,
        maxPercentage: 0.3,
        particleCount: 15,
        glowIntensity: 'very-high'
    },
    legendary: {
        label: 'Legendary',
        minPercentage: 0.3,
        maxPercentage: 3,
        particleCount: 12,
        glowIntensity: 'high'
    },
    rare: {
        label: 'Rare',
        minPercentage: 3,
        maxPercentage: 10,
        particleCount: 7,
        glowIntensity: 'medium'
    },
    common: {
        label: 'Common',
        minPercentage: 10,
        maxPercentage: 100,
        particleCount: 3,
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
