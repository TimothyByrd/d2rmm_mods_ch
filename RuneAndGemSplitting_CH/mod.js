// RuneAndGemSplitting_CH
const cubemainFilename = 'global\\excel\\cubemain.txt';
const cubemain = D2RMM.readTsv(cubemainFilename);

const header = {
    description: 'RuneAndGemSplitting_CH',
    '*eol\r': 0,
};
cubemain.rows.push(header);

const RUNE_NAMES = {
    r01: 'El',
    r02: 'Eld',
    r03: 'Tir',
    r04: 'Nef',
    r05: 'Eth',
    r06: 'Ith',
    r07: 'Tal',
    r08: 'Ral',
    r09: 'Ort',
    r10: 'Thul',
    r11: 'Amn',
    r12: 'Sol',
    r13: 'Shael',
    r14: 'Dol',
    r15: 'Hel',
    r16: 'Io',
    r17: 'Lum',
    r18: 'Ko',
    r19: 'Fal',
    r20: 'Lem',
    r21: 'Pul',
    r22: 'Um',
    r23: 'Mal',
    r24: 'Ist',
    r25: 'Gul',
    r26: 'Vex',
    r27: 'Ohm',
    r28: 'Lo',
    r29: 'Sur',
    r30: 'Ber',
    r31: 'Jah',
    r32: 'Cham',
    r33: 'Zod',
};

function FixRuneUpgradeRecipe(tier, numInputs) {
    const lowerRune = 'r' + tier.toString().padStart(2, '0');
    const upperRune = 'r' + (tier + 1).toString().padStart(2, '0');
    cubemain.rows.forEach((row) => {
        const input = row['input 1'];
        const output = row.output;

        if (typeof input !== 'undefined' && input.startsWith('"' + lowerRune) && output == upperRune) {
            const lowerName = RUNE_NAMES[lowerRune];
            const upperName = RUNE_NAMES[upperRune];
            row.description = `${numInputs} ${lowerName} Runes -> ${upperName} Rune`;
            row.numinputs = numInputs;
            row['input 1'] = '"' + lowerRune + ',qty='+ numInputs + '"';
            row['input 2'] = '';
            return;
        }
    });
}

if (config.runeUpgrades == 'two') {
    for (let tier = 1; tier <= 32; tier++)
        FixRuneUpgradeRecipe(tier, 2);
}
else if (config.runeUpgrades == 'noGems') {
    for (let tier = 1; tier <= 32; tier++)
        FixRuneUpgradeRecipe(tier, tier >= 21 ? 2 : 3);
}

if (config.runeSplitting) {
    for (let tier = 1; tier <= 32; tier++) {
        const lowerRune = 'r' + tier.toString().padStart(2, '0');
        const upperRune = 'r' + (tier + 1).toString().padStart(2, '0');
        const lowerName = RUNE_NAMES[lowerRune];
        const upperName = RUNE_NAMES[upperRune];
        const recipe = {
            description: `Split ${upperName} Rune -> 2 ${lowerName} Runes`,
            enabled: 1,
            version: 100,
            numinputs: 1,
            'input 1': upperRune,
            output: lowerRune,
            'output b': lowerRune,
            '*eol\r': 0,
        };
        if (config.requireThawingPotionToSplit) {
            recipe.description = `Split ${upperName} Rune + Thawing Potion -> 2 ${lowerName} Runes`;
            recipe.numinputs = 2;
            recipe['input 2'] = 'wms';
            recipe['output c'] = 'wms';
        }
        cubemain.rows.push(recipe);
    }
}

