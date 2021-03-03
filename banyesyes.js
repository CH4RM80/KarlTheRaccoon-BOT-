module.exports = client => {
    client.on('guildBanAdd', async (guild, user) => {
        channel = guild.channels.cache.find(i => i.name === "mod-logs")
        const fetchedLogs = await guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_ADD',
        });
        const banLog = fetchedLogs.entries.first();
    
        if (!banLog) return console.log(`${user.tag} was banned from ${guild.name} but no audit log could be found.`);
    
        const { executor, target } = banLog;
    
        if (target.id === user.id) {
            if(channel) {
                embed = new MessageEmbed();
                embed.setTitle("Member Banned");
                embed.setDescription(`${user.tag} was banned in ${guild.name}, by ${executor.tag}`);
                embed.setColor(getRandomColor());
                embed.setTimestamp();
                channel.send(embed);
            }
        } else {
            if(channel) {
                embed = new MessageEmbed();
                embed.setTitle("Member Banned");
                embed.setDescription(`${user.tag} was banned in ${guild.name}`);
                embed.setColor(getRandomColor());
                embed.setTimestamp();
                channel.send(embed);
            }
        }
    });
}