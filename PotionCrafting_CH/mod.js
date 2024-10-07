// PotionCrafting_CH
const cubemainFilename = 'global\\excel\\cubemain.txt';
const cubemain = D2RMM.readTsv(cubemainFilename);

const header = {
    description: 'PotionCrafting_CH',
    '*eol\r': 0,
};
cubemain.rows.push(header);

function findNode(obj, key, value) {
    if (obj[key] === value) {
        return obj;
    }

    for (const k in obj) {
        if (typeof obj[k] === 'object') {
            const result = findNode(obj[k], key, value);
            if (result) {
                return result;
            }
        }
    }

    return null;
}

const recipePanelFilename = 'global\\ui\\layouts\\recipespanelhd.json';
let updateRecipesPanel = config.updateRecipesPanel !== 'disabled';
let recipePanel = null;
let optionsTable = null;
const newRecipeOptions = [];
if (updateRecipesPanel)
{
    // TODO: see if recipespanelhd.json exists?
    console.log('Trying to open recipespanelhd.json');
    recipePanel = D2RMM.readJson(recipePanelFilename);
    optionsTable = findNode(recipePanel, 'name', 'OptionsTable');
    if (optionsTable == null) {
        console.log('optionsTable is null');
        updateRecipesPanel = false;
    }
}

function addRecipeHeader(label) {
    if (updateRecipesPanel) {
        const header = {
            'type': 'TableRowWidget', 'name': 'Recipes Row',
            'children': [
            {
                'type': 'TextBoxWidget', 'name': label,
                'fields': {
                    'text': label,
                    'style': {
                        'fontColor': '$FontColorOrange',
                        'pointSize': '$LargeFontSize',
                    }
                },
                'children': [
                {
                    'type': 'ImageWidget', 'name': 'Divider',
                    'fields': {
                        'rect': { 'x': -380, 'y': 50 },
                        'filename': 'PauseMenu\\Divider',
                    }
                },
                    ]
            },
                ]
        };
        newRecipeOptions.push(header);
    }
}

function addRecipeSubheader(label, color) {
    if (updateRecipesPanel) {
        const subheader = {
            'type': 'TableRowWidget',
            'name': 'Recipes Row',
            'children': [
            {
                'type': 'TextBoxWidget',
                'name': 'Craft',
                'fields': {
                    'text': label,
                    'rect': {
                        'y': 10
                    },
                    'style': {
                        'fontColor': color,
                        'pointSize': '$MediumFontSize'
                    }
                }
            }
            ]
        };
        newRecipeOptions.push(subheader);
    }
}

function addRecipeEntry(label, color = '$FontColorWhite') {
    if (updateRecipesPanel) {
        const entry = {
            'type': 'TableRowWidget',
            'name': 'Recipes Row',
            'children': [
            {
                'type': 'TextBoxWidget',
                'name': 'Craft',
                'fields': {
                    'text': label,
                    'rect': {
                        'x': 40
                    },
                    'style': {
                        'fontColor': color,
                        'pointSize': '$SmallFontSize'
                    }
                }
            }
            ]
        };
        newRecipeOptions.push(entry);
    }
}

function addRecipeSpacer() {
    if (updateRecipesPanel) {
        const entry = {
            "type": "TableRowWidget",
            "name": "Recipes Row",
            "children": [
            {
                "type": "TextBoxWidget",
                "name": "Spacer",
                "fields": {
                    "text": "",
                    "rect": {
                        "x": 40
                    },
                    "style": {
                        "fontColor": "$FontColorWhite",
                        "pointSize": "$SmallFontSize"
                    }
                }
            }
            ]
        };
        newRecipeOptions.push(entry);
    }
}

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

const MAX_SOCKETS = {
    tors: 4,
    helm: 3,
    shld: 4,
    weap: 6,
};

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

if (config.toNormal || config.upgrade || config.reroll || config.charms || config.jewelry) {
    addRecipeHeader('Reroll items');
}

