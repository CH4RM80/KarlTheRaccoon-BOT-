const {Client, MessageEmbed, Message, GuildManager, GuildMember, DiscordAPIError, Discord, ClientUser} = require('discord.js');
const parse = require('path')
const fs = require('fs')
const axios = require('axios').default;
async function loadData(path) {
  try {
      return await fs.readFileSync(path, 'utf8')
  } catch (err) {
      console.error(err)
      return
  }
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
module.exports = client => {
    client.on('messageDelete', async (messageDelete) => {
      let logchannels = []
      let logchannelguilds = []
      await loadData("./Files/data.json").then(cont => {
        cont = JSON.parse(cont)
        for (let i = 0; i < cont.Logchannels.length; i++) {
          logchannels.push(cont.Logchannels[i])
          logchannelguilds.push(cont.Logchannelguilds[i])
        }
      })
      if (messageDelete.member.id === "801827038234804234") return
        for (let i = 0; i < logchannelguilds.length; i++) {
          if (messageDelete.guild.id === logchannelguilds[i]) {
            channel = messageDelete.guild.channels.cache.get(logchannels[i])
            var options = {
              method: 'GET',
              url: 'https://community-purgomalum.p.rapidapi.com/json',
              params: {text: `${messageDelete.content}`},
              headers: {
                'x-rapidapi-key': '1ba1a4c77emsh7855a73a19d75aap106c51jsne0c491e53af5',
                'x-rapidapi-host': 'community-purgomalum.p.rapidapi.com'
              }
            };

            axios.request(options).then(function (response) {
              response = response.data
              if (response.result !== messageDelete.content) {
                messageDelete.content = response.result
              }
              if(channel) {
                embed = new MessageEmbed();
                embed.setTitle("Message Deleted");
                embed.setDescription(messageDelete.content);
                embed.addField('Author', messageDelete.author);
                embed.addField('Channel', messageDelete.channel);
                embed.setColor(getRandomColor());
                embed.setTimestamp();
                channel.send(embed);
            }
            }).catch(function (error) {
              console.error(error);
            });
          }
        }
    })

}