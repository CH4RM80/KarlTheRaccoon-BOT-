const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const {Client, MessageEmbed, Message} = require('discord.js');
const { parse } = require('path');
const client = new Client();
let { prefix, token } = require('./config.json');
const botid = "801827038234804234";
let embed = new MessageEmbed();
client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('with Poe-kun', { type: 'PLAYING' });
    client.channels.cache.get("801873049401556992").send(`I was just updated by my master uwu, check the new update with \`${prefix}update\``);
    client.channels.cache.get("789954074661486622").send(`I was just updated by my master uwu, check the new update with \`${prefix}update\``);
});

client.on('message', message => {
    let args = message.content.substring(prefix.length).split(" ")
    if (message.content[0] === prefix) {
        switch(args[0].toLowerCase()) {
            case "say":
                message.channel.bulkDelete(1);
                if (message.content.includes("discord.gg")) {
                    message.reply("nice... but we don't really do advertising here");
                } 
                else if (message.content.includes("@")) {
                    message.reply("bruh really, no pinging tyvm");
                } else {
                    fullmessage = args.splice(1, args.length - 1).join(" ");
                    message.channel.send(`‍‍${fullmessage}`);
                }
            break;
            case "prefix":
                if (args[1] && (message.member.roles.cache.has("789955154375868437") || message.member.roles.cache.has("789937840913383424") )) {
                    prefix = args[1][0];
                    message.channel.send(`The prefix has been changed to \`${prefix}\``);
                } else {
                    message.reply(`The current prefix is\`${prefix}\``);
                }
            break;
            case "help":
                embed = new MessageEmbed()
                embed.setTitle("Commands")
                embed.addField(`1: ${prefix}say (text)`, "This command makes the bot say what you want it to say");
                embed.addField(`2: ${prefix}prefix (character)`, "This command tells and sets(mod only) the prefix of the bot");
                embed.addField(`3: ${prefix}purge (int)`, "This command deletes messages(mod only)");
                embed.addField(`3: ${prefix}kick (user)`, "This command kicks members(mod only)");
                embed.addField(`3: ${prefix}ban (user)`, "This command bans members(mod only)");
                embed.addField(`4: ${prefix}help`, "This command lists all the commands");
                embed.addField(`5: ${prefix}number (int)`, "This command sends a random number");
                embed.addField(`6: ${prefix}bungou`, "This command sends some text, you should try it out!");
                embed.addField(`7: ${prefix}update`, "This command tells the new update to the bot");
                embed.addField("MORE COMMANDS COMING SOON", "psst, he's lying");
                embed.setColor("#0070C0");
                embed.setTimestamp();
                message.channel.send(embed);
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
                if (message.member.roles.cache.has("789955130648166430")) {
                    newsplit = message.content.split(" ");
                    if (message.member.id === "801827038234804234") {
                        
                    }
                    else if (newsplit.length === 1) {
                        message.channel.bulkDelete(2);
                    } else {
                        message.channel.bulkDelete(parseInt(newsplit[1]) + 1);
                    }
                }
            break;
            case "bungou":
                embed = new MessageEmbed()
                embed.setTitle("Bungou Stray Dogs")
                embed.setDescription("Bungo Stray Dogs (Japanese: 文豪ストレイドッグス, Hepburn: Bungō Sutorei Doggusu, lit. 'Literary Stray Dogs') is a Japanese seinen manga series written by Kafka Asagiri and illustrated by Sango Harukawa, which has been serialized in the magazine Young Ace since 2012. The series follows the members of the 'Armed Detective Agency' throughout their everyday lives. The show mainly focuses on the weretiger Atsushi Nakajima, who joins others gifted with supernatural powers to accomplish different tasks including running a business, solving mysteries, and carrying out missions assigned by the mafia.Multiple light novels have been published. An anime television series adaptation by Bones aired in 2016 in two parts, the first part aired between 7 April 2016 and 23 June 2016, and the second part aired between 6 October 2016 and 22 December 2016. An anime film, Bungo Stray Dogs: Dead Apple, was released on 3 March 2018. A third season aired between 12 April 2019 and 28 June 2019. A spin-off television series adaptation of Bungo Stray Dogs Wan! premiered on 13 January 2021. Another film, Bungo Stray Dogs The Movie: Beast, was confirmed in March 2020 to be in development");
                embed.addField("Where to watch", "https://animepahe.com/anime/e9523036-5d5c-f06b-8310-fd2e0eaa303c\nhttps://lite.animevibe.wtf/anime/bungou-stray-dogs")
                embed.setColor("#0070C0");
                embed.setTimestamp();
                message.channel.send(embed);
            break;
            case "kick":
                const member = message.mentions.members.first();
                if (args[1] && (message.member.roles.cache.has("789955130648166430") || message.member.roles.cache.has("789938193830248479")) || message.member.roles.cache.has("789937840913383424")) {
                    member.kick();
                } else {
                    message.reply("you can't use that")
                }
            break;
            case "ban":
                const user = message.mentions.users.first();
                if(args[1] && (message.member.roles.cache.has("789955130648166430") || message.member.roles.cache.has("789938193830248479")) || message.member.roles.cache.has("789937840913383424")) {
                    message.guild.members.ban(user);
                } else {
                    message.reply("you can't use that")
                }
            break;
            case "update" :
                message.channel.send(`\`\`\`Prefix changed to /\`\`\``)
        }
    }
    if (message.content.toLowerCase().includes("pogchamp")) {
        if (message.member.user.id === "801827038234804234") {
        } else {
        message.reply("ugh fineee, I guess you are my little pogchamp, come here");
        }
    }
    else if (message.content.toLowerCase().includes("what is the meaning of life")) {
        message.reply("42");
    }
    else if (message.content.toLowerCase().includes("discord.gg")) {
        message.channel.bulkDelete(1);
        message.reply("nice... but we don't really do advertising here");
    }
    else if (message.content.toLowerCase().includes("hello karl") || message.content.toLowerCase().includes("hi karl")) {
        if(!(message.member.id === "801827038234804234")) {
            if(message.content.toLowerCase().includes("die") || message.content.toLowerCase().includes("suicide")) {
                message.channel.send(`hi ${message.member.user.username}-chan, don't die, your life is valuable, don't waste it ;)`);
            }
            else {
                greets = ["what a lovely day it is, but not as lovely as you ;)", "the sun is shining, but not as bright as your smile ;)", "what have you been up to?", "love u uwu", "sure hope your day has been going well :)", "have a great day uwu", "hope your day is as great as the day i met you ;)", "Let's curl up and read a horror novel together", "Would you like to steal trash with me?", "All my clues lead up to you being amazing", "I dig the look human", "even water is not as clear as how much I love you uwu", "Are you a garbage can? Because you smell f a n t a s t i c!"]
                message.channel.send(`hi ${message.member.user.username}-chan, ${greets[Math.floor(Math.random() * greets.length) - 1]}`);
            }   
        }
    }
    else if (message.content.toLowerCase().includes("compliment me")) {
        if(!(message.member.id === "801827038234804234")) {
            compliments = ["I would give my life for you in a heartbeat", "Depression is not an option, things will get better", "You're the best person I know", "No matter how many times you fall, I believe you can get back up again", "Enjoy life and value your friends", "Time is not of the essence when it comes to recovery", "Your body matters take care of it", "You're the sunshine to my morning", "You're not alone", "Your life matters, never forget that"]
            message.channel.send(`${message.member.user.username}, ${compliments[Math.floor(Math.random() * compliments.length) - 1]}`)
        }
    }
    else if (message.content.toLowerCase().includes("bye karl")) {
        if(!(message.member.id === "801827038234804234")) {
            message.channel.send(`bye ${message.member.user.username}-chan, have a great day uwu`);
        }
    }
    else if (message.content.toLowerCase().includes("what is the prefix")) {
        message.reply(`The current prefix is\`${prefix}\``);
    }
    else if (message.content.toLowerCase().includes("hello") || message.content.toLowerCase().includes("hi ") || message.content.toLowerCase().endsWith("hi")) {
        if(!(message.member.id === "801827038234804234")) {
            message.react("✌")
        }
    } 
    else if (message.content.toLowerCase().includes("suicide") || message.content.toLowerCase().includes("die")) {
        message.channel.send(`${message.member.user.username}-chan, life is too short to talk about dying, please continue to live, your life is valuable ;)`);
    }
    else if (message.content.toLowerCase().startsWith("hi")) {
        if (!(message.content[2])) {
            message.react("✌")
        }
    }
    else if (message.content.toLowerCase().startsWith("can i have ") || message.content.toLowerCase().startsWith("may i have ") || message.content.toLowerCase().startsWith("let me have ")) {
        acts = ["acts of God", "dinosaurs coming back from extinction", "a train going through the wall of my building", "your dad coming back from the store", "a hailstorm consisting of nothing but milk", "a meteor from mars breaking through my roof"]
        some = message.content.split(" ")
        content = some.splice(3, message.content.length - 1).join(" ")
        message.reply(`sorry senpai, my ${content} machine is broken due to ${acts[Math.floor(Math.random() * acts.length)]}`);
    }
    else if (message.content.toLowerCase().includes("what did you have for dinner last night")) {
        message.channel.send("Yeah")
    }
});
client.on('messageDelete', (messageDelete) => {
    channel = messageDelete.guild.channels.cache.find(i => i.name === "mod-logs")
    if(channel) {
        embed = new MessageEmbed();
        embed.setTitle("Message Deleted");
        embed.setDescription(messageDelete.content);
        embed.addField('Author', messageDelete.author);
        embed.addField('Channel', messageDelete.channel);
        embed.setColor("#0070C0");
        embed.setTimestamp();
        channel.send(embed);
    }
})
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
            embed.setColor("#0070C0");
            embed.setTimestamp();
            channel.send(embed);
        }
	} else {
        if(channel) {
            embed = new MessageEmbed();
            embed.setTitle("Member Banned");
            embed.setDescription(`${user.tag} was banned in ${guild.name}`);
            embed.setColor("#0070C0");
            embed.setTimestamp();
            channel.send(embed);
        }
	}
});
client.login(token);