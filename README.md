# Discord Bot Template (JavaScript)

A modern Discord bot template using discord.js v14+ with support for both traditional and slash commands.

## Alternative Versions

- [TypeScript Version](https://github.com/Gigglees/DiscordBotTemplate-Typescript)
- [Python Version](https://github.com/Gigglees/DiscordBotTemplate-Python)

## Features

- Modern discord.js v14+ implementation
- Support for both traditional and slash commands
- Environment variable configuration
- Built-in command handler
- Latency monitoring
- Automatic slash command registration
- Proper error handling

## Prerequisites

- Node.js 16.9.0 or higher
- npm (Node Package Manager)
- A Discord Bot Token

## Setup Instructions

1. **Install Dependencies**
2. **Configuration**

- Create a `.env` file in the root directory
- Add your bot credentials:
  ```
  DISCORD_TOKEN=your_token_here
  CLIENT_ID=your_client_id_here
  GUILD_ID=your_guild_id_here
  CHANNEL_ID=your_channel_id_here
  PREFIX=/
  ```

3. **Bot Token**

- Create a Discord application at [Discord Developer Portal](https://discord.com/developers)
- Create a bot user and copy the token
- Add token to your `.env` file

4. **Invite Bot**
   Use this URL to invite your bot (replace CLIENT_ID):

5. **Start the Bot**

## Available Commands

- `/ping` - Check bot latency
- `/hello` - Simple greeting command

## Development

Feel free to modify and extend the commands in the `commands` folder. Each command follows a modular structure for easy maintenance.

## Documentation

- [Discord.js Documentation](https://discord.js.org/docs/packages/discord.js/main)
- [Discord Developer Portal](https://discord.com/developers/docs/intro)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
