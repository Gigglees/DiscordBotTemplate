/*Again, another command. This time a hello command. */

module.exports = {
	name: 'hello',
	description: 'Hello command',
	execute(message, args) {
		message.channel.send('Hello!');
	},
};
