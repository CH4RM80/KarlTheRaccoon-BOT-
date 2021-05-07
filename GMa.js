const {Client, MessageEmbed, Message, GuildManager, GuildMember, DiscordAPIError, Discord, ClientUser} = require('discord.js');
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
module.exports = (client, defchannels) => {

    client.on('guildMemberAdd', member => {
        for (let i = 0; i < defchannels.length; i++) {
            let embed = new MessageEmbed()
                .setTitle("Welcome, New Member!")
                .setColor(getRandomColor())
                .setDescription(`Welcome ${member} to the server!`)
                .setTimestamp(new Date())
                .setImage(member.avatarURL({ dynamic: true, format: 'png', size: 2048 }));
            member.guild.channels.get(defchannels[i]).send(embed)
        }
    });
}