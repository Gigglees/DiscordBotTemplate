/*This is the ping command, it's simple. some puts ping into the discord channel and the bot will reply with "pong" */

module.exports = {
	name: 'ping',
	description: 'Ping command',
	execute(message, args) {
		message.channel.send('Pong!');
	},
};
