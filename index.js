//libs
var fs = require('fs');
var Discord = require("discord.js");
var bot = new Discord.Client();

//auth... see authExample.json
var auth = require("./auth.json")

//stash
var stash = require("./stash.json")

console.log('starting up...')
bot.login(auth.token);

bot.on('ready', function() {
    console.log(`Logged in as ${bot.user.tag}!`);
});

//status reports
bot.on('message', function(msg) {
    if (msg.content === '!help') {
        msg.reply(`\n\nStatus Commands:   !gold   !inv   !status\n\nAdd Commands:   +gold **AMT**   +inv **ITEM**\n\nSubtract Commands:   -gold **AMT**   -inv **ITEM**`)
    }

    if (msg.content === '!status') {
        msg.reply(`Full Inventory:\n**${stash.gold} gold**\nBag of Holding: **${stash.bagOfHolding.join(', ')}**`)
    }

    if (msg.content === '!gold') {
        msg.reply(`Party Gold: **${stash.gold}**`);
    }

    if (msg.content === '!inv') {
        msg.reply(`Bag of Holding: **${stash.bagOfHolding.join(', ')}**`)
    }
});


//modifiers + or -
bot.on('message', function(msg) {
    if (msg.content[0] === '+' || msg.content[0] === '-') {
        var parseMsg = msg.content.split(' ')
        var command = parseMsg[0]
        var modifier = parseMsg[1]

        if (command === '+gold') {
            var amt = parseInt(modifier)
            stash.gold += amt
            fs.writeFileSync('stash.json', JSON.stringify(stash, null, 2));
            msg.reply(`Added **${parseMsg[1]}** gold!\nYour new total is: **${stash.gold}** gold`)

        }

        if (command === '-gold') {
            var amt = parseInt(modifier)
            stash.gold -= amt
            fs.writeFileSync('stash.json', JSON.stringify(stash, null, 2));
            msg.reply(`Subtracted **${parseMsg[1]}** gold!\nYour new total is: **${stash.gold}** gold`)


        }

        if (command === '+inv') {
            var item = msg.content.substring(5, msg.content.length)
            stash.bagOfHolding.push(item)
            fs.writeFileSync('stash.json', JSON.stringify(stash, null, 2));
            msg.reply(`Added **${item}** to the stash!\n The new inventory is: **${stash.bagOfHolding.join(', ')}**`)

        }

        if (command === '-inv') {
            var item = msg.content.substring(5, msg.content.length)
            var inventory = stash.bagOfHolding.findIndex(function(element) {
                return element === item
            })


            if (inventory === -1) {
                msg.reply(`I could not find **${item}** in your bag of holding`)
            } else {
                stash.bagOfHolding.splice(inventory, 1)
                fs.writeFileSync('stash.json', JSON.stringify(stash, null, 2));
                msg.reply(`Removed **${item}** from the stash!\n The new inventory is: **${stash.bagOfHolding.join(', ')}**`)

            }


        }

        // else {
        //     msg.reply('i do not understand what you want me to do...')
        // }

    }
});