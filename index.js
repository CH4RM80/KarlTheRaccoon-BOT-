const {Client, MessageEmbed, Message, GuildManager, GuildMember, DiscordAPIError, Discord, ClientUser, ReactionUserManager} = require('discord.js');
const { parse } = require('path');
const { measureMemory } = require('vm');
const messagedeleteo = require('./messagedelete')
const banyesyes = require('./banyesyes');
const client = new Client();
let prefix = '>'
require('dotenv').config()
const botid = "801827038234804234";
const fetch = require("node-fetch");
let embed = new MessageEmbed();
let allguilds = []
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
birthdayids = []
birthdays = []
let quotechannel = []
let guildmsgs = []
let pingchannel = []
// let lguildallow = []
// let lguilddeny = []
// let lchannelallow = []
// let lchanneldeny = []
// let luserallow = []
// let luserdeny = []
let foundguild = false
swearingallowed = []
let lastuserid = "";
let sAllow = false
let ownerid = "601822624867155989"
ccache = client.channels.cache
let badwords = ["stfu", "fuck", "fuk", "wtf", "fucc", "shit", "cunt", "damn", "bastard", "penus", "boob", "titties", "tits", "clit", "penjs","vagina", "shjt", "shjit", "fucj", "bitch", "pussy", "fucn", "pujssy", "djck", "bussy", "fcuk", "btch", "nigger", "nigga", "niqqa", "niger", "dick", "prick", "ass", "penis", "whore", "shutup", "b*tch", "pr*ck", "p*ssy", "*ss", "@ss", "c*nt", "f*ck", "fck", "d*mn", "n*gga", "n*gger", "n*qqa", "d*ck", "hell", "piss", "cum", "p!ss", "cock", "c0ck", "p3nis", "p3n!s", "wh0re", "cum", "d!ck"]
let spamchannel = []
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
client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('with Poe-kun', { type: 'PLAYING' });
    let guilds = client.guilds.cache.map(g => g.id)
    guilds.forEach(element => {
        let guild = client.guilds.cache.get(element)
        guild.channels.cache.map(c => {
            if (c.name.includes("general")){
                let general = client.channels.cache.get(c.id)
                general.send("Made a massive update, check it out with >update")
            }
            if (c.name == "spam") {
                spamchannel.push(c.id)
            }
            else if (c.name === "pingchannel") {
                pingchannel.push(c.id)
            }
        })
    });
    // let a = setInterval(() => {
    //     client.channels.cache.get("818491944190738446").send("@everyone")
    // }, 3600000)
});

