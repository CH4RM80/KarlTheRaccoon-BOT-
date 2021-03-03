const {Client, MessageEmbed, Message, GuildManager, GuildMember, DiscordAPIError, Discord, ClientUser} = require('discord.js');

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
module.exports = client => {
    client.on('messageDelete', (messageDelete) => {
        channel = messageDelete.guild.channels.cache.find(i => i.name === "mod-logs")
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
    })

}