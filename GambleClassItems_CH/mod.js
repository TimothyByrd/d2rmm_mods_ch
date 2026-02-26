// GambleClassItems_CH

const itemsToAdd = {};
const itemsToExclude = {};

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
if (config.warlock)
    weaponTypes.push('knif'); // These used to be able to be gambled before the Warlock DLC

const weaponTypesToExclude = [];
if (config.excludeAxes)
    weaponTypesToExclude.push('axe');
if (config.excludeBows)
    weaponTypesToExclude.push('bow');
if (config.excludeXBows)
    weaponTypesToExclude.push('xbow');
if (config.excludeDaggers)
    weaponTypesToExclude.push('knif');
if (config.excludeJavelins)
    weaponTypesToExclude.push('jave');
if (config.excludeMaces)
    weaponTypesToExclude.push('club', 'mace', 'hamm');
if (config.excludePolearms)
    weaponTypesToExclude.push('pole');
if (config.excludeSpears)
    weaponTypesToExclude.push('spea');
if (config.excludeSwords)
    weaponTypesToExclude.push('swor');
if (config.excludeThrowing)
    weaponTypesToExclude.push('taxe', 'tkni');
if (config.excludeKatars)
    weaponTypesToExclude.push('h2h', 'h2h2');

const armorTypes = [];
if (config.barbarian)
    armorTypes.push('phlm');
if (config.druid)
    armorTypes.push('pelt');
if (config.necromancer)
    armorTypes.push('head');
if (config.paladin)
    armorTypes.push('ashd');
if (config.warlock)
    armorTypes.push('grim');

const armorTypesToExclude = [];
if (config.excludeHelms)
    armorTypesToExclude.push('helm');
if (config.excludeBodyArmor)
    armorTypesToExclude.push('tors');
if (config.excludeShields)
    armorTypesToExclude.push('shie');
if (config.excludeGloves)
    armorTypesToExclude.push('glov');
if (config.excludeBoots)
    armorTypesToExclude.push('boot');
if (config.excludeBelts)
    armorTypesToExclude.push('belt');
if (config.excludeCirclets)
    armorTypesToExclude.push('circ');

//console.log(`Excluding armor types: ${armorTypesToExclude}`);

function processGambleTxt(folder) {

    if (weaponTypes.length > 0 || weaponTypesToExclude.length > 0) {
        const tsvFilename = folder + '\\weapons.txt';
        const tsv = D2RMM.readTsv(tsvFilename);
        if (tsv.rows.length == 0) return;
        tsv.rows.forEach((row) => {
            if (row.spawnable == 1 && weaponTypes.indexOf(row.type) !== -1
               && (!config.normalOnly || row.code == row.normcode))
                itemsToAdd[row.code] = row.name;
            if (row.spawnable == 1 && weaponTypesToExclude.indexOf(row.type) !== -1)
                itemsToExclude[row.code] = row.name;
        });
        // D2RMM.writeTsv(tsvFilename, tsv);
    }

    if (armorTypes.length > 0 || armorTypesToExclude.length > 0) {
        const tsvFilename = folder + '\\armor.txt';
        const tsv = D2RMM.readTsv(tsvFilename);
        if (tsv.rows.length == 0) return;
        tsv.rows.forEach((row) => {
            if (row.spawnable == 1 && armorTypes.indexOf(row.type) !== -1
               && (!config.normalOnly || row.code == row.normcode))
                itemsToAdd[row.code] = row.name;
            if (row.spawnable == 1 && armorTypesToExclude.indexOf(row.type) !== -1)
                itemsToExclude[row.code] = row.name;
        });
        // D2RMM.writeTsv(tsvFilename, tsv);
    }

    // Added this because Bullrosh is getting an error:
    // TypeError: Cannot read properties of undefined (reading 'keys')
    //
    Object.keys = Object.keys || function(o) {
        var keysArray = [];
        for(var name in o) {
            if (o.hasOwnProperty(name))
                keysArray.push(name);
        }
        return keysArray;
    };

    const itemsToAddKeys = Object.keys(itemsToAdd);
    const itemsToExcludeKeys = Object.keys(itemsToExclude);

    // if (itemsToExcludeKeys.length > 0) {
    //     console.log(`Excluding ${itemsToExcludeKeys}`);
    // }

    const rowsToRemove = [];

    if (itemsToAddKeys.length > 0 || itemsToExcludeKeys.length > 0) {
        const gambleFilename = folder + '\\gamble.txt';
        const gamble = D2RMM.readTsv(gambleFilename);

        if (gamble.rows.length == 0) return;
        gamble.rows.forEach((row) => {
            const rawCode = row['code\r'];
            if (typeof rawCode !== 'undefined') {
                const code = rawCode.trim();
                if (itemsToAddKeys.indexOf(code) !== -1) {
                    delete itemsToAdd[code];
    //                console.log(`Already have ${code}`);
                }
                if (itemsToExcludeKeys.indexOf(code) !== -1) {
                    rowsToRemove.push(row);
                }
            }
        });
        if (rowsToRemove.length > 0) {
            gamble.rows = gamble.rows.filter((element, index) => !rowsToRemove.includes(element));
        }

        for (const [code, name] of Object.entries(itemsToAdd)) {
            const item = {
                name: name,
                'code\r': `${code}\r`,
            };
            gamble.rows.push(item);
        }
        D2RMM.writeTsv(gambleFilename, gamble);
    }

    if (true || config.gambleOdds) {
        const tsvFilename = folder + '\\difficultylevels.txt';
        const tsv = D2RMM.readTsv(tsvFilename);
        tsv.rows.forEach((row) => {
            row.GambleRare = config.gambleRare; // default 10000
            row.GambleSet = config.gambleSet; // default 100
            row.GambleUnique = config.gambleUnique; // default 50
            row.GambleUber = config.gambleUber; // default 90
            row["GambleUltra"] = config.gambleUltra; // default 33
        });
        D2RMM.writeTsv(tsvFilename, tsv);
    }

} // function processGambleTxt

processGambleTxt('global\\excel');
processGambleTxt('global\\excel\\base');
