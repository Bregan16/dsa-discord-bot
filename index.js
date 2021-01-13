const Discord = require("discord.js");

const config = require("./config.json");
const dsaBasic = require("./dsa-basics.json");

const roharian = require("./user/roharian.json");
const trom = require("./user/trom.json");
const bogdan = require("./user/bogdan.json");
const yalinka = require("./user/yalinka.json");

const helper = require("./helper/talente.js");
const eigenschaften = require("./helper/eigenschaften.js");
const utils = require("./helper/utils.js");

const client = new Discord.Client();

const comamandPrefix = "!";
const userPrefix = "@";

let activeUser = null;
let qualiStufe = -1;
let rolls = [];

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(comamandPrefix)) return;

  const commandBody = message.content.slice(comamandPrefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  activeUser = getUser(message.author);

  if ("ping".indexOf(command) != -1) {
    utils.replyText(message, `Username: ${message.author.username}.`);
  } else if ("eigenschaften".indexOf(command) != -1 ) {
    eigenschaften.getEigenschaften(message, activeUser);
  } else if ("probe".indexOf(command) != -1) {
    if (args.length > 0) {
        const realTalent = utils.getRealTalent(args[0]);
        const eigenschaften = getEigenschaften();
        const fertigkeitsWert = getFertigkeitsWert(realTalent);
        if (fertigkeitsWert === undefined) {
          return;
        }
        message.reply( helper.talentProbe(realTalent, eigenschaften, fertigkeitsWert) );
    }
  }
});

const getUser = (author) => {
  const username = author.username;
  if (username === "Sindbad") {
    return roharian;
  }
  if (username === "Ram_Python") {
    return trom;
  }
  if (username === "Elijandra") {
    return yalinka;
  }
  if (username === "Starlite") {
    return bogdan;
  }
  return null;
}

const getEigenschaften = () => {
  return activeUser.eigenschaften;
}

const getFertigkeitsWert = (talent) => {
  return activeUser.talente[talent];
}

client.login(config.BOT_TOKEN);
