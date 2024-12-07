/*This is the ping command, it's simple. some puts ping into the discord channel and the bot will reply with "pong" */

module.exports = {
	name: 'ping',
	description: 'Ping command',
	async execute(message, args) {
		const reply = await message.channel.send('Pinging...');
		const latency = reply.createdTimestamp - message.createdTimestamp;
		await reply.edit(`Pong! Latency: ${latency}ms`);
	},
};
