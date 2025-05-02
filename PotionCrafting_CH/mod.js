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
    cm1: 'cm2',
    cm2: 'cm3',
    cm3: 'cm1',
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


const QUALITIES = {
    weap: [ 'nor', 'hiq', 'mag', 'rar' ],
    armo: [ 'nor', 'hiq', 'mag', 'rar' ],
    rin:  [ 'mag', 'rar' ],
    amu:  [ 'mag', 'rar' ],
    jew:  [ 'mag', 'rar' ],
    cm1:  [ 'mag' ],
    cm2:  [ 'mag' ],
    cm3:  [ 'mag' ],
};



if (config.toNormal || config.upgrade || config.reroll || config.jewelry) {
    addRecipeHeader('Reroll items');
}

if (config.reroll) {
    addRecipeEntry('Item + Stamina + Identify -> reroll item');
    addRecipeEntry('Item + Stamina + Identify + Full Rejuv -> reroll high');
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

        QUALITIES[itemType].forEach((quality) => {
            const recipe2 = {
                description: `${LABELS[quality]} ${LABELS[itemType]} + Stamina Potion + Identify Scroll + Full Rejuvination Potion -> reroll ae high level`,
                enabled: 1,
                version: 100,
                numinputs: 4,
                'input 1': `"${itemType},${quality}"`,
                'input 2': 'vps',
                'input 3': 'isc',
                'input 4': 'rvl',
                lvl: 100,
                output: `"usetype,${quality}"`,
                'output b': 'vps',
                'output c': 'isc',
                '*eol\r': 0,
            };
            cubemain.rows.push(recipe2);
        });
    });
}

