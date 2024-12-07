/*Again, another command. This time a hello command. */

module.exports = {
	name: 'hello',
	description: 'Hello command',
	async execute(message, args) {
		await message.channel.send('Hello!');
	},
};
