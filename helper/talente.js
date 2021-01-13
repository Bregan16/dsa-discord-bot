const dsaBasic = require("./../dsa-basics.json");

const talentProbe = (talent, eigenschaften, fertigkeitsWert) => {
  console.log('#### getTalent', talent, eigenschaften, fertigkeitsWert);
    const talentProben = getTalentProben(talent);
    rolls = getRolls(talentProben);
    results = getEinzelProbe(talentProben, rolls, eigenschaften);
    qualiStufe = compareRolls(results, fertigkeitsWert);
    console.log('Probe', talent, fertigkeitsWert, qualiStufe);
    if (qualiStufe === -1) {
      return `hat die ${talent} Probe nicht bestanden! (${rolls})`;
    } else if (qualiStufe === 99) {
      return `hat die ${talent} Probe Kritisch bestanden! (${rolls})`;
    } else if (qualiStufe === -99) {
      return `ist bei der ${talent} Probe ein Patzer unterlaufen! (${rolls})`;
    } else {
      return `hat die Probe in ${talent} mit Qualitätsstufe ${ qualiStufe } bestanden! (${rolls})`;
    }
};

const getTalentProben = (talent) => {
  return dsaBasic.talente[talent];
}

const getRolls = (talentProben) => {
  const rolls = talentProben.map(x => {
    return random20();
  });
  return rolls;
  // return [1,1, 5];
  // return [20,20, 5];
}

const getTalent = (args) => {
  console.log('#### getTalent', args);
  return args[0];
}

const getEinzelProbe = (talentProben, rolls, eigenschaften) => {
  let kritisch = 0;
  let patzer = 0;
  const results = talentProben.map((x, i) => {
    if (rolls[i] === 1) {
      kritisch++;
    }
    if (rolls[i] === 20) {
      patzer++;
    }
    console.log('x, i', x, eigenschaften[x.toLowerCase()], rolls[i]);
    return eigenschaften[x.toLowerCase()] - rolls[i];
  });
  console.log('results', results, kritisch, patzer);
 if (kritisch > 1) {
   return 99;
  } else if (patzer > 1) {
    return -99;
  }
  return results;
}

const compareRolls = (results, fertigkeitsWert) => {
  let result = fertigkeitsWert;
  if (results === 99) {
    return 99;
  } else if (results === -99) {
    return -99;
  }
  results.map(x => {
    if ( x < 0) {
      result += x;
    }
  });
  console.log('fertigkeits punkte', results);
  if (result < 0) {
    return -1;
  } else if (result < 4) {
    return 1;
  } else if (result < 7) {
    return 2;
  } else if (result < 10) {
    return 3;
  } else if (result < 13) {
    return 4;
  } else if (result < 16) {
    return 5;
  } else {
    return 6
  }
}

const random20 = () => {
  return Math.floor((Math.random() * 20) + 1);
}

exports.talentProbe =  talentProbe;
