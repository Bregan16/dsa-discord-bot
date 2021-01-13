const Discord = require("discord.js");
const dsaBasic = require("./../dsa-basics.json");

const getEigenschaften = (message, activeUser) => {
  const eigenschaftenNamen = getEigenschaftenNamen();
  let eigenschaftenObj = [];
  const results = Object.entries(activeUser.eigenschaften).map((x, i) => {
    eigenschaftenObj.push( {'name': eigenschaftenNamen[x[0]], 'value': x[1] , inline: true } );
  });
  eigenschaftenObj.push( {'name': '-', 'value': '-', inline: true  } );

  const exampleEmbed = new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setTitle('Eigenschaften')
  .addFields(eigenschaftenObj)
  .setFooter("\u3000#".repeat(22)+"|")
  // .setImage('https://naturschutz.ch/wp-content/uploads/2018/10/cropped-Eichh%C3%B6rnchen--1068x580.jpg');
  message.channel.send(exampleEmbed);
  // message.reply(`Eigenschaften: \n${results}.`);
}

const getEigenschaftenNamen = (talent) => {
    return dsaBasic.eigenschaften;
}

exports.getEigenschaften = getEigenschaften;
