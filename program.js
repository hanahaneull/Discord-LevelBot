const Discord = require("discord.js");
const client = new Discord.Client({
    disabledEvents: [
        "GUILD_UPDATE",
        "GUILD_MEMBER_ADD",
        "GUILD_MEMBER_REMOVE",
        "GUILD_MEMBER_UPDATE",
        "GUILD_MEMBERS_CHUNK",
        "GUILD_ROLE_CREATE",
        "GUILD_ROLE_DELETE",
        "GUILD_ROLE_UPDATE",
        "GUILD_BAN_ADD",
        "GUILD_BAN_REMOVE",
        "MESSAGE_CREATE",
        "CHANNEL_UPDATE",
        "CHANNEL_PINS_UPDATE",
        "MESSAGE_DELETE",
        "MESSAGE_UPDATE",
        "MESSAGE_DELETE_BULK",
        "MESSAGE_REACTION_ADD",
        "MESSAGE_REACTION_REMOVE",
        "MESSAGE_REACTION_REMOVE_ALL",
        "USER_UPDATE",
        "USER_NOTE_UPDATE",
        "USER_SETTINGS_UPDATE",
        "PRESENCE_UPDATE",
        "VOICE_STATE_UPDATE",
        "TYPING_START",
        "VOICE_SERVER_UPDATE",
        "RELATIONSHIP_ADD",
        "RELATIONSHIP_REMOVE",
    ]
});
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let token = "";
let channeid = "";
let spammed = 0;
let reconnect = false;

function random() {
    return Math.floor(Math.random() * 10) + 1
}

function junk(length) {
    let result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

rl.question('Discord Token (Right-click to paste)\n', (tokenInput) => {
    token += tokenInput
    rl.question('Channel ID (Right-click to paste)\n', (channelInput) => {
        channeid += channelInput
        client.login(token).catch(e => console.log(e.message));
        rl.close();
    });
    //rl.close();
});

client.on("ready", () => {
    reconnect = false
    console.log(client.user.tag + " Just logged in!")
    const channelS = client.channels.find(channel => channel.id == channeid)
    if (!channelS) return console.log("No channel founded!")
    const spammer = setInterval(() => {
        if (reconnect) return console.log("Waiting to reconnect so the message wont fail to send xD");
        const repeat = random()
        let texttospam = '';
        for (let i = 0; i < repeat; i++) {
            texttospam += ' ' + junk(repeat)
        }
        channelS.send(texttospam)
        spammed++
        console.log(`Dab! just spammed ${spammed} messages`)
    }, 62000)
})

client.on("reconnecting", () => {
    reconnect = true
    console.log("Bruh, reconnecting LMAO.")
})