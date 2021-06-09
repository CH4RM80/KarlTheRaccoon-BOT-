// const { OpusEncoder } = require('@discordjs/opus');
// const {Client, MessageEmbed, Message, GuildManager, GuildMember, DiscordAPIError, Discord, ClientUser} = require('discord.js');
// const rrchannels = require('./index.js').rickrchannels

// async function play(voiceChannel) {
//     const connection = await voiceChannel.join();
//     const dispatcher = connection.play('./Files/rr.mp3');
//     dispatcher.on("finish", async () => {await voiceChannel.leave()});
// }
// module.exports = client => {
//     client.on('voiceStateUpdate', (oldState, newState) => {
//         if (oldState.member.user.bot) return;
//         else if (newState.channelID === null) {
//             const mychannel = client.channels.cache.get(newState.channelID)
//             try {
//                 mychannel.leave()
//             }
//             catch (Error) {
//                 console.log("The bot was not in a vc")
//                 return;
//             }
//         }
//         for (let i = 0; i < rrchannels.length; i++) {
//             if (newState.channelID === rrchannels[i]) {
//                 const mychannel = client.channels.cache.get(rrchannels[i])
//                 play(mychannel)
//             }
//         }
//     })
// }