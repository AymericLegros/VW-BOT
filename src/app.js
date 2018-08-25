import { Client, RichEmbed } from 'discord.js';

import { apollo } from './apollo'
import gql from 'graphql-tag';

const config = {
  prefix: '+'
}

const bot = new Client();

bot.on('ready', async () => {
  console.log(`Logged in as ${bot.user.tag}!`)
  await bot.user.setActivity(`Warframe`, { type: 'PLAYING' })
});

bot.on('message', message => {
  if (message.author.bot) return
  if (message.content.indexOf(config.prefix) !== 0) return

  const messageTab = message.content.split(' ')
  messageTab.shift()

  let raw = false
  if (messageTab[messageTab.length - 1] === 'raw') {
    raw = true
    messageTab.pop()
  } 

  if (messageTab.length <= 0) return
  
  const name = messageTab.join(' ')

  apollo.query({
    query: gql`
      query ($filter: JSON) {
        getOneItemBy (filter: $filter) {
          name
          uniqueName
          description
          category
          imageName
          data
        }
      }
    `,
    variables: {
      filter: {
        name
      } 
    }
  })
  .then(data => {
    const item = JSON.parse(JSON.stringify(data.data.getOneItemBy))
    // console.log('item', item)
    if (item !== null) {
      let msg = new RichEmbed()

      if (!raw) { 
        msg.setTitle(`__${item.name}__`)
        msg.setDescription(item.description)
        // msg.setThumbnail(`https://raw.githubusercontent.com/WFCD/warframe-items/development/data/img/${item.imageName}`)
        msg.setImage(`https://raw.githubusercontent.com/WFCD/warframe-items/development/data/img/${item.imageName}`)
        msg.addField('Category', item.category, true)
        
        if (typeof item.data.type !== 'undefined') msg.addField('Type', item.data.type, true)
        if (typeof item.data.wikiaUrl !== 'undefined') msg.addField('Wiki', `[${item.name}](${item.data.wikiaUrl})`, true)
        if (typeof item.data.masteryReq !== 'undefined') msg.addField('Mastery', item.data.masteryReq, true)
        if (typeof item.data.disposition !== 'undefined') msg.addField('Dispositon', formatDisposition(item.data.disposition, item.data.omegaAttenuation), true)
        if (typeof item.data.rarity !== 'undefined') msg.addField('Rarity', item.data.rarity, true)
        if (typeof item.data.fusionLimit !== 'undefined') msg.addField('Level', item.data.fusionLimit, true)
      } else {
        delete item.data.patchlogs
        let data = JSON.stringify(item.data)
        data = data.substring(0, 2041)
        msg.setDescription('```' + `${data}` + '```');
      }

      message.channel.send(msg)
    }
  })
  .catch(error => console.error(error));
})

const formatDisposition = (disposition, omegaAttenuation) => {
  let dispositonStr = ''
  for (let i = 0; i < 5; i++) {
    dispositonStr += i < disposition ? '⬢' : '⬡'
  }
  return `${dispositonStr} (${omegaAttenuation})`
}

bot.on('guildMemberAdd', member => {
  console.log(member.guild)
  console.log(member.guild.roles)
  
  member.guild.roles.find(role => role.name === "Testeur");
  bot.channels.find("name","c-text")
              .send(`Bienvenue opérateur: ${member.user.username}!`)
})

// const twitchStream = new WebhookClient('webhook id', 'webhook token');
// twitchStream.send('I am now alive!');
// console.log('process.env.BOT_TOKEN', process.env.BOT_TOKEN)
bot.login(process.env.BOT_TOKEN);