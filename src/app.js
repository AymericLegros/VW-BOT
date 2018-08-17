import { Client, RichEmbed } from 'discord.js';

// import './apollo'
import './twitch'

const bot = new Client();

bot.on('ready', async () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  await bot.user.setActivity('Warframe', { type: 'PLAYING' })
});



bot.on('message', message => {
  // If the message is "how to embed"
  if (message.content === 'test') {
    // We can create embeds using the MessageEmbed constructor
    // Read more about all that you can do with the constructor
    // over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
    const embed = new RichEmbed()
      // Set the title of the field
      .setTitle('A slick little embed')
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription('Hello, this is a slick embed!')

      .setFooter('LOLOLO')

      .setThumbnail('https://vignette.wikia.nocookie.net/warframe/images/4/4d/DENitainExtract.png')

      .setImage('https://preview.ibb.co/f9ZDU7/maxresdefault.jpg')

      .setAuthor('Neptius', 'https://simgbb.com/images/users/av_fsnLTv.jpg')

      .setTimestamp(new Date())

      .addBlankField(true)

      .addField('lolll', 'Lorem ipsum dolorfef ezefefezfze <em>LOOOOOO</em>', true )
      
      .addBlankField(true)
    // Send the embed to the same channel as the message
    message.channel.send(embed);
  }
});


// const twitchStream = new WebhookClient('webhook id', 'webhook token');
// twitchStream.send('I am now alive!');
// console.log('process.env.BOT_TOKEN', process.env.BOT_TOKEN)
bot.login(process.env.BOT_TOKEN);