client.on('message', async message => {
    const lowercase = message.content.toLowerCase();
    const xspaces = message.content.toLowerCase().split(" ")
    const compiledLowercase = message.content.split(" ").join("").toLowerCase()
    if (message.author.bot) return;
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
                    if(message.content[0] === prefix) {
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
    try {
        for(let i = 0; i < spamchannel.length; i++) {
            client.channels.cache.get(spamchannel[i]).send("spam")
        }
    }
    catch (TypeError) {
        return;
    }
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
        for (let i = 0; i < badwords.length; i++) {
            for (let j = 0; j < xspaces.length; j++) {
                if (xspaces[j].includes(badwords[i])) {
                    if (badwords[i] === "hell" && xspaces[j].includes("hello")) {
                        isbad = false
                    }
                    else if (badwords[i] === "ass" && xspaces[j].includes("wassup")) {
                        isbad = false
                    }
                    else {
                        if (isbad === false) {}
                        else {
                            message.channel.messages.fetch(message.id).then(msg => msg.delete())
                            message.reply(`Thou shalt not send unholy words in the holy chat of this holy server!`).then((msg)=> {msg.delete({timeout: 5000})});
                            console.log(isbad)
                            return;
                        }
                    }
                }
            }
            if (compiledLowercase.includes(badwords[i]) && isbad === true) {
                message.channel.messages.fetch(message.id).then(msg => msg.delete())
                message.reply(`Thou shalt not send unholy words in the holy chat of this holy server!`).then((msg)=> {msg.delete({timeout: 5000})});
                return;
            }
        }
    }
    if (message.channel.id === "836714862863581234") {
        let responseai = await fetch(`https://api.pgamerx.com/ai/response?api_key=SBGW8qLcfEFL&message=${message.content}&language=en`)
        message.channel.send(responseai)
    }
    if (message.content[0] === prefix) {
        switch(args[0].toLowerCase()) {
            case "say":
                message.channel.messages.fetch(message.id).then(msg => msg.delete())
                if (message.content.includes("discord.gg")) {
                    message.reply("nice... but we don't really do advertising here");
                }
                else if (message.mentions.members.first()) {
                    message.reply("bruh really, no pinging tyvm");
                } else {
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
                let help = new MessageEmbed()
                help.setTitle("Commands")
                help.addField(`1: ${prefix}say (text)`, "This command makes the bot say what you want it to say");
                help.addField(`2: ${prefix}prefix (character)`, "This command tells and sets(mod only) the prefix of the bot");
                help.addField(`3: ${prefix}purge (int)`, "This command deletes messages(mod only)");
                help.addField(`3: ${prefix}kick (user)`, "This command kicks members(mod only)");
                help.addField(`3: ${prefix}ban (user)`, "This command bans members(mod only)");
                help.addField(`4: ${prefix}help`, "This command lists all the commands");
                help.addField(`5: ${prefix}number (int)`, "This command sends a random number");
                help.addField(`6: ${prefix}bungou`, "This command sends some text, you should try it out!");
                help.addField(`7: ${prefix}update`, "This command tells the new update to the bot");
                help.addField(`8: ${prefix}messages`, "This command tells how many messages were sent today");
                help.addField(`9: ${prefix}avatar (user)`, "This command sends the avatar of the mentioned user");
                help.addField(`10: ${prefix}color`, "This command generates a random color(sorry stackoverflow I've done it again)");
                help.addField(`11: ${prefix}reactionid (id)`, "This command reacts to the message that you attach via id(thanks arusok)");
                help.addField(`12: ${prefix}dm (member)`, "DMs the mentioned user");
                help.addField(`13. ${prefix}joke (noclean(optional))`, "This command generates a random joke");
                help.addField(`14. ${prefix}quote`, "This command generates a random quote");
                help.addField(`15. ${prefix}birthday ((MM/DD/YYYY) or (@user))`, "This command logs your birthday and displays the birthdays of others");
                help.addField(`16. ${prefix}pingme (number)`, "This command pings the user (number) times");
                help.addField(`17. ${prefix}swear (on/off)`, "Enables or disables swear blocking in the server(server owner only)");
                help.addField(`18. ${prefix}waifu`, "Gets a random waifu, complete with anime title(courtesy of the Animu API)")
                help.addField(`19. ${prefix}afact`, "Gets a random anime fact(courtesy of the Animu API)")
                help.addField(`20. ${prefix}meme`, "Gets a random meme")
                help.addField(`21. ${prefix}dank`, "Gets a random dank meme")
                help.addField(`22. ${prefix}cat(to)`, "Gets a random cat gif/image")
                help.addField(`23. ${prefix}dog(go)`, "Gets a random dog gif/image")
                help.addField(`24. ${prefix}duck`, "Gets a random duck gif/image")
                help.addField(`25. ${prefix}cute(aww)`, "Gets a random cute gif/image")
                help.addField("MORE COMMANDS COMING SOON", "psst, he's lying");
                help.setColor(getRandomColor());
                help.setTimestamp();
                message.channel.send(help).then((msg)=> {msg.delete({timeout: 20000})});
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
                bungou.addField("Where to watch", "https://animepahe.com/anime/e9523036-5d5c-f06b-8310-fd2e0eaa303c\nhttps://lite.animevibe.wtf/anime/bungou-stray-dogs\nhttps://animixplay.to/v1/bungou-stray-dogs/ep1")
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
                            message.channel.send(`${user} was banned`)
                        })
                    }
                    catch (TypeError) {
                        message.channel.send("member not banned")
                        return
                    }
                } else {
                    message.reply("you can't use that")
                }
            break;
            case "update" :
                message.channel.send(`\`\`\`Made a lotta hecking stuff, check it out posthaste, >help\`\`\``)
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
                    message.channel.send(avatar).then((msg)=> {msg.delete({timeout: 20000})});
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
                            }
                            else {
                                for (let i = 0; i < swearingallowed.length; i++) {
                                    if (swearingallowed[i] === message.guild.id) {
                                        message.channel.send("Swearing is already allowed")
                                        return
                                    }
                                }
                                swearingallowed.push(message.guild.id)
                                message.channel.send("Enabled swearing for this server successfully")
                            }
                        }
                    }
            break;
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
                                // try {
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
                                // }
                                // catch (TypeError) {return}
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
            // case "link":
            // case "links":
            //     if (message.member.hasPermission('MANAGE_GUILD')) {
            //         if (args[2]) {
            //             switch (args[1]) {
            //                 case "member":
            //                     if (message.mentions.members.first()) {
            //                         let meid = message.mentions.members.first()
            //                         if (args[args.length - 1] === "true") { 
            //                             luserallow.push(meid.id)
            //                             message.channel.send("User allowed to use links")
            //                         }
            //                         else if (args[args.length - 1] === "false") {
            //                             luserdeny.push(meid.id)
            //                             message.channel.send("User denied from using links")
            //                         }
            //                         else {
            //                             message.channel.send("You didn't provide a correct value for this user's permissions")
            //                         }
            //                     }
            //                     else {
            //                         message.channel.send("Doesn't look like you mentioned a user, please try again")
            //                     }
            //                 break
            //                 case "server":

            //                 break
            //                 case "channel":

            //                 break
            //             }
            //         }
            //     }
            // break
            case "waifu":
                message.channel.send("This command is in development so it will be in its testing phase for a while")
                const respnse = await fetch("https://animu.p.rapidapi.com/waifus", {
                    "method": "GET",
                    "headers": {
                        "auth": "720cf4348c22f038f76b4becf818b8099af93c8dcf70",
                        "x-rapidapi-key": "1ba1a4c77emsh7855a73a19d75aap106c51jsne0c491e53af5",
                        "x-rapidapi-host": "animu.p.rapidapi.com"
                    }
                })
                const animu = await respnse.json()
                if (animu.from.type === "H-Game" || animu.from.type === "Hentai") {
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
                        return
                    }
                }
                
            break;
            case "afact":
                const respn = await fetch("https://animu.p.rapidapi.com/fact", {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "1ba1a4c77emsh7855a73a19d75aap106c51jsne0c491e53af5",
                        "x-rapidapi-host": "animu.p.rapidapi.com"
                    }
                })
                const facts = await respn.json()
                message.channel.send(`Here's your anime fact:\n${facts.fact}`)
            break;
            case "catto":
            case "cat":
                const p = await fetch(`https://random-stuff-api.p.rapidapi.com/image/cat?api_key=SBGW8qLcfEFL`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "1ba1a4c77emsh7855a73a19d75aap106c51jsne0c491e53af5",
                        "x-rapidapi-host": "random-stuff-api.p.rapidapi.com"
                    }
                })
                const catto = await p.json()
                message.channel.send(catto[0])
            break;
            case "doggo":
            case "dog":
                const pr = await fetch(`https://random-stuff-api.p.rapidapi.com/image/dog?api_key=SBGW8qLcfEFL`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "1ba1a4c77emsh7855a73a19d75aap106c51jsne0c491e53af5",
                        "x-rapidapi-host": "random-stuff-api.p.rapidapi.com"
                    }
                })
                const doggo = await pr.json()
                message.channel.send(doggo[0])
            break;
            case "duck":
                const pro = await fetch(`https://random-stuff-api.p.rapidapi.com/image/duck?api_key=SBGW8qLcfEFL`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "1ba1a4c77emsh7855a73a19d75aap106c51jsne0c491e53af5",
                        "x-rapidapi-host": "random-stuff-api.p.rapidapi.com"
                    }
                })
                const ducc = await pro.json()
                message.channel.send(ducc[0])
            break;
            case "meme":
                const prot = await fetch(`https://random-stuff-api.p.rapidapi.com/image/memes?api_key=SBGW8qLcfEFL`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "1ba1a4c77emsh7855a73a19d75aap106c51jsne0c491e53af5",
                        "x-rapidapi-host": "random-stuff-api.p.rapidapi.com"
                    }
                })
                const meme = await prot.json()
                message.channel.send(meme[0])
            break;
            case "dank":
                const proto = await fetch(`https://random-stuff-api.p.rapidapi.com/image/dankmemes?api_key=SBGW8qLcfEFL`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "1ba1a4c77emsh7855a73a19d75aap106c51jsne0c491e53af5",
                        "x-rapidapi-host": "random-stuff-api.p.rapidapi.com"
                    }
                })
                const dankmeme = await proto.json()
                message.channel.send(dankmeme[0])
            break;
            case "kawaii":
            case "aww":
            case "cute":
                const protocute = await fetch(`https://random-stuff-api.p.rapidapi.com/image/aww?api_key=SBGW8qLcfEFL`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "1ba1a4c77emsh7855a73a19d75aap106c51jsne0c491e53af5",
                        "x-rapidapi-host": "random-stuff-api.p.rapidapi.com"
                    }
                })
                const cute = await protocute.json()
                message.channel.send(cute[0])
            break;
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
        try {
            var msgCont = message.content.toLowerCase().split(" ")
            if (msgCont[msgCont.length - 2] === "*") {
                try {
                    let numoftimes = parseInt(msgCont[msgCont.length - 1])
                    var msgCont = msgCont.splice(0, msgCont.length - 2).join(" ")
                    if (numoftimes < 11) {
                        for(let i = 0; i < numoftimes; i++) {
                            message.channel.send(`${msgCont}`)
                        }
                    }
                    else {
                        message.channel.send("Hold up just a minute bro don't you care about my bandwidth?")
                        return
                    }
                }
                catch (TypeError) {return}
            }
        }
        catch (TypeError) {
            return
        }
        let msgarray = message.content.toLowerCase().split(" ")
        for (let i = 0; i < msgarray.length; i++) {
            if (msgarray[i] === "i" && msgarray[i + 1] === "am") {
                let iam = msgarray.splice(i + 2, msgarray.length - 1).join(" ")
                message.channel.send(`Hi ${iam}, I'm karl!`)
                return
            }
            else if (msgarray[i] === "im" || msgarray[i] === "i'm") {
                let iam = msgarray.splice(i + 1, msgarray.length - 1).join(" ")
                message.channel.send(`Hi ${iam}, I'm karl!`)
                return
            }
        }
        if (lowercase.includes("pogchamp")) {
            if (message.member.user.id !== "801827038234804234") {
                message.reply("ugh fineee, I guess you are my little pogchamp, come here");
                return
            } 
        }
        else if (lowercase.includes("what is the meaning of life") || lowercase.includes("what's the meaning of life") || lowercase.includes("whats the meaning of life")) {
            message.reply("42");
            return
        }
        else if (message.member.id !== "681238807026466870" && lowercase.includes("discord.gg")) {
            message.channel.messages.fetch(message.id).then(msg => msg.delete())
            message.reply("nice... but we don't really do advertising here");
            return
        }
        else if (lowercase.includes("hello karl") || lowercase.includes("hi karl")) {
            if(!(message.member.id === "801827038234804234")) {
                if(lowercase.includes("die") || lowercase.includes("suicide")) {
                    message.channel.send(`hi ${message.member.user.username}-chan, don't die, your life is valuable, don't waste it ;)`);
                    return
                }
                else {
                    greets = ["what a lovely day it is, but not as lovely as you ;)", "the sun is shining, but not as bright as your smile ;)", "what have you been up to?", "love u uwu", "sure hope your day has been going well :)", "have a great day uwu", "hope your day is as great as the day i met you ;)", "Let's curl up and read a horror novel together", "Would you like to steal trash with me?", "All my clues lead up to you being amazing", "I dig the look human", "even water is not as clear as how much I love you uwu", "Are you a garbage can? Because you smell f a n t a s t i c!"]
                    message.channel.send(`hi ${message.member.user.username}-san, ${greets[Math.floor(Math.random() * greets.length) - 1]}`);
                    return
                }   
            }
        }
        else if (lowercase.includes("compliment me")) {
            if(!(message.member.id === "801827038234804234")) {
                compliments = ["I would give my life for you in a heartbeat", "Depression is not an option, things will get better", "You're the best person I know", "No matter how many times you fall, I believe you can get back up again", "Enjoy life and value your friends", "Time is not of the essence when it comes to recovery", "Your body matters take care of it", "You're the sunshine to my morning", "You're not alone", "Your life matters, never forget that"]
                message.channel.send(`${message.member.user.username}-san, ${compliments[Math.floor(Math.random() * compliments.length) - 1]}`)
                return
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
        else if (lowercase.includes("suicide") || lowercase.includes(" die")) {
            message.channel.send(`${message.member.user.username}-san, life is too short to talk about dying, please continue to live, your life is valuable ;)`);
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
        else if (lowercase.includes("what did you have for dinner last night")) {
            message.channel.send("Yeah")
            return
        }
        else if (lowercase.startsWith("what's")) {
            message.channel.send("idk... why are you so desperate for an answer that you would ask a raccoon?")
            return
        }
        else if (lowercase.includes("hentai")) {
            message.reply("Pervert!! 😡")
        }
        else if (lowercase.startsWith("karl meet")) {
            message.channel.send(`Nice to meet you, ${message.mentions.members.first()}`)
        }
        else if (lowercase.includes("delete")) {
            for (let i = 0; i < 3; i++) {
                message.channel.send("*delete*")
                message.channel.send("**delete**")
                message.channel.send("***delete***")
            }
            return
        }
        else if (lowercase.includes("cherris cute") || lowercase.includes("cherri's cute")) {
            message.channel.send("no ur cute :3")
            return;
        }
    }
});
client.on('messageUpdate', (oldMessage, newMessage) => {
    const lowercase = newMessage.content.toLowerCase()
    const compiledLowercase = newMessage.content.split(" ").join("").toLowerCase()
    const xspaces = newMessage.content.toLowerCase().split(" ")
    for (let i = 0; i < swearingallowed.length; i++) {
        if (newMessage.guild.id === swearingallowed[i]) {
            sAllow = true
        }
        else {
            sAllow = false
        }
    }
    if (sAllow === false) {
        for (let i = 0; i < badwords.length; i++) {
            for (let j = 0; j < xspaces.length; j++) {
                if (xspaces[j].includes(badwords[i])) {
                    if (badwords[i] === "hell" && xspaces[j].includes("hello")) {
                        return
                    }
                    else if (badwords[i] === "ass" && xspaces[j].includes("wassup")) {
                        return
                    }
                    else {
                        newMessage.channel.messages.fetch(newMessage.id).then(msg => msg.delete())
                        newMessage.reply(`Thou shalt not send unholy words in the holy chat of this holy server!`).then((msg)=> {msg.delete({timeout: 5000})});
                        return;
                    }
                }
            }
            if (compiledLowercase.includes(badwords[i])) {
                newMessage.channel.messages.fetch(newMessage.id).then(msg => msg.delete())
                newMessage.reply(`Thou shalt not send unholy words in the holy chat of this holy server!`).then((msg)=> {msg.delete({timeout: 5000})});
                return;
            }
        }
    }
});
banyesyes(client)
messagedeleteo(client)
client.login(process.env.BOT_TOKEN);
