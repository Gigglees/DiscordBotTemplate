/**
 * Ping Command
 * Responds with the latency between the bot and Discord API
 * Supports both traditional message commands and slash commands
 *
 * Usage:
 * Traditional: /ping
 * Slash Command: /ping
 *
 * Response includes:
 * - Initial "Pinging..." message
 * - Final response with latency in milliseconds
 */

module.exports = {
	name: 'ping',
	description: 'Check bot latency',
	async execute(message, args) {
		if (message.type === 2) {
			// Interaction
			const sent = await message.reply({
				content: 'Pinging...',
				fetchReply: true,
			});
			const latency = sent.createdTimestamp - message.createdTimestamp;
			await message.editReply(`Pong! Latency: ${latency}ms`);
		} else {
			// Regular message
			const reply = await message.channel.send('Pinging...');
			const latency = reply.createdTimestamp - message.createdTimestamp;
			await reply.edit(`Pong! Latency: ${latency}ms`);
		}
	},
};
