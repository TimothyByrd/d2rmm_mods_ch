// PotionRecipes_CH
const cubemainFilename = 'global\\excel\\cubemain.txt';
const cubemain = D2RMM.readTsv(cubemainFilename);

const header = {
    description: 'PotionRecipes_CH',
    '*eol\r': 0,
};
cubemain.rows.push(header);

const POTION_LEVELS = [
    'Minor',
    'Light',
    'Standard',
    'Greater',
    'Super',
    ];

const POTION_TYPES = {
    'Health': [ 'hp1', 'hp2', 'hp3', 'hp4', 'hp5' ],
    'Mana':   [ 'mp1', 'mp2', 'mp3', 'mp4', 'mp5' ],
};

if (config.potionUpgrades) {
    for (const [potionType, tiers] of Object.entries(POTION_TYPES)) {
        for (let tier = 0; tier <= 3; tier++) {
            const lowerPotion = tiers[tier];
            const upperPotion = tiers[tier + 1];
            const lowerLevel = POTION_LEVELS[tier];
            const upperLevel = POTION_LEVELS[tier + 1];
            const recipe = {
                description: `2 ${lowerLevel} ${potionType} -> ${upperLevel} ${potionType}`,
                enabled: 1,
                version: 100,
                numinputs: 2,
                'input 1': `"${lowerPotion},qty=2"`, // '"' + lowerPotion + ',qty=2"',
                output: upperPotion,
                '*eol\r': 0,
            };
            cubemain.rows.push(recipe);
        }
    }
}

if (config.healthManaConversion) {
    const healthTiers = POTION_TYPES.Health;
    const manaTiers = POTION_TYPES.Mana;

    for (let tier = 0; tier <= 4; tier++) {
        const healthPotion = healthTiers[tier];
        const manaPotion = manaTiers[tier];
        const tierLabel = POTION_LEVELS[tier];
        const recipe1 = {
            description: `${tierLabel} Health -> ${tierLabel} Mana`,
            enabled: 1,
            version: 100,
            numinputs: 1,
            'input 1': healthPotion,
            output: manaPotion,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe1);
        const recipe2 = {
            description: `${tierLabel} Mana -> ${tierLabel} Health`,
            enabled: 1,
            version: 100,
            numinputs: 1,
            'input 1': manaPotion,
            output: healthPotion,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe2);
    }
}

if (config.easyRejuvinationRecipe) {
    const recipe1 = {
        description: '1 Health Potion + 1 Mana Potion -> Full Rejuvination Potion',
        enabled: 1,
        version: 100,
        numinputs: 2,
        'input 1': 'hpot',
        'input 2': 'mpot',
        output: 'rvl',
        '*eol\r': 0,
    };
    cubemain.rows.push(recipe1);
    const recipe2 = {
        description: '2 Small Rejuv -> Full Rejuvination Potion',
        enabled: 1,
        version: 100,
        numinputs: 2,
        'input 1': '"rvs,qty=2"',
        output: 'rvl',
        '*eol\r': 0,
    };
    cubemain.rows.push(recipe2);
}

const OTHER_TYPES = {
    'Antidote Potion': 'yps',
    'Stamina Potion': 'vps',
    'Thawing Potion': 'wms',
    'Identify Scroll': 'isc',
    'Portal Scroll': 'tsc',
};

if (config.cycleThroughOtherItems) {
    const otherTypes = Object.keys(OTHER_TYPES);
    for (let index = 0; index < otherTypes.length; index++) {
        const outIndex = (index + 1) % otherTypes.length;
        const inputLabel = otherTypes[index];
        const outputLabel = otherTypes[outIndex];
        const inputType = OTHER_TYPES[inputLabel];
        const outputType = OTHER_TYPES[outputLabel];
        const recipe = {
            description: `${inputLabel} -> ${outputLabel}`,
            enabled: 1,
            version: 100,
            numinputs: 1,
            'input 1': inputType,
            output: outputType,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    }
}

if (true)
{
    const recipe1 = {
        description: 'Weapon + Thawing potion -> remove items from sockets',
        enabled: 1,
        version: 100,
        numinputs: 2,
        'input 1': '"weap,any"',
        'input 2': 'wms',
        output: 'useitem,rem',
        ilvl: 100,
        '*eol\r': 0,
    };
    cubemain.rows.push(recipe1);
    const recipe2 = {
        description: 'Armor + Thawing potion -> remove items from sockets',
        enabled: 1,
        version: 100,
        numinputs: 2,
        'input 1': '"armo,any"',
        'input 2': 'wms',
        output: 'useitem,rem',
        ilvl: 100,
        '*eol\r': 0,
    };
    cubemain.rows.push(recipe2);
}


D2RMM.writeTsv(cubemainFilename, cubemain);