if (config.toNormal) {
    addRecipeEntry('item + Antidote + Stamina -> Normal/Superior');
    ['weap', 'armo'].forEach((itemType) => {
    ['uni', 'set', 'rar', 'mag', 'hiq'].forEach((itemQuality) => {
        const recipe = {
            description: `${LABELS[itemQuality]} ${LABELS[itemType]} + Antidote Potion + Stamina Potion -> Normal item`,
            enabled: 1,
            version: 100,
            numinputs: 3,
            'input 1': `"${itemType},${itemQuality}"`,
            'input 2': 'yps',
            'input 3': 'vps',
            ilvl: 100,
            output: 'usetype,nor',
            'output b': 'vps',
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    });
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

    addRecipeEntry('charm + Anti + Stamina -> next size charm');
    addRecipeEntry('2 charms -> charm');
    ['cm1', 'cm2', 'cm3'].forEach((itemType) => {
        const recipe1 = {
            description: `2 ${LABELS[itemType]}s -> ${LABELS[itemType]}`,
            enabled: 1,
            version: 100,
            numinputs: 2,
            'input 1': `"${itemType},mag,qty=2"`,
            plvl: 100,
            output: `"${itemType},mag"`,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe1);

        const nextSize = UPGRADE[itemType]
        const recipe2 = {
            description: `${LABELS[itemType]} + Antidote Potion + Stamina Potion -> ${LABELS[nextSize]}`,
            enabled: 1,
            version: 100,
            numinputs: 3,
            'input 1': `"${itemType},mag"`,
            'input 2': 'yps',
            'input 3': 'vps',
            lvl: 100,
            output: `"${nextSize},mag"`,
            'output b': 'yps',
            'output c': 'vps',
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe2);
    });

    addRecipeEntry('Amulet + Thawing -> Jewel');
    ['mag', 'rar'].forEach((itemQuality) => {
        const recipe = {
            description: `${LABELS[itemQuality]} Amulet + Thawing Potion -> jewel`,
            enabled: 1,
            version: 100,
            numinputs: 2,
            'input 1': `"amu,${itemQuality}"`,
            'input 2': 'wms',
            ilvl: 100,
            output: `"jew,${itemQuality}"`,
            'output b': 'vps',
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    });

    addRecipeEntry('Ring + Thawing -> Charm');
    ['mag', 'rar'].forEach((itemQuality) => {
        const recipe = {
            description: `${LABELS[itemQuality]} Ring + Thawing Potion -> Small Charm`,
            enabled: 1,
            version: 100,
            numinputs: 2,
            'input 1': `"rin,${itemQuality}"`,
            'input 2': 'wms',
            ilvl: 100,
            output: '"cm1,mag"',
            'output b': 'vps',
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
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

            for (let sockets = 2; sockets <= MAX_SOCKETS[itemType]; sockets++) {
                const tier = sockets - 2;
                const potion = POTION_TYPES.Health[tier];
                const recipe = {
                    description: `${LABELS[qualityLevel]} ${LABELS[itemType]} + Stamina Potion + ${POTION_LEVELS[tier]} Health Potion -> ${sockets} Socketed ${LABELS[itemType]}`,
                    enabled: 1,
                    version: 100,
                    numinputs: 3,
                    'input 1': `"${itemType},${qualityLevel},nos"`,
                    'input 2': 'vps',
                    'input 3': potion,
                    output: `"useitem,${qualityLevel},sock=${sockets}"`,
                    'output b': 'vps',
                    'output c': potion,
                    ilvl: 100,
                    '*eol\r': 0,
                };
                cubemain.rows.push(recipe);
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
            'input 1': `"${itemType},sock"`,
            'input 2': 'wms',
            output: '"useitem,rem"',
            ilvl: 100,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    });
}

if (config.potionUpgrades || config.potionSplitting || config.healthManaConversion || config.easyRejuvinationRecipe || config.cycleThroughOtherItems) {
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
                'input 1': `"${lowerPotion},qty=2"`,
                output: upperPotion,
                '*eol\r': 0,
            };
            cubemain.rows.push(recipe);
        }
    }
}

if (config.potionSplitting) {
    addRecipeEntry('Health/Mana + Thawing -> 2 of previous tier');
    for (const [potionType, tiers] of Object.entries(POTION_TYPES)) {
        for (let tier = 0; tier <= 3; tier++) {
            const lowerPotion = tiers[tier];
            const upperPotion = tiers[tier + 1];
            const lowerLevel = POTION_LEVELS[tier];
            const upperLevel = POTION_LEVELS[tier + 1];
            const recipe = {
                description: `${upperLevel} ${potionType} + Thawing Potion -> 2 ${lowerLevel} ${potionType}`,
                enabled: 1,
                version: 100,
                numinputs: 2,
                'input 1': upperPotion,
                'input 2': 'wms',
                output: lowerPotion,
                'output b': lowerPotion,
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
    addRecipeEntry('1 Health + 1 Mana -> Small Rejuvination');
    const recipe1 = {
        description: '1 Health Potion + 1 Mana Potion -> Small Rejuvination Potion',
        enabled: 1,
        version: 100,
        numinputs: 2,
        'input 1': 'hpot',
        'input 2': 'mpot',
        output: 'rvs',
        '*eol\r': 0,
    };
    cubemain.rows.push(recipe1);
    addRecipeEntry('2 Small Rejuvination -> Full');
    const recipe2 = {
        description: '2 Small Rejuvination -> Full Rejuvination Potion',
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

const JEWEL_PREFIXES = {
    'res-all':  { label: 'All Resistaances', inputLabel: 'Perfect Diamond', input: 'gpw' },
    'res-cold': { label: 'Resist Cold', inputLabel: 'Perfect Sapphire', input: 'gpb' },
    'res-fire': { label: 'Resist Fire', inputLabel: 'Perfect Ruby', input: 'gpr' },
    'res-ltng': { label: 'Resist Lightning', inputLabel: 'Perfect Topaz', input: 'gpy' },
    'res-pois': { label: 'Resist Poison', inputLabel: 'Perfect Emerald', input: 'gpg' },
    'dmg%':     { label: '% Damage', inputLabel: 'Perfect Amethyst', input: 'gpv' },
    'dmg-max':  { label: 'Max Damage', inputLabel: 'Perfect Skull', input: 'skz' },
};

const JEWEL_SUFFIXES = {
    'swing1': { label: 'Attack Speed', inputLabel: 'Stamina Potion', input: 'vps' },
    'ease': { label: 'Lower Requirements', inputLabel: 'Thawing Potion', input: 'wms' },
};

if (config.specific) {
    addRecipeHeader('Specific charms/jewels');

    const prefixKeys = Object.keys(JEWEL_PREFIXES);
    const prefixesFound = {};
    const magicprefixFilename = 'global\\excel\\magicprefix.txt';
    const magicprefix = D2RMM.readTsv(magicprefixFilename);
    let rowNum = 0;
    magicprefix.rows.forEach((row) => {
        if (row.spawnable == '1' && row.itype1 == 'jewl' && prefixKeys.indexOf(row.mod1code) !== -1)
            prefixesFound[row.mod1code] = rowNum;
        rowNum++;
    });
    //D2RMM.writeTsv(magicprefixFilename, magicprefix);

    addRecipeEntry('Jewel + Perfect Gem -> Resist Jewel');
    addRecipeEntry('Jewel + Perfect Amethyst/Skull -> Damage Jewel');
    for (const [key, value] of Object.entries(prefixesFound)) {
        const prefixEntry = JEWEL_PREFIXES[key];
        const recipe = {
            description: `Jewel + ${prefixEntry.inputLabel} -> ${prefixEntry.label} Jewel`,
            enabled: 1,
            version: 100,
            numinputs: 2,
            'input 1': 'jew',
            'input 2': prefixEntry.input,
            ilvl: 100,
            output: `"jew,mag,pre=${value}`,
            'output b': prefixEntry.input,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    };

    const suffixKeys = Object.keys(JEWEL_SUFFIXES);
    const suffixesFound = {};
    const magicsuffixFilename = 'global\\excel\\magicsuffix.txt';
    const magicsuffix = D2RMM.readTsv(magicsuffixFilename);
    rowNum = 0;
    magicsuffix.rows.forEach((row) => {
        if (row.spawnable == '1' && row.itype1 == 'jewl' && suffixKeys.indexOf(row.mod1code) !== -1)
            suffixesFound[row.mod1code] = rowNum;
        rowNum++;
    });
    //D2RMM.writeTsv(magicsuffixFilename, magicsuffix);

    addRecipeEntry('Jewel + Stamina -> Jewel of Fervor');
    addRecipeEntry('Jewel + Thawing -> Jewel of Freedom');
    for (const [key, value] of Object.entries(suffixesFound)) {
        const suffixEntry = JEWEL_SUFFIXES[key];
        const recipe = {
            description: `Jewel + ${suffixEntry.inputLabel} -> Jewel of ${suffixEntry.label}`,
            enabled: 1,
            version: 100,
            numinputs: 2,
            'input 1': 'jew',
            'input 2': suffixEntry.input,
            ilvl: 100,
            output: `"jew,mag,suf=${value}`,
            'output b': suffixEntry.input,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    };

    Object.entries(prefixesFound).forEach(([keyp, valuep]) => {
    Object.entries(suffixesFound).forEach(([keys, values]) => {
        const prefixEntry = JEWEL_PREFIXES[keyp];
        const suffixEntry = JEWEL_SUFFIXES[keys];
        const recipe = {
            description: `Jewel + ${prefixEntry.inputLabel} + ${suffixEntry.inputLabel} -> ${prefixEntry.label} Jewel of ${suffixEntry.label}`,
            enabled: 1,
            version: 100,
            numinputs: 3,
            'input 1': 'jew',
            'input 2': prefixEntry.input,
            'input 3': suffixEntry.input,
            ilvl: 100,
            output: `"jew,mag,pre=${valuep},suf=${values}`,
            'output b': prefixEntry.input,
            'output c': suffixEntry.input,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    });
    });
}

const GCHARM_PREFIXES = {
    'Shimmering':  { label: 'Shimmering', inputLabel: 'Perfect Diamond', input: 'gpw' },
    'Sharp':  { label: 'Sharp', inputLabel: 'Perfect Skull', input: 'skz' },
};

const GCHARM_SKILL_PREFIXES = [
    { label: "Fletcher's", class: 'ama', skilltab: 0, inputLabel: 'Chipped Topaz', input: 'gcy' },
    { label: "Acrobat's", class: 'ama', skilltab: 1, inputLabel: 'Flawed Topaz', input: 'gfy' },
    { label: "Harpoonist's", class: 'ama', skilltab: 2, inputLabel: 'Flawless Topaz', input: 'gly' },
    { label: "Burning", class: 'sor', skilltab: 3, inputLabel: 'Chipped Sapphire', input: 'gcb' },
    { label: "Sparking", class: 'sor', skilltab: 4, inputLabel: 'Flawed Sapphire', input: 'gfb' },
    { label: "Chilling", class: 'sor', skilltab: 5, inputLabel: 'Flawless Sapphire', input: 'glb' },
    { label: "Hexing", class: 'nec', skilltab: 6, inputLabel: 'Chipped Skull', input: 'skc' },
    { label: "Fungal", class: 'nec', skilltab: 7, inputLabel: 'Flawed Skull', input: 'skf' },
    { label: "Graverobber's", class: 'nec', skilltab: 8, inputLabel: 'Flawless Skull', input: 'skl' },
    { label: "Lion Branded", class: 'pal', skilltab: 9, inputLabel: 'Chipped Diamond', input: 'gcw' },
    { label: "Captain's", class: 'pal', skilltab: 10, inputLabel: 'Flawed Diamond', input: 'gfw' },
    { label: "Preserver's", class: 'pal', skilltab: 11, inputLabel: 'Flawless Diamond', input: 'glw' },
    { label: "Expert's", class: 'bar', skilltab: 12, inputLabel: 'Chipped Amethyst', input: 'gcv' },
    { label: "Fanatic", class: 'bar', skilltab: 13, inputLabel: 'Flawed Amethyst', input: 'gfv' },
    { label: "Sounding", class: 'bar', skilltab: 14, inputLabel: 'Flawless Amethyst', input: 'gzv' },
    { label: "Trainer's", class: 'dru', skilltab: 15, inputLabel: 'Chipped Ruby', input: 'gcr' },
    { label: "Spiritual", class: 'dru', skilltab: 16, inputLabel: 'Flawed Ruby', input: 'gfr' },
    { label: "Nature's", class: 'dru', skilltab: 17, inputLabel: 'Flawless Ruby', input: 'glr' },
    { label: "Entrapping", class: 'ass', skilltab: 18, inputLabel: 'Chipped Emerald', input: 'gcg' },
    { label: "Mentalist's", class: 'ass', skilltab: 19, inputLabel: 'Flawed Emerald', input: 'gfg' },
    { label: "Shogukusha's", class: 'ass', skilltab: 20, inputLabel: 'Flawless Emerald', input: 'glg' },
    ];

const GCHARM_SUFFIXES = {
    'of Vita': { label: 'Vita', inputLabel: 'Health Potion', input: 'hpot', output: 'hp5' },
    'of Substinence': { label: 'Sustenance', inputLabel: 'Mana Potion', input: 'mpot', output: 'mp5' },
    'of Balance': { label: 'Balance', inputLabel: 'Thawing Potion', input: 'wms', output: 'wms' },
    'of Greed': { label: 'Greed', inputLabel: 'Portal Scroll', input: 'tsc', output: 'tsc' },
    'of Inertia': { label: 'Inertia', inputLabel: 'Stamina Potion', input: 'vps', output: 'vps' },
};

if (config.specific) {
    //addRecipeHeader('Experimental');

    const prefixKeys = Object.keys(GCHARM_PREFIXES);
    const prefixesFound = {};
    const skillPrefixesFound = [];
    const magicprefixFilename = 'global\\excel\\magicprefix.txt';
    const magicprefix = D2RMM.readTsv(magicprefixFilename);
    let rowNum = 0;
    magicprefix.rows.forEach((row) => {
        if (row.spawnable !== '1')
        {
            // do nothing
        }
        else if (row.itype1 == 'lcha' && prefixKeys.indexOf(row['Name']) !== -1)
            prefixesFound[row['Name']] = rowNum;
        else if (row.itype1 == 'lcha' && row.mod1code == 'skilltab')
            skillPrefixesFound[row.mod1param] = rowNum;
        rowNum++;
    });
    //D2RMM.writeTsv(magicprefixFilename, magicprefix);

    //console.warn(`Prefixes: ${Object.keys(prefixesFound)}`);
    //console.warn(`Skills: ${skillPrefixesFound}`);

    addRecipeEntry('Grand Charm + Chipped/Flawed/Flawless Gem -> Skiller');
    for (let index = 0; index < GCHARM_SKILL_PREFIXES.length; index++) {
        if (typeof skillPrefixesFound[index] !== 'undefined') {
            const prefixEntry = GCHARM_SKILL_PREFIXES[index];
            const recipe = {
                description: `Grand Charm + ${prefixEntry.inputLabel} -> ${prefixEntry.label} Charm`,
                enabled: 1,
                version: 100,
                numinputs: 2,
                'input 1': 'cm3',
                'input 2': prefixEntry.input,
                ilvl: 100,
                output: `"cm3,mag,pre=${skillPrefixesFound[index]}"`,
                'output b': prefixEntry.input,
                '*eol\r': 0,
            };
            cubemain.rows.push(recipe);
        }
    }

    addRecipeEntry('Grand Charm + Perfect Diamond/Skull -> Shimmering/Sharp');
    for (const [key, value] of Object.entries(prefixesFound)) {
        const prefixEntry = GCHARM_PREFIXES[key];
        const recipe = {
            description: `Grand Charm + ${prefixEntry.inputLabel} -> ${prefixEntry.label} Charm`,
            enabled: 1,
            version: 100,
            numinputs: 2,
            'input 1': 'cm3',
            'input 2': prefixEntry.input,
            ilvl: 100,
            output: `"cm3,mag,pre=${value}`,
            'output b': prefixEntry.input,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    };

    const suffixKeys = Object.keys(GCHARM_SUFFIXES);
    const suffixesFound = {};
    const magicsuffixFilename = 'global\\excel\\magicsuffix.txt';
    const magicsuffix = D2RMM.readTsv(magicsuffixFilename);
    rowNum = 0;
    magicsuffix.rows.forEach((row) => {
        if (row.spawnable == '1' && row.level < 100 && row.itype1 == 'lcha' && suffixKeys.indexOf(row['Name']) !== -1)
            suffixesFound[row['Name']] = rowNum;
        rowNum++;
    });
    //D2RMM.writeTsv(magicsuffixFilename, magicsuffix);

    //console.warn(`Suffixes: ${Object.keys(suffixesFound)}`);

    addRecipeEntry('GC + Health/Mana/Thaw/Port/Stam -> Vita/Sub/Bal/Greed/Inert');
    for (const [key, value] of Object.entries(suffixesFound)) {
        const suffixEntry = GCHARM_SUFFIXES[key];
        const recipe = {
            description: `Grand Charm + ${suffixEntry.inputLabel} -> Charm of ${suffixEntry.label}`,
            enabled: 1,
            version: 100,
            numinputs: 2,
            'input 1': 'cm3',
            'input 2': suffixEntry.input,
            ilvl: 100,
            output: `"cm3,mag,suf=${value}`,
            'output b': suffixEntry.output,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    };

    for (let index = 0; index < GCHARM_SKILL_PREFIXES.length; index++) {
        if (typeof skillPrefixesFound[index] == 'undefined') continue;
        const prefixEntry = GCHARM_SKILL_PREFIXES[index];
        const valuep = skillPrefixesFound[index];
        Object.entries(suffixesFound).forEach(([keys, values]) => {
            const suffixEntry = GCHARM_SUFFIXES[keys];
            const recipe = {
                description: `Grand Charm + ${prefixEntry.inputLabel} + ${suffixEntry.inputLabel} -> ${prefixEntry.label} Charm of ${suffixEntry.label}`,
                enabled: 1,
                version: 100,
                numinputs: 3,
                'input 1': 'cm3',
                'input 2': prefixEntry.input,
                'input 3': suffixEntry.input,
                ilvl: 100,
                output: `"cm3,mag,pre=${valuep},suf=${values}`,
                'output b': prefixEntry.input,
                'output c': suffixEntry.output,
                '*eol\r': 0,
            };
            cubemain.rows.push(recipe);
        });
    };

    Object.entries(prefixesFound).forEach(([keyp, valuep]) => {
    Object.entries(suffixesFound).forEach(([keys, values]) => {
        const prefixEntry = GCHARM_PREFIXES[keyp];
        const suffixEntry = GCHARM_SUFFIXES[keys];
        const recipe = {
            description: `Grand Charm + ${prefixEntry.inputLabel} + ${suffixEntry.inputLabel} -> ${prefixEntry.label} Charm of ${suffixEntry.label}`,
            enabled: 1,
            version: 100,
            numinputs: 3,
            'input 1': 'cm3',
            'input 2': prefixEntry.input,
            'input 3': suffixEntry.input,
            ilvl: 100,
            output: `"cm3,mag,pre=${valuep},suf=${values}`,
            'output b': prefixEntry.input,
            'output c': suffixEntry.output,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    });
    });
}

const SCHARM_PREFIXES = {
    'Shimmering':  { label: 'Shimmering', inputLabel: 'Perfect Diamond', input: 'gpw' },
    'Sapphire': { label: 'Sapphire', inputLabel: 'Perfect Sapphire', input: 'gpb' },
    'Ruby': { label: 'Ruby', inputLabel: 'Perfect Ruby', input: 'gpr' },
    'Amber': { label: 'Amber', inputLabel: 'Perfect Topaz', input: 'gpy' },
    'Emerald': { label: 'Emerald', inputLabel: 'Perfect Emerald', input: 'gpg' },
    'Fine':  { label: 'Fine', inputLabel: 'Skull', input: 'sku' },
    'Pestilent':  { label: 'Pestilent', inputLabel: 'Emerald', input: 'gsg' },
    'Shocking':  { label: 'Shocking', inputLabel: 'Topaz', input: 'gsy' },
    'Flaming':  { label: 'Flaming', inputLabel: 'Ruby', input: 'gsr' },
    'Hibernal':  { label: 'Hibernal', inputLabel: 'Sapphire', input: 'gsb' },
};

const SCHARM_SUFFIXES = {
    'of Vita': { label: 'Vita', inputLabel: 'Health Potion', input: 'hpot', output: 'hp5' },
    'of Substinence': { label: 'Sustenance', inputLabel: 'Mana Potion', input: 'mpot', output: 'mp5' },
    'of Balance': { label: 'Balance', inputLabel: 'Thawing Potion', input: 'wms', output: 'wms' },
    'of Greed': { label: 'Greed', inputLabel: 'Portal Scroll', input: 'tsc', output: 'tsc' },
    'of Inertia': { label: 'Inertia', inputLabel: 'Stamina Potion', input: 'vps', output: 'vps' },
    'of Anthrax': { label: 'Anthrax', inputLabel: 'Antidote Potion', input: 'yps', output: 'yps' },
    'of Good Luck': { label: 'Good Luck', inputLabel: 'Identify Scroll', input: 'isc', output: 'isc' },
};

if (config.specific) {
    //addRecipeHeader('Experimental');

    const prefixKeys = Object.keys(SCHARM_PREFIXES);
    const prefixesFound = {};
    const magicprefixFilename = 'global\\excel\\magicprefix.txt';
    const magicprefix = D2RMM.readTsv(magicprefixFilename);
    let rowNum = 0;
    magicprefix.rows.forEach((row) => {
        if (row.spawnable == '1' && row.itype1 == 'scha' && prefixKeys.indexOf(row['Name']) !== -1)
            prefixesFound[row['Name']] = rowNum;
        rowNum++;
    });
    //D2RMM.writeTsv(magicprefixFilename, magicprefix);

    addRecipeEntry('Small Charm + Perfect Gem -> Resist Charm');
    addRecipeEntry('Small Charm + Standard Gem -> Damage Charm');
    for (const [key, value] of Object.entries(prefixesFound)) {
        const prefixEntry = SCHARM_PREFIXES[key];
        const recipe = {
            description: `Small Charm + ${prefixEntry.inputLabel} -> ${prefixEntry.label} Charm`,
            enabled: 1,
            version: 100,
            numinputs: 2,
            'input 1': 'cm1',
            'input 2': prefixEntry.input,
            ilvl: 100,
            output: `"cm1,mag,pre=${value}`,
            'output b': prefixEntry.input,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    };

    const suffixKeys = Object.keys(SCHARM_SUFFIXES);
    const suffixesFound = {};
    const magicsuffixFilename = 'global\\excel\\magicsuffix.txt';
    const magicsuffix = D2RMM.readTsv(magicsuffixFilename);
    rowNum = 0;
    magicsuffix.rows.forEach((row) => {
        if (row.spawnable == '1' && row.level < 100 && row.itype1 == 'scha' && suffixKeys.indexOf(row['Name']) !== -1)
            suffixesFound[row['Name']] = rowNum;
        rowNum++;
    });
    //D2RMM.writeTsv(magicsuffixFilename, magicsuffix);

    addRecipeEntry('SC + Health/Mana/Thaw/Port/Stam/Anti/ID -> Vita/Sub/Bal/GF/MS/PD/MF');
    for (const [key, value] of Object.entries(suffixesFound)) {
        const suffixEntry = SCHARM_SUFFIXES[key];
        const recipe = {
            description: `Small Charm + ${suffixEntry.inputLabel} -> Charm of ${suffixEntry.label}`,
            enabled: 1,
            version: 100,
            numinputs: 2,
            'input 1': 'cm1',
            'input 2': suffixEntry.input,
            ilvl: 100,
            output: `"cm1,mag,suf=${value}`,
            'output b': suffixEntry.output,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    };

    Object.entries(prefixesFound).forEach(([keyp, valuep]) => {
    Object.entries(suffixesFound).forEach(([keys, values]) => {
        const prefixEntry = SCHARM_PREFIXES[keyp];
        const suffixEntry = SCHARM_SUFFIXES[keys];
        const recipe = {
            description: `Small Charm + ${prefixEntry.inputLabel} + ${suffixEntry.inputLabel} -> ${prefixEntry.label} Charm of ${suffixEntry.label}`,
            enabled: 1,
            version: 100,
            numinputs: 3,
            'input 1': 'cm1',
            'input 2': prefixEntry.input,
            'input 3': suffixEntry.input,
            ilvl: 100,
            output: `"cm1,mag,pre=${valuep},suf=${values}`,
            'output b': prefixEntry.input,
            'output c': suffixEntry.output,
            '*eol\r': 0,
        };
        cubemain.rows.push(recipe);
    });
    });
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
