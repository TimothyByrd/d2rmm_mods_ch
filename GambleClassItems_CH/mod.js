// GambleClassItems_CH
const itemsToGamble = {};

const weaponTypes = [];
if (config.amazon)
    weaponTypes.push('abow', 'aspe', 'ajav');
if (config.assassin)
    weaponTypes.push('h2h');
if (config.necromancer)
    weaponTypes.push('wand');
if (config.paladin)
    weaponTypes.push('scep');
if (config.sorceress)
    weaponTypes.push('staf', 'orb');

 // Should this only add normal items, not exceptional and elite?
if (weaponTypes.length > 0) {
    const tsvFilename = 'global\\excel\\weapons.txt';
    const tsv = D2RMM.readTsv(tsvFilename);
    tsv.rows.forEach((row) => {
        if (row.spawnable == 1 && weaponTypes.indexOf(row.type) !== -1
           && (!config.normalOnly || row.code == row.normcode))
            itemsToGamble[row.code] = row.name;
    });
}

const armorTypes = [];
if (config.barbarian)
    armorTypes.push('phlm');
if (config.druid)
    armorTypes.push('pelt');
if (config.necromancer)
    armorTypes.push('head');
if (config.paladin)
    armorTypes.push('ashd');

 // Should this only add normal items, not exceptional and elite?
if (armorTypes.length > 0) {
    const tsvFilename = 'global\\excel\\armor.txt';
    const tsv = D2RMM.readTsv(tsvFilename);
    tsv.rows.forEach((row) => {
        if (row.spawnable == 1 && armorTypes.indexOf(row.type) !== -1
           && (!config.normalOnly || row.code == row.normcode))
            itemsToGamble[row.code] = row.name;
    });
}

const itemsToGambleKeys = Object.keys(itemsToGamble);

if (itemsToGambleKeys.length > 0) {
    const gambleFilename = 'global\\excel\\gamble.txt';
    const gamble = D2RMM.readTsv(gambleFilename);
    gamble.rows.forEach((row) => {
        if (itemsToGambleKeys.indexOf(row.code) !== -1) {
            delete itemsToGamble[row.code];
        }
    });
    for (const [code, name] of Object.entries(itemsToGamble)) {
        const item = {
            name: name,
            'code\r': code,
        };
        gamble.rows.push(item);
    }
    D2RMM.writeTsv(gambleFilename, gamble);
}

if (config.gambleOdds) {
    const tsvFilename = 'global\\excel\\difficultylevels.txt';
    const tsv = D2RMM.readTsv(tsvFilename);
    tsv.rows.forEach((row) => {
        row.GambleRare = 50000;
        row.GambleSet = 20000;
        row.GambleUnique = 10000;
        row.GambleUber = 100;
        row.GambleUltra = 100;
    });
    D2RMM.writeTsv(tsvFilename, tsv);
}
