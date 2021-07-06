const { TOKEN, STATUS, LINK, VOLUME } = require("./config.json");
const discord = require("discord.js");
const ytdl = require('ytdl-core');
const fs = require('fs');
const client = new discord.Client();

client.on('ready', async message => 
{
  client.user.setActivity(STATUS || "Radio");
});


  client.on('message', async message => 
  {
    if (message.content === '*hymn') 
    {
      // Dolacza do tego samego kanalu glosowego co autor wiadomosi
      if (message.member.voice.channel) 
      {
       const connection = await message.member.voice.channel.join(); 
       connection.play(LINK, { volume: VOLUME });
       setTimeout(() => {  message.guild.me.voice.channel.leave();}, 195600+20000); //195600 to czas trwania hymnu po uplynieciu tego czasu bot wyjdzie z kanalu glosowego a 20000 to dodatkowy czas w razie scinki muzyki i faktu ze mija kilka sekund zanim hymn zaczyna grac
      
       
      }
    }
    
 });

 
 client.on('message', async message => 
 {
  if (message.content === '*hymn stop') 
  {
    message.guild.me.voice.channel.leave();
  }
 });



client.login(TOKEN) 
process.on('unhandledRejection', console.error);
