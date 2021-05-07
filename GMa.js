const {Client, MessageEmbed, Message, GuildManager, GuildMember, DiscordAPIError, Discord, ClientUser} = require('discord.js');
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
let generalchannel = 0
module.exports = client => {

    client.on('guildMemberAdd', member => {
        member.guild.channels.cache.map(c => {
            if (c.name.includes("general")){
                let general = client.channels.cache.get(c.id)
                generalchannel = c.id
            }
        })
        let embed = new MessageEmbed()
            .setTitle("Welcome, New Member!")
            .setColor(getRandomColor())
            .setDescription(`Welcome ${member} to the server!`)
            .setTimestamp(new Date())
        member.guild.channels.get(generalchannel).send(embed)
    })
}