// GemSplitting_CH
const cubemainFilename = 'global\\excel\\cubemain.txt';
const cubemain = D2RMM.readTsv(cubemainFilename);

const header = {
    description: 'GemSplitting_CH',
    '*eol\r': 0,
};
cubemain.rows.push(header);

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

function FixUpgradeRecipe(gemType, tier) {
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
            FixUpgradeRecipe(gemType, tier);
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

if (config.gemConversion) {
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

D2RMM.writeTsv(cubemainFilename, cubemain);