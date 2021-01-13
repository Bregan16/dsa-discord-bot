const dsaBasic = require("./../dsa-basics.json");

const replyText = (message, text) => {
  message.reply(text);
}

const getRealTalent = (talent) => {
  let realTalent  = '';
  Object.getOwnPropertyNames(dsaBasic.talente).map(x => {
    if ( x.toLowerCase().indexOf(talent.toLowerCase()) !== -1) {
      realTalent = x;
    }
  });
  return realTalent;
}

exports.getRealTalent = getRealTalent;
exports.replyText =  replyText;
