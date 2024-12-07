/**
 * Main entry point for the Discord bot
 * Using discord.js v14+ with REST API and Slash Commands support
 * Documentation: https://discord.js.org/docs/packages/discord.js/main
 */

require('dotenv').config();
const {
	Client,
	GatewayIntentBits,
	ActivityType,
	Collection,
	Routes,
	REST,
} = require('discord.js');

/**
 * Intents Configuration
 * Guilds: Enables server-related events
 * GuildMessages: Enables message-related events in servers
 * MessageContent: Required for accessing message content (Privileged Intent)
 * For more information on intents, visit:
 * https://discord.com/developers/docs/topics/gateway#privileged-intents
 */

// Import command modules
const pingCommand = require('./commands/ping');
const helloCommand = require('./commands/hello');

// Initialize Discord client with required intents
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

/**
 * Bot Ready Event Handler
 * Triggers once when the bot successfully connects to Discord
 * Sets up initial bot status and logs connection confirmation
 */
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

/* Create REST instance */
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

/* Prepare commands for registration */
const commands = [
	{
		name: 'ping',
		description: 'Replies with Pong!',
	},
	{
		name: 'hello',
		description: 'Replies with Hello!',
	},
];

/* Function to register commands */
async function registerCommands() {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(
				process.env.CLIENT_ID,
				process.env.GUILD_ID
			),
			{ body: commands }
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
}

// Register commands when bot starts
(async () => {
	try {
		await registerCommands();
	} catch (error) {
		console.error('Error registering commands:', error);
	}
})();

// Interaction handler
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: 'There was an error executing this command!',
			ephemeral: true,
		});
	}
});
