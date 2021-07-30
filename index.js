const {Client, MessageEmbed, Message, GuildManager, GuildMember, DiscordAPIError, Discord, ClientUser, ReactionUserManager, APIMessage, ReactionManager, MessageFlags} = require('discord.js');
const { parse } = require('path');
const { measureMemory } = require('vm');
const { OpusEncoder } = require('@discordjs/opus');
const messagedeletes = require('./messagedelete.js')
const banyesyes = require('./banyesyes.js');
const guildmember = require('./GMa.js');
// const onjoinvc = require('./onjoinvc.js');
const client = new Client();
const fs = require('fs')
let prefix = '>'
require('dotenv').config()
const fetch = require("node-fetch");
const ffmpeg = require('ffmpeg-static');
var unirest = require("unirest");
var axios = require("axios").default;
const { log } = require('util');
const { clear } = require('console');
const emojiRegex = require('emoji-regex/RGI_Emoji.js');
let embed = new MessageEmbed();
let allguilds = []
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
birthdayids = []
birthdays = []
let rrchannels = []
let rrguilds = []
let useractive = false
let quotechannels = []
let quotechannelguilds = []
let logchannels = []
let logchannelguilds = []
let guildmsgs = []
let pingchannel = []
let generalchannels = []
let reactionrolemsgs = []
let foundguild = false
let useridinvc = []
let userinvcid = []
let userids = []
let msgcount = []
swearingallowed = []
let on = false
let lastuserid = "";
let sAllow = false
let ownerid = "601822624867155989"
ccache = client.channels.cache
let spamchannel = []
let pages = []
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function checks(data, message) {
    if (data.error === "true") {
        message.channel.send(`Sorry senpai, ${data.message.toLowerCase()}, ${data.causedBy[0]}`)
        return
    }
    else if (data.type === "twopart") {
        message.reply(`Here's your joke: \n${data.setup}`).then(() => {
            setTimeout(() => {message.channel.send(data.delivery)}, 2000)
        })
        return
    }
    else if (data.type === "single") {
        message.reply(`Here's your joke: \n${data.joke}`)
        return
    }
}
async function loadData(path) {
    try {
        return await fs.readFileSync(path, 'utf8')
    } catch (err) {
        console.error(err)
        return
    }
}
async function saveData(data, path) {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}
async function quote(channelid) {
    const quoteraw = await fetch("http://api.quotable.io/random",)
        .then(async quoteraw => {
            const finishedquote = await quoteraw.json();
            client.channels.cache.get(channelid).send(`${finishedquote.content}\n-${finishedquote.author}`)
        })
}
async function play(voiceChannel, path) {
    const connection = await voiceChannel.join().then((connection) => {
        const dispatcher = connection.play(path)
        dispatcher.on('start', () => {
            console.log("audio is now playing!")
        })
        dispatcher.on('finish', () => {
            console.log('audio has finished playing!')
            voiceChannel.leave()
        })
        dispatcher.on('error', console.error);
    })
}
async function image(type) {
    let response = await fetch(`https://api.pgamerx.com/v3/image/${type}?api-key=SBGW8qLcfEFL`, {
	"method": "GET",
	"headers": {
		"x-api-key": "SBGW8qLcfEFL",
		"x-rapidapi-key": "1ba1a4c77emsh7855a73a19d75aap106c51jsne0c491e53af5",
		"x-rapidapi-host": "random-stuff-api.p.rapidapi.com"
	}
})
.catch(err => {
	console.error(err);
});
return response
}
// async function createAPIMessage(interaction, content) {
//     const apiMessage = await APIMessage.create(client.channels.resolve(interaction.channel_id), content)
//         .resolveData()
//         .resolveFiles()
//     return { ...apiMessage.data, files: apiMessage.files};
// }
function start() {
    spamchannel = []
    pingchannel = []
    aichannels = []
    let guilds = client.guilds.cache.map(g => g.id)
    guilds.forEach(element => {
        let guild = client.guilds.cache.get(element)
        guild.channels.cache.map(c => {
            if (c.name.includes("general")){
                let general = client.channels.cache.get(c.id)
                generalchannels.push(c.id)
                // general.send("Made a massive update, check it out with >update")
            }
            if (c.name.toLowerCase() == "spam") {
                spamchannel.push(c.id)
            }
            else if (c.name.toLowerCase() === "pingchannel") {
                pingchannel.push(c.id)
            }
            // else if (c.name.toLowerCase() === "ai") {
            //     aichannels.push(c.id)
            // }
            // else if (c.name.toLowerCase().includes("quotes")) {
            //     quotechannel.push(c.id)
            // }
        })
    });
}
function reminder() {
    let areminder = setInterval(() => {
        let user = client.users.cache.get("601822624867155989")
        user.send("Did you forget?")
        on = true
        setTimeout(() => {
            on = false
        }, 18000000)
    }, 259200000)
}
function annoy() {
    let annoying = setInterval(() => {
        let user = client.users.cache.get("868136905139683338")
        if (useractive) {
            useractive = false
            return
        }
        user.send("Chevrolet kid, talk in chat or ur ip address is mine")
    }, 360000)
}
client.once('ready', () => {
    console.log('Ready!');
    let prevtime = []
    const a = setInterval(() => {
        let retime = new Date()
        let hour = (retime.getHours() > 12) ? `${retime.getHours() - 12}`:`${retime.getHours()}` 
        let ampm = (retime.getHours() > 12) ? "PM":"AM"
        let minute = (retime.getMinutes() < 10) ? `0${retime.getMinutes()}`:`${retime.getMinutes()}`
        if (prevtime[0] !== hour || prevtime[1] !== ampm || prevtime[2] !== minute) client.user.setActivity(`say "help" or ping me to summon me! Current time(CDT): ${hour}:${minute} ${ampm}`, { type: 'PLAYING' });
        prevtime = []
        prevtime.push(hour)
        prevtime.push(ampm)
        prevtime.push(minute)
    }, 1000);
    start()
    reminder()
    annoy()
    const guildids = client.guilds.cache.map(guild => guild.id) 
    console.log(guildids)
    for (let i = 0; i < guildids.length; i++) {
        client.guilds
            .fetch(guildids[i])
            .then(guild => console.log(`"${guild.name}", ${guildids[i]}`))
            .catch(console.error)
    }
    loadData("./Files/data.json").then(cont => {
        cont = JSON.parse(cont)
        if (logchannels || logchannelguilds || quotechannelguilds || quotechannels || userids || msgcount) {
            logchannels = []
            logchannelguilds = []
            quotechannelguilds = []
            quotechannels = []
            userids = []
            msgcount = []
        }
        for (i = 0; i < cont.Logchannels.length; i++) {
            logchannels.push(cont.Logchannels[i])
            logchannelguilds.push(cont.Logchannelguilds[i])
        }
        for (i = 0; i < cont.Quotechannels.length; i++) {
            quotechannels.push(cont.Quotechannels[i])
            quotechannelguilds.push(cont.Quotechannelguilds[i])
        }
        for (i = 0; i < cont.SwearingAllowed.length; i++) {
            swearingallowed.push(cont.SwearingAllowed[i])
        }
        for (i = 0; i < cont.UserIds.length; i++) {
            userids.push(cont.UserIds[i])
            msgcount.push(cont.MsgCount[i])
        }
    })
    // client.api.applications(client.user.id).guilds("690421418114154556").commands.post({
    //     data: {
    //         name: 'say', 
    //         description: "Makes the bot say whatever you want",
    //         options: [
    //             {
    //                 name: "content",
    //                 description: "Content of the message",
    //                 type: 3,
    //                 required: true
    //             }
    //         ]
    //     }
    // })
    let e = setInterval(() => {
        for(let i = 0; i < quotechannels.length; i++) {
            quote(quotechannels[i])
        }
    }, 3600000);
    let page1 = new MessageEmbed()
    page1.setTitle("Commands")
    page1.addField(`***NEW***: ${prefix}(channel(s), setting(s)) (logs, quotes) (add, del, list) (#channel)`, "Designates channels for specific things, in development")
    page1.addField(`1: ${prefix}say (text)`, "This command makes the bot say what you want it to say");
    page1.addField(`2: ${prefix}prefix (character)`, "This command tells and sets(mod only) the prefix of the bot");
    page1.addField(`3: ${prefix}purge (int)`, "This command deletes messages(mod only)");
    page1.addField(`3: ${prefix}kick (user)`, "This command kicks members(mod only)");
    page1.addField(`3: ${prefix}ban (user)`, "This command bans members(mod only)");
    page1.addField(`4: ${prefix}help (optional: pgnumbr) (dm || stay)`, "This command lists all the commands(now with pages)");
    page1.addField(`5: ${prefix}number (int)`, "This command sends a random number");
    page1.addField(`6: ${prefix}bungou`, "This command sends some text, you should try it out!");
    page1.addField(`7: ${prefix}update`, "This command tells the new update to the bot");
    page1.addField(`8: ${prefix}messages`, "This command tells how many messages were sent today");
    page1.addField(`9: ${prefix}avatar (user)`, "This command sends the avatar of the mentioned user");
    page1.addField(`10: ${prefix}color`, "This command generates a random color(sorry stackoverflow I've done it again)");
    page1.addField(`11: ${prefix}reactionid (id)`, "This command reacts to the message that you attach via id(thanks arusok)");
    page1.addField(`12: ${prefix}dm (member)`, "DMs the mentioned user");
    page1.addField(`13. ${prefix}joke (noclean(optional))`, "This command generates a random joke");
    page1.addField(`14. ${prefix}quote`, "This command generates a random quote");
    page1.addField(`15. ${prefix}birthday ((MM/DD/YYYY) or (@user))`, "This command logs your birthday and displays the birthdays of others");
    page1.setColor(getRandomColor())
    page1.setTimestamp()
    page1.setFooter("Page 1")
    pages.push(page1)
    let page2 = new MessageEmbed()
    page1.addField(`16. ${prefix}pingme (number)`, "This command pings the user (number) times");
    page2.addField(`17. ${prefix}swear (on/off)`, "Enables or disables swear blocking in the server(mod only)");
    page2.addField(`18. ${prefix}waifu`, "Gets a random waifu, complete with anime title(courtesy of the Animu API)")
    page2.addField(`19. ${prefix}afact`, "Gets a random anime fact(courtesy of the Animu API)")
    page2.addField(`20. ${prefix}meme`, "Gets a random meme")
    page2.addField(`21. ${prefix}dank`, "Gets a random dank meme")
    page2.addField(`22. ${prefix}cat(to)`, "Gets a random cat gif/image")
    page2.addField(`23. ${prefix}dog(go)`, "Gets a random dog gif/image")
    page2.addField(`24. ${prefix}cute(aww)`, "Gets a random cute gif/image")
    page2.addField(`25. ${prefix}calc (math equation)`, "Gives answers to math problems")
    page2.addField(`26. ${prefix}eval (REDACTED)`, "REDACTED")
    page2.addField(`27. ${prefix}(channel(s), setting(s)) (logs, quotes) (add, del, list) (#channel)`, "Designates channels for specific things, in development")
    page2.addField("MORE COMMANDS COMING SOON", "psst, he's lying");
    page2.setColor(getRandomColor());
    page2.setTimestamp();
    page2.setFooter("Page 2")
    pages.push(page2)
});
// client.ws.on('INTERACTION_CREATE', async interaction => {
//     let command = interaction.data.name.toLowerCase()
//     let args = interaction.data.options
//     switch (command) {
//         case "ping":
//             client.api.interactions(interaction.id, interaction.token).callback.post({
//                 data: {
//                     type: 4,
//                     data: {
//                         content: `Ping: ${client.ws.ping}ms`
//                     }
//                 }
//             })
//         break;
//         case "say":
//             const description = args.find(arg => arg.name.toLowerCase() == "content").value
//             client.api.interactions(interaction.id, interaction.token).callback.post({
//                 data: {
//                     type: 4,
//                     data: await createAPIMessage(interaction, description)
//                 }
//             })
//         break
//     }
// })
client.on('message', async message => {
    if (message.author.bot) return;
    const lowercase = message.content.toLowerCase();
    const xspaces = message.content.toLowerCase().split(" ")
    const compiledLowercase = message.content.split(" ").join("").toLowerCase()
    let args = message.content.substring(prefix.length).split(" ")
    try {
        foundguild = false
        for (let i = 0; i < allguilds.length; i++) {
            if (message.guild.id === allguilds[i]) {
                guildmsgs[i]++
                foundguild = true
            }
        }
        if (foundguild !== true) {
            allguilds.push(message.guild.id)
            guildmsgs.push(0)
        }
        else {
            foundguild = false
        }
    } 
    catch (TypeError) {
        if (message.channel.type === "dm" && message.author.id !== "801827038234804234") {
            if (message.author.id === "601822624867155989") {
                if (message.content.toLowerCase().startsWith("n") && on === true) {
                    message.author.send(":)")
                    on = false
                }
                else if(message.content[0] === prefix) {
                    if (message.content[1] === "-") {
                        lastuserid = message.content.substring(2, 20).toString()
                    }
                    flmsg = args.splice(1, args.length - 1).join(" ");
                    try {
                        client.users.cache.get(lastuserid).send(flmsg).then(() => {
                            client.users.cache.get("601822624867155989").send(`Hypr: ${flmsg}`)
                        })
                    }
                    catch (TypeError) {return;}
                }
            }
            else {
                console.log(`${message.content}\n\n-${message.author.username}(${message.author.id})`)
                lastuserid = message.author.id.toString()
                if (message.author.id !== "601822624867155989") {
                    client.users.cache.get("601822624867155989").send(`${message.author.username}(${message.author.id}): ${message.content}`)
                }
            }
        }
        return;
    }
    // let founduser = false
    // for (let i = 0; i < userids; i++) {
    //     if (userids[i] === message.author.id) {
    //         founduser = true
    //         msgcount[i]++
    //         let thedata = {
    //             "Logchannels": logchannels,
    //             "Logchannelguilds": logchannelguilds,
    //             "Quotechannels": quotechannels,
    //             "Quotechannelguilds": quotechannelguilds,
    //             "SwearingAllowed": swearingallowed,
    //             "UserIds": userids,
    //             "MsgCount": msgcount
    //         }
    //         saveData(thedata, "./Files/data.json")
    //         if (msgcount[i].length === 3 && msgcount[i].toString().endsWith("00")) {
    //             let level1 = msgcount[i][0]
    //             embed = new MessageEmbed()
    //             embed.addField(`${message.author.tag} advanced to level ${level1}`)
    //             message.channel.send(embed)
    //         }
    //         else if (msgcount[i].length === 4 && msgcount[i].toString().endsWith("000")) {
    //             let level2 = msgcount[i].slice(0, 2)
    //             embed = new MessageEmbed()
    //             embed.addField(`${message.author.tag} advanced to level ${level2}`)
    //             message.channel.send(embed)
    //         }
    //         else if (msgcount[i].length === 5 && msgcount[i].toString().endsWith("0000")) {
    //             let level3 = msgcount[i].slice(0, 3)
    //             embed = new MessageEmbed()
    //             embed.setTitle(`${message.author.tag} advanced to level ${level3}!`)
    //             message.channel.send(embed)
    //         } 
    //     }
    // }
    // if (founduser !== true) {
    //     userids.push(message.author.id)
    //     msgcount.push(0)
    //     let msgdata = {
    //         "Logchannels": logchannels,
    //         "Logchannelguilds": logchannelguilds,
    //         "Quotechannels": quotechannels,
    //         "Quotechannelguilds": quotechannelguilds,
    //         "SwearingAllowed": swearingallowed,
    //         "UserIds": userids,
    //         "MsgCount": msgcount
    //     }
    //     saveData(msgdata, "./Files/data.json")
    // }
    if (message.author.id === "868136905139683338") useractive = true
    let channel2 = message.guild.channels.cache.find(
        channel => channel.name.toLowerCase() === "swear-equals-ban"
    )
    if (message.channel === channel2) {
        for (let i = 0; i < badwords.length; i++) {
            if (lowercase.includes(badwords[i])) {
                message.channel.messages.fetch(message.id).then(msg => msg.delete())
                message.reply("You messed with the wrong bot, get pwned").then(() => {
                    setTimeout(() => {
                        message.guild.members.ban(message.member)
                    }, 3000)
                })
                return;
            }
        }
        return
    }
    for (let i = 0; i < swearingallowed.length; i++) {
        if (message.guild.id === swearingallowed[i]) {
            sAllow = true
        }
        else {
            sAllow = false
        }
    }
    let isbad = true
    if (sAllow === false) {
        var options = {
            method: 'GET',
            url: 'https://community-purgomalum.p.rapidapi.com/containsprofanity',
            params: {text: `${message.content}`},
            headers: {
              'x-rapidapi-key': '1ba1a4c77emsh7855a73a19d75aap106c51jsne0c491e53af5',
              'x-rapidapi-host': 'community-purgomalum.p.rapidapi.com'
            }
          };
          axios.request(options).then(function (response) {
                if (JSON.parse(response.data) === true) {
                    message.channel.messages.fetch(message.id).then(msg => msg.delete())
                    message.reply(`Thou shalt not send unholy words in the holy chat of this holy server!`).then((msg)=> {msg.delete({timeout: 8000})})
                    for (let i = 0; i < logchannelguilds.length; i++) {
                        if (logchannelguilds[i] === message.guild.id) {
                            embed = new MessageEmbed()
                            embed.setColor('RANDOM')
                            embed.setTitle(`Word triggered in ${message.channel.name}`)
                            embed.addField("Info", `User: ${message.author.tag}\nUncensored: ${message.content}`)
                            client.channels.cache.get(logchannels[i]).send(embed)
                        }
                    }
                }
          }).catch(function (error) {
              console.error(error);
          });
    }
    if (message.content[0] === prefix) {
        switch(args[0].toLowerCase()) {
            case "say":
                message.channel.messages.fetch(message.id).then(msg => msg.delete())
                if (message.mentions.members.first()) {
                    message.reply("bruh really, no pinging tyvm");
                } 
                else if (lowercase.includes("discord.gg")) {
                    message.reply("No advertising, tyvm");
                } 
                else {
                    fullmessage = args.splice(1, args.length - 1).join(" ");
                    message.channel.send(`‍‍${fullmessage}`);
                }
            break;
            case "prefix":
                if (args[1] && (message.member.hasPermission('ADMINISTRATOR'))) {
                    prefix = args[1][0]
                    message.channel.send(`The prefix has been changed to \`${prefix}\``)
                } else {
                    message.reply(`The current prefix is \`${prefix}\``);
                }
            break;
            case "help":
                if (args[1]) {
                    if (parseInt(args[1])) {
                        if (args[2]) {
                            if (args[2] === "stay") {message.channel.send(pages[parseInt(args[1] - 1)]).catch(err => {message.channel.send(pages[0]); console.log(err)})}
                            else if (args[2] === "dm") {message.author.send(pages[0]).then(() => {message.author.send(pages[1])})}
                            else {
                                try {
                                    message.channel.send(pages[parseInt(args[1])])
                                    .then(msg => {
                                        msg.delete({timeout: 20000})
                                            .catch(err => {console.log(err)})
                                    })
                                }
                                catch (error) {
                                    message.channel.send(pages[0])
                                    .then(msg => {
                                        msg.delete({timeout: 20000})
                                            .catch(err => {console.log(err)})
                                    })
                                }
                            }
                        }
                        else {
                            try {
                                message.channel.send(pages[parseInt(args[1] - 1)])
                                .then(msg => {
                                    msg.delete({timeout: 20000})
                                        .catch(err => {console.log(err)})
                                })
                            }
                            catch (error) {
                                message.channel.send(pages[0])
                                .then(msg => {
                                    msg.delete({timeout: 20000})
                                        .catch(err => {console.log(err)})
                                })
                            }
                        }
                    }
                    else {
                        if (args[1] == "stay") {message.channel.send(pages[0])}
                        else if (args[1] == "dm") {message.author.send(pages[0]).then(() => {message.author.send(pages[1])})}
                        else {
                            try {
                                message.channel.send(pages[0])
                                .then(msg => {
                                    msg.delete({timeout: 20000})
                                        .catch(err => {console.log(err)})
                                })
                            }
                            catch (error) {console.log(error)}
                        }
                    }
                }
                else {
                    try {
                        message.channel.send(pages[0])
                        .then(msg => {
                            msg.delete({timeout: 20000})
                                .catch(err => {console.log(err)})
                        })
                    }
                    catch (error) {console.log(error)}
                }
            break;
            case "number":
                if(args[1]) {
                    let num = parseInt(args[1])
                    message.reply(`your number between 1 and ${num} is: \`\`\`${Math.floor(Math.random() * num) + 1}\`\`\``)
                } else {
                    message.reply(`your number between 1 and 100 is: \`\`\`${Math.floor(Math.random() * 100) + 1}\`\`\``)
                }
            break;
            case "purge":
                if (message.member.hasPermission('MANAGE_MESSAGES')) {
                    newsplit = message.content.split(" ");
                    if (newsplit.length === 1) {
                        message.channel.bulkDelete(2);
                    } else {
                        message.channel.bulkDelete(parseInt(newsplit[1]) + 1);
                    }
                }
                else {
                    message.channel.send("Sadly you do not have the permissions to use this command")
                }
            break;
            case "bungou":
                let bungou = new MessageEmbed()
                bungou.setTitle("Bungou Stray Dogs")
                bungou.setDescription("Bungo Stray Dogs (Japanese: 文豪ストレイドッグス, Hepburn: Bungō Sutorei Doggusu, lit. 'Literary Stray Dogs') is a Japanese seinen manga series written by Kafka Asagiri and illustrated by Sango Harukawa, which has been serialized in the magazine Young Ace since 2012. The series follows the members of the 'Armed Detective Agency' throughout their everyday lives. The show mainly focuses on the weretiger Atsushi Nakajima, who joins others gifted with supernatural powers to accomplish different tasks including running a business, solving mysteries, and carrying out missions assigned by the mafia.Multiple light novels have been published. An anime television series adaptation by Bones aired in 2016 in two parts, the first part aired between 7 April 2016 and 23 June 2016, and the second part aired between 6 October 2016 and 22 December 2016. An anime film, Bungo Stray Dogs: Dead Apple, was released on 3 March 2018. A third season aired between 12 April 2019 and 28 June 2019. A spin-off television series adaptation of Bungo Stray Dogs Wan! premiered on 13 January 2021. Another film, Bungo Stray Dogs The Movie: Beast, was confirmed in March 2020 to be in development");
                bungou.addField("Where to watch", "https://animepahe.com/\nhttps://animevibe.wtf/\nhttps://animixplay.to/")
                bungou.setColor(getRandomColor());
                bungou.setTimestamp();
                message.channel.send(bungou);
            break;
            case "kick":
                const member = message.mentions.members.first();
                if (args[1] && (message.member.hasPermission('KICK_MEMBERS'))) {
                    try {
                    member.kick().then(() => {
                        console.log(`${member} was kicked`)
                        message.channel.send(`${member} was kicked`)
                    })
                } catch (TypeError) {
                    message.channel.send("member not kicked")
                    return
                }
                } else {
                    message.reply("you can't use that")
                }
            break;
            case "ban":
                const user = message.mentions.users.first();
                if(args[1] && (message.member.hasPermission('BAN_MEMBERS'))) {
                    try {
                        message.guild.members.ban(user).then(() => {
                            console.log(`${user} was banned`)
                            message.channel.send(`${user} was banned`, {
                                files: [
                                    "./Files/ban.mp4"
                                ]
                            })
                        })
                    }
                    catch (Error) {
                        message.channel.send("member not banned")
                        return
                    }
                } else {
                    message.reply("you can't use that")
                }
            break;
            case "update" :
                message.channel.send(`\`\`\`Added ${prefix}channel, check it out with ${prefix}help\`\`\``)
            break;
            case "messages":
            case "message":
                for (let i = 0; i < allguilds.length; i++) {
                    if (message.guild.id === allguilds[i]) {
                        message.channel.send(`There were \`${guildmsgs[i]}\` messages sent since the last bot update`)
                    }
                }
            break;
            case "avatar":
                let us = message.mentions.users.first() || message.author;
                if (us) {
                    let avatar = new MessageEmbed()
                    avatar.setTitle(`${us.username} Avatar`);
                    avatar.setImage(us.avatarURL({ dynamic: true, format: 'png', size: 2048 }));
                    avatar.setColor(getRandomColor())
                    message.channel.send(avatar)
                }
            break;
            case "color":
                randcolor = getRandomColor()
                try {
                    let color = new MessageEmbed()
                        .setColor(randcolor)
                        .setTitle("Random Color Generated")
                        .setDescription(`Your random color is https://www.color-hex.com/color/${randcolor.substring(1, 7)}`)
                    message.channel.send(color)
                }
                catch (error) {
                    message.channel.send(`I tried to send the embed to the current channel, but it appears I don't have the permissions uwu\nThis is roughly what I tried to send:\nRandom Color Generated\n\nYour random color is https://www.color-hex.com/color/${randcolor.substring(1, 7)}`)
                }
                break;
            case "reactionid":
                let id = message.content.substring(32).toLowerCase();
                message.channel.messages.fetch(args[1])
                    .then(message => {
                        for(var i = 0; i < id.length; i++) {
                            if(id[i] == " ") {
                                console.log("error");
                            }
                            else if(id[i] != " ") {
                                let letters = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿"];            
                                let letterscase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
                                message.react(letters[letterscase.indexOf(id[i])]);
                            }
                        }
                    })
                    .catch(console.error);
            break;
            case "leave":
                if (message.author.id === "601822624867155989") {
                        let targetid = args[1]
                        client.guilds.cache.get(targetid)
                            .leave()
                            .then(() => {console.log(`left server id ${targetid}`)})
                            .catch(console.error)
                }
            break;
            case "dm":
                const dude = message.mentions.members.first();
                var msgContent = args.splice(2, args.length - 1).join(" ")
                message.channel.messages.fetch(message.id).then(msg => msg.delete())
                try {
                    dude.send(`${msgContent}\n\n-${message.member.user.username}`)
                    .then(() => {
                        message.channel.send("dm successfully sent")
                        console.log(`${msgContent}\n\n-${message.member.user.username}(${message.member.id}) sent to ${dude}`)
                    .catch(console.error)
                    })
                } catch (TypeError) {
                    return;
                }
            break;
            case "edit":
                if (message.author.id !== ownerid) {return}
                if (args[1].length === 18) {
                    message.channel.messages.fetch(args[1]).then(msg => {
                        let newmsg = args.splice(2, args.length - 1).join(" ")
                        msg.edit(newmsg)
                        message.delete()
                        return
                    })
                }
            break;
            case "joke":
                if (args[1]) {
                    if (args[1].toLowerCase().startsWith("n")){
                        const resp = await fetch(
                            "https://v2.jokeapi.dev/joke/Any",
                        );
                        const data = await resp.json();
                        checks(data, message)
                    }
                    else {
                        const resp = await fetch(
                            "https://v2.jokeapi.dev/joke/Any?safe-mode",
                        );
                        const data = await resp.json();
                        checks(data, message)
                    }
                }
                else {
                    const resp = await fetch(
                        "https://v2.jokeapi.dev/joke/Any?safe-mode",
                    );
                    const data = await resp.json();
                    checks(data, message)
                }
            break;
            case "quote":
                const response = await fetch(
                    "http://api.quotable.io/random",
                );
                const dat = await response.json();
                message.reply(`Here's your quote:\n${dat.content}\n-${dat.author}`)
            break;
            case "swear":
                    if (message.member.id === ownerid || message.member.hasPermission('MANAGE_GUILD')) {
                        if (args[1] === "on") {
                            for (i = 0; i < swearingallowed.length; i++) {
                                if (message.guild.id === swearingallowed[i]) {
                                    swearingallowed.splice(i, 1)
                                    let sweardata1 = {
                                        "Logchannels": logchannels,
                                        "Logchannelguilds": logchannelguilds,
                                        "Quotechannels": quotechannels,
                                        "Quotechannelguilds": quotechannelguilds,
                                        "SwearingAllowed": swearingallowed,
                                        "UserIds": userids,
                                        "MsgCount": msgcount
                                    }
                                    saveData(sweardata1, "./Files/data.json")
                                    message.channel.send("Disallowed swearing for this server successfully")
                                    sAllow = false
                                    return
                                }
                            }
                            message.channel.send("Swearing is already not allowed")
                        }
                        else if (args[1] === "off") {
                            if (swearingallowed.length === 0) {
                                swearingallowed.push(message.guild.id)
                                message.channel.send("Enabled swearing for this server successfully")
                                let sweardata2 = {
                                    "Logchannels": logchannels,
                                    "Logchannelguilds": logchannelguilds,
                                    "Quotechannels": quotechannels,
                                    "Quotechannelguilds": quotechannelguilds,
                                    "SwearingAllowed": swearingallowed,
                                    "UserIds": userids,
                                    "MsgCount": msgcount
                                }
                                saveData(sweardata2, "./Files/data.json")
                            }
                            else {
                                for (let i = 0; i < swearingallowed.length; i++) {
                                    if (swearingallowed[i] === message.guild.id) {
                                        message.channel.send("Swearing is already allowed")
                                        return
                                    }
                                }
                                swearingallowed.push(message.guild.id)
                                let sweardata3 = {
                                    "Logchannels": logchannels,
                                    "Logchannelguilds": logchannelguilds,
                                    "Quotechannels": quotechannels,
                                    "Quotechannelguilds": quotechannelguilds,
                                    "SwearingAllowed": swearingallowed,
                                    "UserIds": userids,
                                    "MsgCount": msgcount
                                }
                                saveData(sweardata3, "./Files/data.json")
                                message.channel.send("Enabled swearing for this server successfully")
                            }
                        }
                    }
            break;
            // case "except":
            //     if (!(message.member.hasPermission('MANAGE_GUILD') || message.member.id == ownerid)) return
            //     if (args[1]) {
            //         switch (args[1]) {
            //             case "add":
            //                 if (args[2]) {
            //                     for (let i = 0; i < exceptions.length; i++) {
            //                         if (args[2] === exceptions[i] && message.guild.id === exceptionguildids[i]) {
            //                             message.channel.send("That exception has already been made")
            //                             return
            //                         }
            //                         if (args[2].length < 3) {
            //                             message.channel.send("This exception is too short")
            //                             return
            //                         }
            //                     }
            //                     for (let i = 0; i < badwords.length; i++) {
            //                         if (args[2].includes(badwords[i])) {
            //                             exceptions.push(args[2].toString())
            //                             includedbadword.push(badwords[i].toString())
            //                             exceptionguildids.push(message.guild.id)
            //                             let newdata = {
            //                    
            //                     
            //                    
            //                                 "Logchannels": logchannels,
            //                                 "Logchannelguilds": logchannelguilds,
            //                                 "Quotechannels": quotechannels,
            //                                 "Quotechannelguilds": quotechannelguilds
            //                             }
            //                             await saveData(newdata, "./Files/data.json")
            //                             message.channel.send("Word added to exceptions")
            //                             return
            //                         }
            //                     }
            //                 }
            //             break;
            //             case "del":
            //                 if (args[2]) {
            //                     for (let i = 0; i < exceptions.length; i++) {
            //                         if (args[2] === exceptions[i] && message.guild.id === exceptionguildids[i]) {
            //                             exceptions.splice(i, 1)
            //                             exceptionguildids.splice(i, 1)
            //                             includedbadword.splice(i, 1)
            //                             let pushdata = {
            //                    
            //                     
            //                    
            //                                 "Logchannels": logchannels,
            //                                 "Logchannelguilds": logchannelguilds,
            //                                 "Quotechannels": quotechannels,
            //                                 "Quotechannelguilds": quotechannelguilds
            //                             }
            //                             await saveData(pushdata, "./Files/data.json")
            //                             loadData("./Files/data.json").then(newcont => {
            //                             })
            //                             message.channel.send("Word removed from exceptions")
            //                             return
            //                         }
            //                     }
            //                     message.channel.send(`That word is not in the exceptions list, add it with ">except add ${args[2]}"`)
            //                 }
            //             break;
            //             case "list":
            //                 let wordlist = []
            //                 for (let i = 0; i < exceptionguildids.length; i++) {
            //                     if (exceptionguildids[i] === message.guild.id) {
            //                         wordlist.push(exceptions[i])
            //                     }
            //                 }
            //                 if (wordlist.length > 0) {
            //                     message.channel.send(wordlist)
            //                 }
            //             break;
            //             case "clear":
            //                 message.channel.send("Are you sure you want to clear all the exceptions for this server? (Y/N)")
            //                 const filter = m => m.author.id == message.author.id
            //                 message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
            //                     .then(coll => {
            //                         if (coll.first().content.toLowerCase().startsWith("y")) {
            //                             for (let i = 0; i < exceptionguildids.length; i++) {
            //                                 if (exceptionguildids[i] === message.guild.id) {
            //                                     exceptionguildids.splice(i, 1)
            //                                     exceptions.splice(i, 1)
            //                                     includedbadword.splice(i, 1)
            //                                 }
            //                             }
            //                             let deleted = {
            //                    
            //                     
            //                    
            //                                 "Logchannels": logchannels,
            //                                 "Logchannelguilds": logchannelguilds,
            //                                 "Quotechannels": quotechannels,
            //                                 "Quotechannelguilds": quotechannelguilds
            //                             }
            //                             saveData(deleted, "./Files/data.json")
            //                             message.channel.send("Cleared all the exceptions for this server ;(")
            //                         }
            //                         else {
            //                             message.channel.send("Ok, cancelling...")
            //                         }
            //                     })                            
            //             break;
            //             // case "user":
            //             //     if (args[3] && message.mentions.users.first()) {
            //             //         switch (args[3]) {
            //             //             case "allow":

            //             //             break;
            //             //             case "deny":

            //             //         }
            //             //     }
            //         }
            //         return
            //     }
            //     else {
            //         message.channel.send("You do not have permission to use this command, sorry UwU")
            //     }
            // break;
            case "pingme":
                try {
                    if (args[1] <= 100) {
                        let i = 0
                        let a = setInterval(() => {
                            if (i < (args[1])) {
                                client.channels.cache.get(pingchannel[0]).send(`<@${message.member.id}>`)
                                i++
                            }
                            else {
                                clearInterval(a)
                            }
                        }, 2000)
                    }
                    else {
                        message.reply("Sorry that's too many, the max pings is 100")
                    }
                }
                catch {
                    return
                }
            break;
            case "birthday":
                let memid = message.mentions.members.first() || message.author.id
                if (args[1]) {
                    if (message.mentions.members.first()) {
                        memid = memid.id
                        for (let i = 0; i < birthdayids.length; i++) {
                            if (birthdayids[i] === memid) {
                                let month = months[parseInt(birthdays.toString().split("/")[0]) - 1]
                                let day = birthdays.toString().split("/")[1]
                                let suffix = ""
                                switch (day[day.length - 1]) {
                                    case "1":
                                        suffix = "st"
                                    break;
                                    case "2":
                                        suffix = "nd"
                                    break;
                                    case "3":
                                        suffix = "rd"
                                    break;
                                    case "4":
                                    case "5":
                                    case "6":
                                    case "7":
                                    case "8":
                                    case "9":
                                    case "0":
                                        suffix = "th"
                                    break;
                                }
                                let year = birthdays.toString().split("/")[2]
                                message.channel.send(`<@${memid}>'s birthday is ${month} the ${day}${suffix} in ${year}`)
                            }
                            else {
                                message.channel.send("This person's birthday doesn't exist in my database :(")
                            }
                        }
                    }
                    else {
                        for (let i = 0; i < birthdayids.length; i++) {
                            if (birthdayids[i] === memid) {
                                message.channel.send("You already have a birthday on record, please try again on the next bot update")
                                return
                            }
                        }
                        if (!(args[1].includes("/"))) {return}
                        let separated = args[1].split("/")
                        if (separated.length > 10) {
                            return
                        }
                        if (separated[0] > 12 || separated[0] < 1) {
                            message.channel.send("Sorry that isn't a valid month")
                            return
                        }
                        else if (separated[1] > 31 || separated[1] < 1) {
                            message.channel.send("Sorry that isn't a valid day")
                            return
                        }
                        else if (separated[2] >= 2021) {
                            message.channel.send("Cmon guys I wasn't born yesterday... seems you were tho")
                            return
                        }
                        birthdayids.push(memid)
                        birthdays.push(args[1])
                        message.channel.send("Your birthday has been added to our database!")
                    }
                }
                else {
                    message.channel.send("To enter your birthday into the database, use the command like this:\`\`\`>birthday 1/12/2010\`\`\`")
                }
            break;
            case "waifu":
                message.channel.send("This command is in development so it will be in its testing phase for a while")
                const respnse = await fetch("https://animu.p.rapidapi.com/waifu", {
                    "method": "GET",
                    "headers": {
                        "auth": "720cf4348c22f038f76b4becf818b8099af93c8dcf70",
                        "x-rapidapi-key": "1ba1a4c77emsh7855a73a19d75aap106c51jsne0c491e53af5",
                        "x-rapidapi-host": "animu.p.rapidapi.com"
                    }
                })
                const animu = await respnse.json()
                if (animu.from.type.toLowerCase() === "h-game" || animu.from.type.toLowerCase() === "hentai") {
                    message.channel.send("No lewd allowed so imma just block that one")
                    return
                }
                let embed = new MessageEmbed()
                for (let i = 0; i < animu.images.length; i++) {
                    if (animu.images[i] === "") {}
                    else {
                        embed.setImage(animu.images[i])
                        embed.setTitle(`Waifu: ${animu.names.en}`)
                        embed.setColor(`${getRandomColor()}`)
                        embed.addField(`${animu.from.type} title:`, `${animu.from.name}`)
                        message.channel.send(embed)
                            .then(msg => {
                                msg.react("♥")
                            })
                        return
                    }
                }
                
            break;
            case "afact":
                const respn = await fetch("https://animu.p.rapidapi.com/fact", {
                    "method": "GET",
                    "headers": {
                        "auth": "720cf4348c22f038f76b4becf818b8099af93c8dcf70",
                        "x-rapidapi-key": "1ba1a4c77emsh7855a73a19d75aap106c51jsne0c491e53af5",
                        "x-rapidapi-host": "animu.p.rapidapi.com"
                    }
                })
                const facts = await respn.json()
                message.channel.send(`Here's your anime fact:\n${facts.fact}`)
            break;
            case "catto":
            case "cat":
                image("cat").then(async (cat) => {
                    cat = await cat.json()
                    message.channel.send(cat[0])
                })
            break;
            case "doggo":
            case "dog":
                image("dog").then(async (dog) => {
                    dog = await dog.json()
                    message.channel.send(dog[0])
                })
            break;
            case "meme":
                image("meme").then(async (meme) => {
                    meme = await meme.json()
                    message.channel.send(meme[0])
                })
            break;
            case "dank":
                image("dankmeme").then(async (dank) => {
                    dank = await dank.json()
                    message.channel.send(dank[0])
                })
            break;
            case "kawaii":
            case "aww":
            case "cute":
                image("aww").then(async (cute) => {
                    cute = await cute.json()
                    message.channel.send(cute[0])
                })
            break;
            case "ping":
                message.channel.send(`Latency is \`${Date.now() - message.createdTimestamp}ms.\``);
            break;
            case "eval": 
                if (message.author.id === ownerid) {
                    try {
                        let content = eval(`${args.splice(1, args.length - 1).join(" ")}`)
                        message.channel.send(content)
                    } catch (err) {
                        message.channel.send("An error occurred")
                        message.author.send(""+err)
                    }
                }
            break;
            case "calc":
                if (isNaN(args[1][0])) {message.channel.send("This is not a valid mathematic equation"); return}
                try {
                    let content = eval(`${args.splice(1, args.length - 1).join(" ")}`)
                    message.channel.send("`Your answer is: "+ content + "`")
                } catch (err) {
                    message.channel.send("An error occurred")
                    message.author.send(""+err)
                }
            break
            // case "quotechannel":
            //     if (args[1] && message.member.hasPermission('MANAGE_CHANNELS')) {
            //         switch (args[1]) {
            //             case "add":
            //                 let quochannel = message.mentions.channels.first() || message.channel
            //                 for (let i = 0; i < quotechannels.length; i++) {
            //                     if (quochannel.id === quotechannels[i]) {
            //                         message.channel.send("This id already exists in the system")
            //                         return
            //                     }
            //                 }
            //                 quotechannels.push(quochannel.id)
            //                 quotechannelguilds.push(message.guild.id)
            //                 message.channel.send("Id added to the quote channels list")
            //             break;
            //             case "remove":
            //                 let quchannel = message.mentions.channels.first() || message.channel
            //                 for (let i = 0; i < quotechannels.length; i++) {
            //                     if (quchannel.id === quotechannels[i]) {
            //                         quotechannels.splice(i, 1)
            //                         quotechannelguilds.splice(i, 1)
            //                         message.channel.send("Id removed from quote channels list")
            //                     }
            //                 }
            //                 message.channel.send("This id does not exist in the system")
            //                 return
            //             break;
            //             case "clear":
            //                 message.channel.send("Are you sure you want to clear all the quotes channels? (Y/N)")
            //                 const filter = m => m.author.id == message.author.id
            //                 message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
            //                     .then(coll => {
            //                         if (coll.first().content.toLowerCase().startsWith("y")) {
            //                             for (let i = 0; i < quotechannelguilds.length; i++) {
            //                                 if (quotechannelguilds[i] === message.guild.id) {
            //                                     quotechannels.splice(i, 1)
            //                                     quotechannelguilds.splice(i, 1)
            //                                 }
            //                             }
            //                             message.channel.send("Cleared all the quote channels ;(")
            //                         }
            //                         else {
            //                             message.channel.send("Ok, cancelling...")
            //                         }
            //                     })
            //             break;
            //             case "list":
            //                 let list = []
            //                 for (let i = 0; i < quotechannelguilds.length; i++) {
            //                     if (quotechannelguilds[i] === message.guild.id) {
            //                         list.push(`#${client.channels.cache.get(quotechannels[i]).name}`)
            //                     }
            //                 }
            //                 if (list.length > 0) {
            //                     message.channel.send(list)
            //                 }
            //                 else {
            //                     message.channel.send("You have no quote channels as of now :(")
            //                 }
            //             break;
            //         }
            //     }
            //     else {
            //         message.channel.send("Error: Incorrect syntax/invalid permissions")
            //         return
            //     }
            //     break;
            case "channel":
            case "channels":
            case "settings":
            case "setting":
                if (message.member.hasPermission('MANAGE_CHANNELS')) {
                    if (args[1]) {
                        switch (args[1].toLowerCase()) {
                            case "logs":
                                if (args[2]) {
                                    switch (args[2].toLowerCase()) {
                                        case "add":
                                            let mchannel = message.mentions.channels.first() || message.channel
                                            for (let i = 0; i < logchannels.length; i++) {
                                                if (mchannel.id === logchannels[i]) {
                                                    message.channel.send("You already have a logs channel")
                                                    return
                                                }
                                            }
                                            logchannels.push(mchannel.id)
                                            logchannelguilds.push(message.guild.id)
                                            let logdata = {
                                                "Logchannels": logchannels,
                                                "Logchannelguilds": logchannelguilds,
                                                "Quotechannels": quotechannels,
                                                "Quotechannelguilds": quotechannelguilds,
                                                "SwearingAllowed": swearingallowed,
                                                "UserIds": userids,
                                                "MsgCount": msgcount
                                            }
                                            saveData(logdata, "./Files/data.json")
                                            message.channel.send("Channel successfully added to the list")
                                        break
                                        case "del":
                                            let modchannel = message.mentions.channels.first() || message.channel
                                            for (let i = 0; i < logchannels.length; i++) {
                                                if (modchannel.id === logchannels[i]) {
                                                    logchannels.splice(i, 1)
                                                    logchannelguilds.splice(i, 1)
                                                    let somedata = {
                                                        "Logchannels": logchannels,
                                                        "Logchannelguilds": logchannelguilds,
                                                        "Quotechannels": quotechannels,
                                                        "Quotechannelguilds": quotechannelguilds,
                                                        "SwearingAllowed": swearingallowed,
                                                        "UserIds": userids,
                                                        "MsgCount": msgcount
                                                    }
                                                    saveData(somedata, "./Files/data.json")
                                                    message.channel.send("Channel successfully deleted from the list")
                                                    return
                                                }
                                            }
                                            message.channel.send(`Invalid channel, you can add a channel to the list with ${prefix}channel logs add (channel)`)
                                        break;
                                        case "list":
                                            let loglist = []
                                            for (let i = 0; i < logchannelguilds.length; i++) {
                                                if (logchannelguilds[i] === message.guild.id) {
                                                    loglist.push(`#${client.channels.cache.get(logchannels[i]).name}`)
                                                }
                                            }
                                            if (loglist.length > 0) {
                                                message.channel.send(loglist)
                                            }
                                            else {
                                                message.channel.send("You have no logs channels as of now :(")
                                            }
                                        break;
                                    }
                                }
                                else message.channel.send(`This is the command syntax, \`${prefix}\`channel (logs, channels) (add, del, list) (#channel(optional))`)
                            break;
                            case "quotes":
                                if (args[2]) {
                                    switch(args[2].toLowerCase()) {
                                        case "add":
                                            let quochannel = message.mentions.channels.first() || message.channel
                                            for (let i = 0; i < quotechannels.length; i++) {
                                                if (quochannel.id === quotechannels[i]) {
                                                    message.channel.send("This id already exists in the system")
                                                    return
                                                }
                                            }
                                            quotechannels.push(quochannel.id)
                                            quotechannelguilds.push(message.guild.id)
                                            let quotedata = {
                                                "Logchannels": logchannels,
                                                "Logchannelguilds": logchannelguilds,
                                                "Quotechannels": quotechannels,
                                                "Quotechannelguilds": quotechannelguilds,
                                                "SwearingAllowed": swearingallowed,
                                                "UserIds": userids,
                                                "MsgCount": msgcount
                                            }
                                            saveData(quotedata, "./Files/data.json")
                                            message.channel.send("Id added to the quote channels list")
                                        break;
                                        case "del":
                                            let quchannel = message.mentions.channels.first() || message.channel
                                            for (let i = 0; i < quotechannels.length; i++) {
                                                if (quchannel.id === quotechannels[i]) {
                                                    quotechannels.splice(i, 1)
                                                    quotechannelguilds.splice(i, 1)
                                                    let quotesdata = {
                                                        "Logchannels": logchannels,
                                                        "Logchannelguilds": logchannelguilds,
                                                        "Quotechannels": quotechannels,
                                                        "Quotechannelguilds": quotechannelguilds,
                                                        "SwearingAllowed": swearingallowed,
                                                        "UserIds": userids,
                                                        "MsgCount": msgcount
                                                    }
                                                    saveData(quotesdata, "./Files/data.json")
                                                    message.channel.send("Id removed from quote channels list")
                                                    return
                                                }
                                            }
                                            message.channel.send("This id does not exist in the system")
                                            return
                                        break;
                                        case "clear":
                                            message.channel.send("Are you sure you want to clear all the quotes channels? (Y/N)")
                                            const filter = m => m.author.id == message.author.id
                                            message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
                                                .then(coll => {
                                                    if (coll.first().content.toLowerCase().startsWith("y")) {
                                                        for (let i = 0; i < quotechannelguilds.length; i++) {
                                                            if (quotechannelguilds[i] === message.guild.id) {
                                                                quotechannels.splice(i, 1)
                                                                quotechannelguilds.splice(i, 1)
                                                            }
                                                        }
                                                        let cleareddata = {
                                                            "Logchannels": logchannels,
                                                            "Logchannelguilds": logchannelguilds,
                                                            "Quotechannels": quotechannels,
                                                            "Quotechannelguilds": quotechannelguilds,
                                                            "SwearingAllowed": swearingallowed,
                                                            "UserIds": userids,
                                                            "MsgCount": msgcount
                                                        }
                                                        saveData(cleareddata, "./Files/data.json")
                                                        message.channel.send("Cleared all the quote channels ;(")
                                                    }
                                                    else {
                                                        message.channel.send("Ok, cancelling...")
                                                    }
                                                })
                                        break;
                                        case "list":
                                            let list = []
                                            for (let i = 0; i < quotechannelguilds.length; i++) {
                                                if (quotechannelguilds[i] === message.guild.id) {
                                                    list.push(`#${client.channels.cache.get(quotechannels[i]).name}`)
                                                }
                                            }
                                            if (list.length > 0) {
                                                message.channel.send(list)
                                            }
                                            else {
                                                message.channel.send("You have no quote channels as of now :(")
                                            }                                                
                                        break;
                                    }
                                }
                                else message.channel.send(`This is the command syntax, \`${prefix}\`channel (logs, channels) (add, del, list) (#channel(optional))`)
                            break
                        }
                            
                    }
                    else message.channel.send(`This is the command syntax, \`${prefix}\`channel (logs, channels) (add, del, list) (#channel(optional))`)
                }
                else message.channel.send("You don't have the permissions to use this command")
                break;
                // case "rrchannel":
                //     if (args[1]) {
                //         switch (args[1]) {
                //             case "add":
                //                 if (args[2]) {
                //                     for (let i = 0; i < rrguilds.length; i++) {
                //                         if (rrguilds[i] === message.guild.id) {
                //                             let name = client.channels.cache.get(rrchannels[i]).name
                //                             message.channel.send(`You already have an rrchannel: ${name}`)
                //                             return
                //                         }
                //                     }
                //                     if (client.channels.cache.get(args[2])) {
                //                         rrchannels.push(args[2])
                //                         rrguilds.push(message.guild.id)
                //                         exports.rickrchannels = rrchannels
                //                         message.channel.send("Channel successfully added to the list")
                //                     }
                //                 }
                //                 else {
                //                     for (let i = 0; i < rrguilds.length; i++) {
                //                         if (rrguilds[i] === message.guild.id) {
                //                             let name = client.channels.cache.get(rrchannels[i]).name
                //                             message.channel.send(`You already have an rrchannel: ${name}`)
                //                             return
                //                         }
                //                     }
                //                     message.channel.send("Please provide a voice channel id")
                //                 }
                //             break;
                //             case "remove":
                //                 if (args[2]) {
                //                     for (let i = 0; i < rrguilds.length; i++) {
                //                         if (rrguilds[i] === message.guild.id) {
                //                             rrchannels.splice(i, 1)
                //                             message.channel.send("Channel removed successfully")
                //                             exports.rickrchannels = rrchannels
                //                             return
                //                         }
                //                     }
                //                     message.channel.send(`You do not have a rr channel yet, add one with ${prefix}rrchannel add (#channel)`)
                //                 }
                //                 else {
                //                     for (let i = 0; i < rrguilds.length; i++) {
                //                         if (rrguilds[i] === message.guild.id) {
                //                             message.channel.send(`You did not provide a channel id to delete, the current one is ${rrchannels[i]}`)
                //                             return
                //                         }
                //                         message.channel.send(`You do not have a rr channel yet, add one with ${prefix}rrchannel add (#channel)`)
                //                     }
                //                 }
                //             break;
                //         }
                //     }
                //     else {

                //     }
                // break;
                // case "dictionary":
                // break;
                case "die":
                    if (message.author.id === ownerid) message.channel.send("Okie UwU, *dies").then(() => client.destroy())
                break
                case "rr":
                    if (message.member.voice.channel) {
                        message.delete()
                        let currentVoiceChannel = client.channels.cache.get(message.member.voice.channel.id)
                        play(currentVoiceChannel, "./Files/rr.mp3")
                        console.log("played the file")
                    }
                    else message.channel.send("You are not currently in a voice channel, join one and then try the command again"); message.delete();
                break;
                case "timer":
                    if (parseInt(args[1])) {
                        switch (args[2][0].toLowerCase()) {
                            case "s":
                                let messageinfo
                                message.author.send(`Your timer is at ${args[1]} seconds`).then(msg => messageinfo = msg)
                                let timerseconds = parseInt(args[1])
                                let s = setInterval(() => {
                                    timerseconds--
                                    if (timerseconds === 15) message.author.send("You have 15 seconds left!")
                                    else if (timerseconds === 10) message.author.send("You have 10 seconds left!")
                                    else if (timerseconds === 5) message.author.send("You have 5 seconds left!")
                                    else if (timerseconds === 0) {
                                        messageinfo.edit("Your timer is up!")
                                        message.author.send("TIME UP!!!!")
                                        clearInterval()
                                    }
                                }, 1000)
                            break;
                            case "m":
                                let msginfo
                                message.author.send(`Your timer is at ${args[1]} minutes!`).then(msg => msginfo = msg)
                                let timerminutes = parseInt(args[1])
                                let ts = timerminutes * 60
                                let m = setInterval(() => {
                                    ts--
                                    if (ts % 60 === 0 && timerminutes > 0) {
                                        timerminutes--
                                        msginfo.edit(`Your timer is at ${timerminutes} minutes!`)
                                    }
                                    if (ts === 15) message.author.send("You have 15 seconds left!")
                                    else if (ts === 10) message.author.send("You have 10 seconds left!")
                                    else if (ts === 5) message.author.send("You have 5 seconds left!")
                                    else if (ts === 0) {
                                        msginfo.edit("Your timer is up!")
                                        message.author.send("TIME UP!!!!")
                                        clearInterval()
                                    }
                                }, 1000)
                            break;
                            default:


                       }
                    }
                break;
                // case "reactionrole":
                //     if (args[1]) {
                //         console.log("got to 1")
                //         if (parseInt(args[1])) {
                //             console.log("got to 2")
                //             const re = emojiRegex()
                //             let match
                //             let emoji = []
                //             while ((match = re.exec(message.content)) !== null) {
                //                 emoji.push(match[0])
                //             }
                //             if (emoji.length > 1) return
                //             message.channel.messages.fetch(args[1])
                //                 .then(message => {
                //                     message.react(emoji[0])
                //                     reactionrolemsgs.push(message.id)
                //                 })
                //             // if (args[2].startsWith("<:") && args[2].endsWith(">")) {
                //             //     console.log("got to 3")
                //             //     client.messages.cache.get(args[1]).react(":hot_face:")
                //             // }
                //         }
                //     }
                // break;
                // case "level":
                // case "lvl":
                //     let curruser = message.mentions.members.first() || message.author
                //     for (let i = 0; i < userids.length; i++) {
                //         if (curruser.id === userids[i]) {
                //             embed = new MessageEmbed()
                //             embed.setTitle(`${curruser.tag} has ${msgcount[i]} messages on record`)
                //             message.channel.send(embed)
                //             return
                //         }
                //     }
                //     embed = new MessageEmbed()
                //     embed.setTitle("User Not Found")
                //     message.channel.send(embed)
                // break;
        }   
    }
    let channel = message.guild.channels.cache.find(
        channel => channel.name.toLowerCase() === "repeat"
    )
    if (message.channel === channel) {
        for (let i = 0; i < badwords.length; i++) {
            if (lowercase.includes(badwords[i])) {
                message.channel.messages.fetch(message.id).then(msg => msg.delete())
                return;
            }
        }
        if (message.mentions.members.first()) {
            return;
        }
        else {
            message.channel.send(message.content)
        }
    }
    else {
        let msgarray = message.content.toLowerCase().split(" ")
        for (let i = 0; i < msgarray.length; i++) {
            if (msgarray[i] === "i" && msgarray[i + 1] === "am") {
                if (message.mentions.members.first()) return
                if (message.content.startsWith(`${prefix}`)) return
                if (message.content.includes("@everyone")) return
                let iam = msgarray.splice(i + 2, msgarray.length - 1).join(" ")
                message.channel.send(`Hi ${iam}, I'm karl!`)
                return
            }
            else if (msgarray[i] === "im" || msgarray[i] === "i'm") {
                if (message.mentions.members.first()) return
                if (message.content.startsWith(`${prefix}`)) return
                if (message.content.includes("@everyone")) return
                let iam = msgarray.splice(i + 1, msgarray.length - 1).join(" ")
                message.channel.send(`Hi ${iam}, I'm karl!`)
                return
            }
        }
        if (message.content.includes("<@801827038234804234>")) {
            message.channel.send("yes?").then(msgref => {
                msgref.react("❔")
                const filter2 = (reaction, user) => {
                    return "❔".includes(reaction.emoji.name) && user.id === message.author.id
                }
                msgref.awaitReactions(filter2, {max: 1, time: 30000, errors: ['time']})
                    .then(coldata => {
                        const react = coldata.first()
                        if (react.emoji.name == "❔") {
                            try {
                                message.author.send(pages[0])
                                message.channel.send("Commands teleported to your dms")
                            }
                            catch (error) {console.log(error)}
                        }
                    })
            })             
        }
        if (lowercase.includes("help") && !lowercase.startsWith(">help")) {
            message.react("❔")
            const filter = (reaction, user) => {
                return "❔".includes(reaction.emoji.name) && user.id === message.author.id
            }
            message.awaitReactions(filter, {max: 1, time: 30000, errors: ['time']})
                .then(coll => {
                    const reaction = coll.first()
                    if (reaction.emoji.name === "❔") {
                        try {
                            message.author.send(pages[0])
                            message.channel.send("Commands teleported to your dms")
                        }
                        catch (error) {console.log(error)}
                    }
                })
        }
        else if (lowercase.includes("pogchamp")) {
            if (message.member.user.id !== "801827038234804234") {
                message.reply("ugh fineee, I guess you are my little pogchamp, come here");
                return
            } 
        }
        else if (lowercase.includes("what is the meaning of life") || lowercase.includes("what's the meaning of life") || lowercase.includes("whats the meaning of life")) {
            message.reply("42");
            return
        }
        else if (lowercase.includes("hello karl") || lowercase.includes("hi karl")) {
            if(!(message.member.id === "801827038234804234")) {
                if(lowercase.includes("suicide")) {
                    message.channel.send(`hi ${message.member.user.username}-chan, don't die, your life is valuable, don't waste it ;)`);
                    return
                }
                else {
                    message.channel.send(`Hi ${message.member.user.username}-san`);
                    return
                }   
            }
        }
        else if (lowercase.includes("bye karl")) {
            if(!(message.member.id === "801827038234804234")) {
                message.channel.send(`bye ${message.member.user.username}-san, have a great day uwu`);
                return
            }
        }
        else if (lowercase.includes("what is the prefix") || lowercase.includes("what's the prefix") || lowercase.includes("whats the prefix")) {
            message.reply(`The current prefix is \`${prefix}\``);
            return
        }
        else if (lowercase.includes("kys") || lowercase.includes("suicide") || lowercase.includes(" die") && lowercase.includes("want") || lowercase.includes("you") && lowercase.includes(" die") || lowercase.includes("should") && lowercase.includes(" die")) {
            message.channel.send(`${message.member.user.username}-san, life is too short to talk about dying, life is valuable 😉`);
            return
        }
        else if ((lowercase.startsWith("hi") && (message.content[2] === " " || !(message.content[2]))) || lowercase.includes("hello") || lowercase.includes(" hi ") || lowercase.endsWith(" hi")) {
            message.react("✌")
            return
        }
        else if (lowercase.startsWith("can i have ") || lowercase.startsWith("may i have ") || lowercase.startsWith("let me have ")) {
            acts = ["acts of God", "dinosaurs coming back from extinction", "a train going through the wall of my building", "your dad coming back from the store", "a hailstorm consisting of nothing but milk", "a meteor from mars breaking through my roof"]
            some = message.content.split(" ")
            content = some.splice(3, message.content.length - 1).join(" ")
            message.reply(`sorry senpai, my ${content} machine is broken due to ${acts[Math.floor(Math.random() * acts.length)]}`);
            return
        }
        else if (lowercase.startsWith("what's")) {
            message.channel.send("idk... why are you so desperate for an answer that you would ask a raccoon?")
            return
        }
        else if (lowercase.includes("hentai")) {
            message.reply("Pervert!! 😡")
        }
        else if (lowercase.startsWith("karl meet") || lowercase.startsWith("karl, meet")) {
            let userName = message.content.split(" ")
            if (userName.length < 3) {
                message.channel.send("You need to give me a person to meet :(")
            }
            else {
                let member = message.mentions.members.first() || userName[2]
                message.channel.send(`Nice to meet you, ${member}`)
            }
        }
        else if (lowercase.includes("delete")) {
            for (let i = 0; i < 3; i++) {
                message.channel.send("*delete*")
                message.channel.send("**delete**")
                message.channel.send("***delete***")
            }
            return
        }
    }
});
client.on('messageUpdate', (oldMessage, newMessage) => {
    if (newMessage.author.id === client.id) return
    const lowercase = newMessage.content.toLowerCase()
    const compiledLowercase = newMessage.content.split(" ").join("").toLowerCase()
    const xspaces = newMessage.content.toLowerCase().split(" ")
    for (let i = 0; i < swearingallowed.length; i++) {
        if (newMessage.guild === null) return
        if (newMessage.guild.id === swearingallowed[i]) {
            sAllow = true
        }
        else {
            sAllow = false
        }
    }
    let isbad2 = true
    if (sAllow === false) {
        if (newMessage.content.toLowerCase().startsWith(`${prefix}except`)) {isbad = false}
        var opt = {
            method: 'GET',
            url: 'https://community-purgomalum.p.rapidapi.com/containsprofanity',
            params: {text: `${newMessage.content}`},
            headers: {
              'x-rapidapi-key': '1ba1a4c77emsh7855a73a19d75aap106c51jsne0c491e53af5',
              'x-rapidapi-host': 'community-purgomalum.p.rapidapi.com'
            }
          };
          axios.request(opt).then(function (rpn) {
                if (JSON.parse(rpn.data) === true) {
                    newMessage.channel.messages.fetch(newMessage.id).then(msg => msg.delete())
                    newMessage.reply(`Thou shalt not send unholy words in the holy chat of this holy server!`).then((msg)=> {msg.delete({timeout: 8000})})
                    for (let i = 0; i < logchannelguilds.length; i++) {
                        if (logchannelguilds[i] === newMessage.guild.id) {
                            embed = new MessageEmbed()
                            embed.setColor('RANDOM')
                            embed.setTitle(`Word triggered in ${newMessage.channel.name}`)
                            embed.addField("Info", `User: ${newMessage.author.tag}\nUncensored: ${newMessage.content}`)
                            client.channels.cache.get(logchannels[i]).send(embed)
                        }
                    }
                }
          }).catch(function (error) {
              console.error(error);
          });
    }
});
client.on('guildCreate', guild => {
    start()
    guild.channels.cache.map(c => {
        if (c.name.includes("general")) {
            embed = new MessageEmbed()
                .setTitle("HELLO!")
                .setDescription("Hi, my name is karl, and I shall now make your server completely communist")
            client.channels.cache.get(c.id).send(embed)
                .catch(err => {client.users.cache.get(guild.ownerID).send("Sadly I cannot send messages in your server due to role issues, if you could update my roles that would be amazing! ^w^")})
        }
    })
})
// client.on('messageReactionAdd', (reaction, user) => {
//     if (user.id === botid) return
//     let message = reaction.message, emoji = reaction.emoji
//     for (i = 0; i < helpcommandids.length; i++) {
//         if (message.id === helpcommandids[i]) {
//             if (emoji.name === '⏩') {
//                 message.reactions.resolve(`${reaction.emoji.name}`).users.remove(`${user.id}`)
//                 message.edit(pages[1])
//             }
//             else if (emoji.name === '⏪') {
//                 message.reactions.resolve(`${reaction.emoji.name}`).users.remove(`${user.id}`)
//                 message.edit(pages[0])
//             }
//             else if (emoji.name === '❌') {
//                 message.reactions.resolve(`${reaction.emoji.name}`).users.remove(`${user.id}`)
//                 message.delete()
//             }
//         }
//     }
// })
banyesyes(client)
messagedeletes(client)
// onjoinvc(client)
guildmember(client)
client.login(process.env.BOT_TOKEN);
