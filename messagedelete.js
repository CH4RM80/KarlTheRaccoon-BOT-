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