const { Client } = require("discord.js");
const fs = require("fs");
const readline = require("readline");
require("dotenv").config();

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { DataResolver } = require("discord.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("\x1b[36m=========================================\x1b[0m");
console.log("\x1b[35;47m          Welcome to GIF Master          \x1b[0m");
console.log("\x1b[36m=========================================\x1b[0m");
console.log("\x1b[35;47m        Developed by Science Gear        \x1b[0m");
console.log("\x1b[36m=========================================\x1b[0m");
console.log(" ");
console.log("\x1b[31mIf you don't trust us, you can reset your token after you've completed your work.\x1b[0m");
console.log(" ");




const client = new Client({ intents: "Guilds" });

rl.question("Enter your Discord bot token: ", async (token) => {
  // Setting token
  process.env.token = token;

  client.once("ready", async () => {
    // Avatar URL input
    rl.question("Enter the URL for your avatar (or press Enter to skip): ", async (avatarURL) => {
      // Setting avatar
      if (avatarURL) {
        try {
          await client.user.setAvatar(avatarURL);
          console.log("Avatar changed successfully!");
        } catch (error) {
          console.error("Error changing avatar:", error);
        }
      }

      // Banner URL input
      rl.question("Enter the URL for your banner (or press Enter to skip): ", async (bannerURL) => {
        // Setting banner
        if (bannerURL) {
          const rest = new REST({ version: "9" }).setToken(process.env.token);
          try {
            await rest.patch(Routes.user(), {
              body: { banner: await DataResolver.resolveImage(bannerURL) },
            });
            console.log("Banner changed successfully!");
          } catch (error) {
            console.error("Error changing banner:", error);
          }
        }

        // Close readline interface and exit process
        rl.close();
        process.exit(0);
      });
    });
  });

  // Log in with provided token
  client.login(process.env.token);
});


/**
 * @INFO
 * Bot Coded by Science Gear | https://www.youtube.com/c/ScienceGearYT
 * @INFO
 *  Muzio Bot | https://dsc.gg/sciencegear
 * @INFO
 * Don't Remove Credits
 * @INFO
 */