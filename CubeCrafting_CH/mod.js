// CubeCrafting_CH

const cubemainFilename = 'global\\excel\\cubemain.txt';
const cubemain = D2RMM.readTsv(cubemainFilename);

const header = {
    description: 'CubeCrafting_CH',
    '*eol\r': 0,
};
cubemain.rows.push(header);

const LABELS = {
    mag: 'Magic',
    rar: 'Rare',
    rin: 'Ring',
    amu: 'Amulet',
    jew: 'Jewel',
    tors: 'Body Armor',
    helm: 'Helmet',
    shld: 'Shield',
    weap: 'Weapon',
    armo: 'Armor',
    low: 'Low Quality',
    hiq: 'Superior',
    nor: 'Normal',
    uni: 'Unique',
    set: 'Set',
    cm1: 'Small Charm',
    cm2: 'Large Charm',
    cm3: 'Grand Charm',
    bas: 'Basic',
    exc: 'Exceptional',
    eli: 'Elite',
};

const UPGRADE = {
    low: 'nor',
    nor: 'hiq',
    bas: 'exc',
    exc: 'eli',
};

if (config.removeItems) {
    ['weap', 'armo'].forEach((itemType) => {
        const recipe = {
           description: `${LABELS[itemType]} + Thawing potion -> remove items from sockets`,
           enabled: 1,
           version: 100,
           numinputs: 2,
           'input 1': `"${itemType},any"`,
           'input 2': 'wms',
           output: 'useitem,rem',
           ilvl: 100,
           '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    });
}

if (config.toNormal) {
    ['mag', 'rar', 'set', 'uni'].forEach((itemQuality) => {
        const recipe = {
            description: `${LABELS[itemQuality]} item + Antidote Potion + Stamina Potion -> Normal item`,
            enabled: 1,
            version: 100,
            numinputs: 3,
            'input 1': `"any,${itemQuality}"`,
            'input 2': 'yps',
            'input 3': 'vps',
            ilvl: 100,
            output: 'usetype,nor',
            'output b': 'vps',
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    });

    ['low', 'nor'].forEach((itemQuality) => {
    ['weap', 'armo'].forEach((itemType) => {
        const outQuality = UPGRADE[itemQuality];
        const recipe = {
            description: `${LABELS[itemQuality]} ${LABELS[itemType]} + Antidote Potion + Stamina Potion -> ${LABELS[outQuality]} ${LABELS[itemType]}`,
            enabled: 1,
            version: 100,
            numinputs: 3,
            'input 1': `"${itemType},${itemQuality}"`,
            'input 2': 'yps',
            'input 3': 'vps',
            output: `"usetype,${outQuality}"`,
            'output b': 'vps',
            ilvl: 100,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    });
    });
}

if (config.upgrade) {
    const LEVEL_REQ = {
        exc: 5,
        eli: 7,
    };

    ['uni', 'set', 'rar'].forEach((itemQuality) => {
    ['bas', 'exc'].forEach((itemLevel) => {
    ['weap', 'armo'].forEach((itemType) => {
        const outLevel = UPGRADE[itemLevel];
        const recipe = {
            description: `${LABELS[itemLevel]} ${LABELS[itemQuality]} ${LABELS[itemType]} + Antidote Potion + Identify Scroll -> ${LABELS[outLevel]} ${LABELS[itemQuality]} ${LABELS[itemType]}`,
            enabled: 1,
            version: 100,
            numinputs: 3,
            'input 1': `"${itemType},${itemLevel},${itemQuality}"`,
            'input 2': 'yps',
            'input 3': 'isc',
            output: `"useitem,mod,${outLevel}"`,
            'mod 1': 'levelreq',
            'mod 1 min': LEVEL_REQ[outLevel],
            'mod 1 max': LEVEL_REQ[outLevel],
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    });
    });
    });

    ['weap', 'armo'].forEach((itemType) => {
        const recipe = {
            description: `${LABELS[itemType]} + Antidote Potion + Stamina Potion + Thawing Potion -> Ethereal item`,
            enabled: 1,
            version: 100,
            numinputs: 4,
            'input 1': `"${itemType},noe"`,
            'input 2': 'yps',
            'input 3': 'vps',
            'input 4': 'wms',
            output: 'useitem',
            'mod 1': 'ethereal',
            'mod 1 min': 1,
            'mod 1 max': 1,
            'output b': 'vps',
            ilvl: 100,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    });
}

if (config.reroll) {
    ['weap', 'armo', 'rin', 'amu', 'jew'].forEach((itemType) => {
        const recipe = {
            description: `${LABELS[itemType]} + Stamina Potion + Identify Scroll -> reroll item`,
            enabled: 1,
            version: 100,
            numinputs: 3,
            'input 1': `"${itemType}"`,
            'input 2': 'vps',
            'input 3': 'isc',
            ilvl: 100,
            output: '"useitem,reg"',
            'output b': 'vps',
            'output c': 'isc',
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    });
}

function AddSocketsRecipe(inQuality, numSockets) {
    const recipe = {
        description: `${LABELS[inQuality]} item + Antidote Potion + Portal Scroll -> add ${numSockets} Socket`,
        enabled: 1,
        version: 100,
        numinputs: 3,
        'input 1': `"any,${inQuality},nos"`,
        'input 2': 'yps',
        'input 3': 'tsc',
        output: `"useitem,sock=${numSockets}"`,
        '*eol\r': 0,
    };
    cubemain.rows.push(recipe);
}


if (config.addSockets) {
    AddSocketsRecipe('uni', 1);
    AddSocketsRecipe('set', 2);
    AddSocketsRecipe('rar', 2);
}

if (config.socketing) {
   ['nor', 'hiq'].forEach((qualityLevel) => {
   ['tors', 'helm', 'shld', 'weap'].forEach((itemType) => {
        const recipeAddSockets = {
            description: `${LABELS[qualityLevel]} ${LABELS[itemType]} + Stamina Potion -> Socketed ${LABELS[itemType]}`,
            enabled: 1,
            version: 100,
            numinputs: 2,
            'input 1': `"${itemType},${qualityLevel},nos"`,
            'input 2': 'vps',
            output: `"useitem,${qualityLevel}"`,
            'mod 1': 'sock',
            'mod 1 min': 1,
            'mod 1 max': 6,
            'output b': 'vps',
            ilvl: 100,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipeAddSockets);

        const recipeRemoveSockets = {
            description: `Socketed ${LABELS[qualityLevel]} ${LABELS[itemType]} + Stamina Potion -> remove sockets`,
            enabled: 1,
            version: 100,
            numinputs: 2,
            'input 1': `"${itemType},${qualityLevel},sock"`,
            'input 2': 'vps',
            output: `"useitem,${qualityLevel},rem"`,
            'output b': 'vps',
            ilvl: 100,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipeRemoveSockets);
   });
   });
}

if (config.charms) {
    ['cm1', 'cm2', 'cm3'].forEach((itemType) => {
        const recipe = {
            description: `2 ${LABELS[itemType]}s -> ${LABELS[itemType]}`,
            enabled: 1,
            version: 100,
            numinputs: 2,
            'input 1': `"${itemType},mag,qty=2"`,
            lvl: 100,
            output: `"${itemType},mag"`,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    });
//     const recipe1 = {
//         description: '2 Small Charms -> Small Charm',
//         enabled: 1,
//         version: 100,
//         numinputs: 2,
//         'input 1': '"cm1,mag,qty=2"',
//         lvl: 100,
//         output: '"cm1,mag"',
//         '*eol\r': 0,
//     };
//     cubemain.rows.push(recipe1);
//     const recipe2 = {
//         description: '2 Large Charms -> Large Charm',
//         enabled: 1,
//         version: 100,
//         numinputs: 2,
//         'input 1': '"cm2,mag,qty=2"',
//         lvl: 100,
//         output: '"cm2,mag"',
//         '*eol\r': 0,
//     };
//     cubemain.rows.push(recipe2);
//     const recipe3 = {
//         description: '2 Grand Charms -> Grand Charm',
//         enabled: 1,
//         version: 100,
//         numinputs: 2,
//         'input 1': '"cm3,mag,qty=2"',
//         lvl: 100,
//         output: '"cm3,mag"',
//         '*eol\r': 0,
//     };
//     cubemain.rows.push(recipe3);
}

function AddJewelryRecipe(inType, inQuality, outType, outQuality) {
    const recipe = {
        description: `2 ${LABELS[inQuality]} ${LABELS[inType]}s -> ${LABELS[outQuality]} ${LABELS[outType]}`,
        enabled: 1,
        version: 100,
        numinputs: 2,
        'input 1': `"${inType},${inQuality},qty=2"`,
        plvl: 100,
        output: `"${outType},${outQuality}"`,
        '*eol\r': 0,
    };
    cubemain.rows.push(recipe);
}

if (config.jewelry) {
    AddJewelryRecipe('rin', 'mag', 'amu', 'mag');
    AddJewelryRecipe('rin', 'rar', 'amu', 'rar');
    AddJewelryRecipe('amu', 'mag', 'rin', 'mag');
    AddJewelryRecipe('amu', 'rar', 'rin', 'rar');
    AddJewelryRecipe('jew', 'mag', 'jew', 'rar');
    AddJewelryRecipe('jew', 'rar', 'jew', 'mag');
}

D2RMM.writeTsv(cubemainFilename, cubemain);

// from https://github.com/olegbl/d2rmm.mods/blob/main/HoradricForging/mod.js
if (config.fixUniques) {
    const uniqueitemsFilename = 'global\\excel\\uniqueitems.txt';
    const uniqueitems = D2RMM.readTsv(uniqueitemsFilename);
    uniqueitems.rows.forEach((row) => {
        row.nolimit = 1;
        if (row.lvl > 99 && row['lvl req'] <= 99) {
            row.lvl = row['lvl req'];
        }
    });
    D2RMM.writeTsv(uniqueitemsFilename, uniqueitems);
}

