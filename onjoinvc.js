const { OpusEncoder } = require('@discordjs/opus');
const {Client, MessageEmbed, Message, GuildManager, GuildMember, DiscordAPIError, Discord, ClientUser} = require('discord.js');
const { readSync } = require('node:fs');

async function play(voiceChannel) {
    const connection = await voiceChannel.join();
    const dispatcher = connection.play('./Files/rr.mp3');
    dispatcher.on("end", end => {await voiceChannel.leave();});
}
module.exports = client => {
    client.on('voiceStateUpdate', (oldState, newState) => {
        if (oldState.member.user.bot) return;
        else if (newState.channelID === null) {
            const mychannel = client.channels.cache.get("839915352603361320")
            try {
                mychannel.leave()
            }
            catch (Error) {
                console.log("The bot was not in a vc")
                return;
            }
        }
        else if (newState.channelID === "839915352603361320") {
            const mychannel = client.channels.cache.get("839915352603361320")
            play(mychannel)
        }
    })
}