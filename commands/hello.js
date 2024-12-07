/**
 * Hello Command
 * Simple greeting command that responds with a hello message
 * Supports both traditional message commands and slash commands
 *
 * Usage:
 * Traditional: /hello
 * Slash Command: /hello
 *
 * Response:
 * - Sends a friendly "Hello!" message
 */

module.exports = {
	name: 'hello',
	description: 'Send a greeting',
	async execute(message, args) {
		if (message.type === 2) {
			// Interaction
			await message.reply('Hello!');
		} else {
			// Regular message
			await message.channel.send('Hello!');
		}
	},
};
