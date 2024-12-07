/*At the top of your file should include all imports / intents and variables (just my personal preference but i like tidy files)
All documentation can be found here: https://discord.js.org/docs/packages/discord.js/14.14.1 */

require('dotenv').config();
const {
	Client,
	GatewayIntentBits,
	ActivityType,
	Collection,
} = require('discord.js');

/*Intents are bitwise values that can be ORed ( | ) to indicate which events (or groups of events) you want Discord to send your app. 
A list of intents and their corresponding events are listed in the intents section.
read more here https://discord.com/developers/docs/topics/gateway#:~:text=Intents%20are%20bitwise%20values%20that,listed%20in%20the%20intents%20section.*/

/*These are commands, the code can be found in the commands folder. */
const pingCommand = require('./commands/ping');
const helloCommand = require('./commands/hello');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

/* This is "onReady", pretty much when the bot starts, this runs. you can get it to anything really,
including sending embed messages, changing the bot status, sending console logs, sending plain messages and more */
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}`); // This is just a console log, when your bot is online it will log it to the console!
	/* This is how you change the bot status within discord. pretty simple. So on ready the client.user will setActivity of the bot*/
	client.user.setActivity('i am a discord bot.', {
		type: ActivityType.Playing,
	});
});

/*This is the on MessageCreate section, pretty much this will wait for messages from a user, check if its from the bot or not and then reply accordingly */
client.on('messageCreate', async message => {
	const prefix = process.env.PREFIX;

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName);
	if (!command) return;

	try {
		await command.execute(message, args);
	} catch (error) {
		console.error(error);
		await message.reply('There was an error executing that command!');
	}
});

/* Create commands collection */
client.commands = new Collection();
client.commands.set('ping', pingCommand);
client.commands.set('hello', helloCommand);

/* Login with token from .env */
client.login(process.env.DISCORD_TOKEN);