if (config.toNormal) {
    addRecipeEntry('item + Antidote + Stamina -> Normal/Superior');
    ['uni', 'set', 'rar', 'mag', 'hiq'].forEach((itemQuality) => {
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

    addRecipeEntry('item + Antidote + Identify -> Norm/Except/Elite');
    ['uni', 'set', 'rar', 'mag', 'hiq', 'nor'].forEach((itemQuality) => {
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

    addRecipeEntry('item + Antidote + Stamina + Thawing -> Ethereal');
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
    addRecipeEntry('Item + Stamina + Identify -> reroll item');
    ['weap', 'armo', 'rin', 'amu', 'jew', 'cm1', 'cm2', 'cm3'].forEach((itemType) => {
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

    addRecipeEntry('Item + Antidote + Stamina + Identify -> magic/rare');
    ['hiq', 'nor'].forEach((qualityLevel) => {
    ['weap', 'armo'].forEach((itemType) => {
        const recipe = {
            description: `${LABELS[qualityLevel]} ${LABELS[itemType]} + Antidote Potion + Stamina Potion + Identify Scroll -> reroll item as magic`,
            enabled: 1,
            version: 100,
            numinputs: 4,
            'input 1': `"${itemType},${qualityLevel}"`,
            'input 2': 'yps',
            'input 3': 'vps',
            'input 4': 'isc',
            ilvl: 100,
            output: '"usetype,mag"',
            'output b': 'vps',
            'output c': 'isc',
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    });
    });

    ['weap', 'armo', 'rin', 'amu', 'jew'].forEach((itemType) => {
        const recipe = {
            description: `Magic ${LABELS[itemType]} + Antidote Potion + Stamina Potion + Identify Scroll -> reroll item as rare`,
            enabled: 1,
            version: 100,
            numinputs: 4,
            'input 1': `"${itemType},mag"`,
            'input 2': 'yps',
            'input 3': 'vps',
            'input 4': 'isc',
            ilvl: 100,
            output: '"usetype,rar"',
            'output b': 'vps',
            'output c': 'isc',
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    });

    addRecipeEntry('Item + Antidote + Identify Tome -> set');
    ['weap', 'armo', 'rin', 'amu'].forEach((itemType) => {
        const recipe = {
            description: `${LABELS[itemType]} + Antidote Potion + Identify Tome -> reroll item as set`,
            enabled: 1,
            version: 100,
            numinputs: 3,
            'input 1': `"${itemType},noe"`,
            'input 2': 'yps',
            'input 3': 'ibk',
            ilvl: 100,
            output: '"usetype,set,noe"',
            'output b': 'yps',
            'output c': 'ibk',
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    });

    addRecipeEntry('Item + Antidote + Portal Tome -> unique');
    ['weap', 'armo', 'rin', 'amu', 'jew', 'cm1', 'cm2', 'cm3'].forEach((itemType) => {
        const recipe = {
            description: `${LABELS[itemType]} + Antidote Potion + Portal Tome -> reroll item as unique`,
            enabled: 1,
            version: 100,
            numinputs: 3,
            'input 1': `"${itemType},noe"`,
            'input 2': 'yps',
            'input 3': 'tbk',
            ilvl: 100,
            output: '"usetype,uni,noe"',
            'output b': 'yps',
            'output c': 'tbk',
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    });
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
    addRecipeEntry('2 rings -> amulet');
    AddJewelryRecipe('rin', 'mag', 'amu', 'mag');
    AddJewelryRecipe('rin', 'rar', 'amu', 'rar');

    addRecipeEntry('2 amulets -> ring');
    AddJewelryRecipe('amu', 'mag', 'rin', 'mag');
    AddJewelryRecipe('amu', 'rar', 'rin', 'rar');

    addRecipeEntry('2 magic jewels -> rare jewel');
    AddJewelryRecipe('jew', 'mag', 'jew', 'rar');

    addRecipeEntry('2 rare jewels -> magic jewel');
    AddJewelryRecipe('jew', 'rar', 'jew', 'mag');
}

if (config.charms) {
    addRecipeEntry('2 charms -> charm');
    addRecipeEntry('2 charms + Antidote -> high level charm');
    ['cm1', 'cm2', 'cm3'].forEach((itemType) => {
        const recipe = {
            description: `2 ${LABELS[itemType]}s -> ${LABELS[itemType]}`,
            enabled: 1,
            version: 100,
            numinputs: 2,
            'input 1': `"${itemType},mag,qty=2"`,
            ilvl: 100,
            output: `"${itemType},mag"`,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
        const recipe2 = {
            description: `2 ${LABELS[itemType]}s + Antidote Potion -> High level ${LABELS[itemType]}`,
            enabled: 1,
            version: 100,
            numinputs: 3,
            'input 1': `"${itemType},mag,qty=2"`,
            'input 2': 'yps',
            lvl: 100,
            output: `"${itemType},mag"`,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe2);
    });
}

if (config.upgrade) {
    addRecipeEntry('item + Antidote + Thawing -> Fully Repaired');
    ['weap', 'armo'].forEach((itemType) => {
        const recipe = {
            description: `1 ${LABELS[itemType]} + Antidote Potion + Thawing Potion -> Fully Repaired ${LABELS[itemType]}`,
            enabled: 1,
            version: 100,
            numinputs: 3,
            'input 1': `"${itemType}"`,
            'input 2': 'yps',
            'input 3': 'wms',
            output: '"useitem,rep,rch,qty=255"',
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    });
}

if (config.socketing || config.addSockets || config.removeItems) {
    addRecipeHeader('Socketing');
}

if (config.socketing) {
    addRecipeEntry('item + Stamina -> reroll toggling sockets');
    addRecipeEntry('item + Stamina + Health -> specific # of sockets');
    addRecipeEntry('item + Stamina + Full Rejuv -> 6 sockets');
    ['hiq', 'nor'].forEach((qualityLevel) => {
        ['tors', 'helm', 'shld', 'weap'].forEach((itemType) => {
            const recipeRemoveSockets = {
                description: `Socketed ${LABELS[qualityLevel]} ${LABELS[itemType]} + Stamina Potion -> remove sockets`,
                enabled: 1,
                version: 100,
                numinputs: 2,
                'input 1': `"${itemType},${qualityLevel},sock"`,
                'input 2': 'vps',
                output: `"usetype,${qualityLevel},rem"`,
                'output b': 'vps',
                ilvl: 100,
                '*eol\r': 0,
            };
            cubemain.rows.push(recipeRemoveSockets);

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

            for (let tier = 0; tier <= 4 && tier < MAX_SOCKETS[itemType]; tier++) {
                const potion = POTION_TYPES.Health[tier];
                const recipe = {
                    description: `${LABELS[qualityLevel]} ${LABELS[itemType]} + Stamina Potion + ${POTION_LEVELS[tier]} Health Potion -> ${tier + 1} Socketed ${LABELS[itemType]}`,
                    enabled: 1,
                    version: 100,
                    numinputs: 3,
                    'input 1': `"${itemType},${qualityLevel},nos"`,
                    'input 2': 'vps',
                    'input 3': potion,
                    output: `"useitem,${qualityLevel},sock=${tier + 1}"`,
//                     output: `"useitem,${qualityLevel}"`,
//                     'mod 1': 'sock',
//                     'mod 1 min': tier + 1,
//                     'mod 1 max': tier + 1,
                    'output b': 'vps',
                    'output c': potion,
                    ilvl: 100,
                    '*eol\r': 0,
                };
                cubemain.rows.push(recipe);
            }
            if (itemType == 'weap') {
                const recipe6 = {
                    description: `${LABELS[qualityLevel]} ${LABELS[itemType]} + Stamina Potion + Full Rejuvination Potion -> 6 Socketed ${LABELS[itemType]}`,
                    enabled: 1,
                    version: 100,
                    numinputs: 3,
                    'input 1': `"${itemType},${qualityLevel},nos"`,
                    'input 2': 'vps',
                    'input 3': 'rvl',
                    output: `"useitem,${qualityLevel},sock=6"`,
    //                 output: `"useitem,${qualityLevel}"`,
    //                 'mod 1': 'sock',
    //                 'mod 1 min': 6,
    //                 'mod 1 max': 6,
                    'output b': 'vps',
                    'output c': 'rvl',
                    ilvl: 100,
                    '*eol\r': 0,
                };
                cubemain.rows.push(recipe6);
            }
        });
    });
}

function AddSocketsRecipe(inQuality, numSockets) {
    ['tors', 'helm', 'shld', 'weap'].forEach((itemType) => {
        const recipe = {
            description: `${LABELS[inQuality]} ${LABELS[itemType]} + Antidote Potion + Portal Scroll -> add Socket`,
            enabled: 1,
            version: 100,
            numinputs: 3,
            'input 1': `"${itemType},${inQuality},nos"`,
            'input 2': 'yps',
            'input 3': 'tsc',
            ilvl: 100,
            output: `"useitem,sock=${numSockets}"`,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    });
}

if (config.addSockets) {
    addRecipeEntry('item + Antidote + Portal -> add Socket');
    AddSocketsRecipe('uni', 1);
    AddSocketsRecipe('set', 1);
    AddSocketsRecipe('rar', 2);
    AddSocketsRecipe('mag', 4);
}

if (config.removeItems) {
    addRecipeEntry('item + Thawing -> remove items from sockets');
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

if (config.potionUpgrades || config.healthManaConversion || config.easyRejuvinationRecipe || config.cycleThroughOtherItems) {
    addRecipeHeader('Potions');
}

if (config.potionUpgrades) {
    addRecipeEntry('2 Health/Mana potions -> next tier');
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

    addRecipeEntry('1 Health/Mana potion -> 1 Mana/Health');
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
    addRecipeEntry('1 Health + 1 Mana -> Full Rejuvination');
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
    addRecipeEntry('2 Small Rejuv -> Full Rejuvination');
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
    addRecipeEntry('Cycle: Antidote, Stamina, Thawing, Identify, Portal');
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

D2RMM.writeTsv(cubemainFilename, cubemain);

if (updateRecipesPanel) {
    if (config.updateRecipesPanel == 'top') {
        optionsTable.children = newRecipeOptions.concat(optionsTable.children);
    }
    else {
        optionsTable.children = optionsTable.children.concat(newRecipeOptions);
    }
    D2RMM.writeJson(recipePanelFilename, recipePanel);
}

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