if (config.runeConversion) {
    for (let tier = 1; tier <= 33; tier++) {
        const nextTier = (tier % 33) + 1;
        const lowerRune = 'r' + tier.toString().padStart(2, '0');
        const upperRune = 'r' + (nextTier).toString().padStart(2, '0');
        const lowerName = RUNE_NAMES[lowerRune];
        const upperName = RUNE_NAMES[upperRune];
        const recipe = {
            description: `${lowerName} Rune + Antidote Potion + Stamina Potion -> ${upperName} Rune`,
            enabled: 1,
            version: 100,
            numinputs: 3,
            'input 1': lowerRune,
            'input 2': 'yps',
            'input 3': 'vps',
            output: upperRune,
            'output b': 'yps',
            'output c': 'vps',
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    }
}

const GEM_LEVELS = [
    'Chipped',
    'Flawed',
    'Standard',
    'Flawless',
    'Perfect',
    ];

const GEM_TYPES = {
    'Amethyst': [ 'gcv', 'gfv', 'gsv', 'gzv', 'gpv' ],
    'Diamond':  [ 'gcw', 'gfw', 'gsw', 'glw', 'gpw' ],
    'Emerald':  [ 'gcg', 'gfg', 'gsg', 'glg', 'gpg' ],
    'Ruby':     [ 'gcr', 'gfr', 'gsr', 'glr', 'gpr' ],
    'Sapphire': [ 'gcb', 'gfb', 'gsb', 'glb', 'gpb' ],
    'Topaz':    [ 'gcy', 'gfy', 'gsy', 'gly', 'gpy' ],
    'Skull':    [ 'skc', 'skf', 'sku', 'skl', 'skz' ],
};

function FixGemUpgradeRecipe(gemType, tier) {
    const tiers = GEM_TYPES[gemType];
    const lowerGem = tiers[tier];
    const upperGem = tiers[tier + 1];

    cubemain.rows.forEach((row) => {
        const input = row['input 1'];
        const output = row.output;

        if (typeof input !== 'undefined' && input.startsWith('"' + lowerGem) && output == upperGem) {
            const lowerLevel = GEM_LEVELS[tier];
            const upperLevel = GEM_LEVELS[tier + 1];
            row.description = `2 ${lowerLevel} -> ${upperLevel} ${gemType}`;
            row.numinputs = 2;
            row['input 1'] = '"' + lowerGem + ',qty=2"';
            return;
        }
    });
}

if (config.twoGemUpgrades) {
    Object.keys(GEM_TYPES).forEach((gemType) => {
        for (let tier = 0; tier <= 3; tier++)
            FixGemUpgradeRecipe(gemType, tier);
    })
}

if (config.gemSplitting) {
    for (const [gemType, tiers] of Object.entries(GEM_TYPES)) {
        for (let tier = 0; tier <= 3; tier++) {
            const lowerGem = tiers[tier];
            const upperGem = tiers[tier + 1];
            const lowerLevel = GEM_LEVELS[tier];
            const upperLevel = GEM_LEVELS[tier + 1];
            const recipe = {
                description: `Split ${upperLevel} ${gemType} -> 2 ${lowerLevel}`,
                enabled: 1,
                version: 100,
                numinputs: 1,
                'input 1': upperGem,
                output: lowerGem,
                'output b': lowerGem,
                '*eol\r': 0,
            };
            if (config.requireThawingPotionToSplit) {
                recipe.description = `Split ${upperLevel} ${gemType} + Thawing Potion -> 2 ${lowerLevel}`;
                recipe.numinputs = 2;
                recipe['input 2'] = 'wms';
                recipe['output c'] = 'wms';
            }
            cubemain.rows.push(recipe);
        }
    }
}

if (config.gemConversion == 'stamina') {
    const gemTypes = Object.keys(GEM_TYPES);
    for (let index = 0; index < gemTypes.length; index++) {
        const inputGemType = gemTypes[index];
        const outputGemType = gemTypes[(index + 1) % gemTypes.length];
        const inputTiers = GEM_TYPES[inputGemType];
        const outputTiers = GEM_TYPES[outputGemType];
        for (let tier = 0; tier <= 4; tier++) {
            const gemLevel = GEM_LEVELS[tier];
            const recipe = {
                description: `${gemLevel} ${inputGemType} + Stamina Potion -> ${gemLevel} ${outputGemType}`,
                enabled: 1,
                version: 100,
                numinputs: 2,
                'input 1': inputTiers[tier],
                'input 2': 'vps',
                output: outputTiers[tier],
                'output b': 'vps',
                '*eol\r': 0,
            };
            cubemain.rows.push(recipe);
        }
    }
}

if (config.gemConversion == 'chipped') {
    const gemTypes = Object.keys(GEM_TYPES);
    for (let index = 0; index < gemTypes.length; index++) {
        const outputGemType = gemTypes[index];
        const outputTiers = GEM_TYPES[outputGemType];
        for (let tier = 1; tier <= 4; tier++) {
            const gemLevel = GEM_LEVELS[tier];

            const recipe = {
                description: `2 ${gemLevel} gems + 1 Chipped ${outputGemType} -> ${gemLevel} ${outputGemType}`,
                enabled: 1,
                version: 100,
                numinputs: 3,
                'input 1': '"gem' + tier + ',2"',
                'input 2': outputTiers[0],
                output: outputTiers[tier],
                '*eol\r': 0,
            };
            cubemain.rows.push(recipe);
        }
    }
}

D2RMM.writeTsv(cubemainFilename, cubemain);