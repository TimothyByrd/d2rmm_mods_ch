// FasterValkyrie_CH

const amazonSkills = [ 'Valkyrie' ];
const assassinSkills = [ 'Shadow Master', 'Shadow Warrior' ];

const tsvFilename = 'global\\excel\\skills.txt';
const tsv = D2RMM.readTsv(tsvFilename);
tsv.rows.forEach((row) => {
    if ((config.amazon && amazonSkills.indexOf(row.skill) !== -1)
        || (config.assassin && assassinSkills.indexOf(row.skill) !== -1))
    {
        for (let index = 1; index <= 14; index++) {
            const key = `passivestat${index}`;
            if (row[key] == '') {
                row[key] = 'velocitypercent';
                row[`passivecalc${index}`] = 100;
                break;
            }
        }
    }
});

D2RMM.writeTsv(tsvFilename, tsv);
