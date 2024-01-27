/*At the top of your file should include all imports / intents and variables (just my personal preference but i like tidy files)
All documentation can be found here: https://discord.js.org/docs/packages/discord.js/14.14.1 */

const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const { token, clientId, guildId, prefix } = require('./config.json'); //This is for security, i would normally use .env but this works too

/*Intents are bitwise values that can be ORed ( | ) to indicate which events (or groups of events) you want Discord to send your app. 
A list of intents and their corresponding events are listed in the intents section.
read more here https://discord.com/developers/docs/topics/gateway#:~:text=Intents%20are%20bitwise%20values%20that,listed%20in%20the%20intents%20section.*/

/*These are commands, the code can be found in the commands folder. */
const pingCommand = require('./commands/ping');
const helloCommand = require('./commands/hello');

const commands = {
	ping: pingCommand,
	hello: helloCommand,
};

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

/* This is "onReady", pretty much when the bot starts, this runs. you can get it to anything really,
including sending embed messages, changing the bot status, sending console logs, sending plain messages and more */
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`); // This is just a console log, when your bot is online it will log it to the console!
	/* This is how you change the bot status within discord. pretty simple. So on ready the client.user will setActivity of the bot*/
	client.user.setActivity('i am a discord bot.', {
		type: ActivityType.Playing,
	});
});

/*This is the on MessageCreate section, pretty much this will wait for messages from a user, check if its from the bot or not and then reply accordingly */
client.on('messageCreate', (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (commands[command]) {
		commands[command].execute(message, args);
	}
});

client.login(token); // This is just your client log in, pretty much tells discord your bot.
