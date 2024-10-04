// RuneSplitting_CH
const cubemainFilename = 'global\\excel\\cubemain.txt';
const cubemain = D2RMM.readTsv(cubemainFilename);

const header = {
    description: 'RuneSplitting_CH',
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

function FixUpgradeRecipe(tier) {
    const lowerRune = 'r' + tier.toString().padStart(2, '0');
    const upperRune = 'r' + (tier + 1).toString().padStart(2, '0');
    cubemain.rows.forEach((row) => {
        const input = row['input 1'];
        const output = row.output;

        if (typeof input !== 'undefined' && input.startsWith('"' + lowerRune) && output == upperRune) {
            const lowerName = RUNE_NAMES[lowerRune];
            const upperName = RUNE_NAMES[upperRune];
            row.description = `2 ${lowerName} Runes -> ${upperName} Rune`;
            row.numinputs = 2;
            row['input 1'] = '"' + lowerRune + ',qty=2"';
            row['input 2'] = '';
            return;
        }
    });
}

if (config.twoRuneUpgrades) {
    for (let tier = 1; tier <= 32; tier++)
        FixUpgradeRecipe(tier);
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

D2RMM.writeTsv(cubemainFilename, cubemain);