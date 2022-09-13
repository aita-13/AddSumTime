// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
// const { token } = require('./config.json');
const token = process.env.DISCORD_BOT_TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


// When the client is ready, run this code (only once)
client.on('ready', () => {
  // console.log('Ready!');
  
  // add 
  setInterval(() => {
    client.user.setActivity(' test ', { type: 'PLAYING' })
  })
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('PPong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
  } else if (commandName === '256') {
    await interaction.reply('start time!');
  }
});


// add
client.on("ready", async () => {
  const data = [{
      name: "startTime",
      description: "作業時間計測開始",
  },
  {
      name: "endTime",
      description: "作業時間計測終了",
  }
];
  await client.application.commands.set(data);
  console.log("Ready!");
});


let startTime;

client.on("interactionCreate", async (Interaction) => {

  if (!Interaction.isCommand()) {
      return;
  }
  if (Interaction.commandName === "startTime") {
    startTime = new Date();

    const h = startTime.getHours();
    const m = startTime.getMinutes();
    const s = startTime.getSeconds();
    await Interaction.reply(`作業開始時間：${h}時${m}分${s}秒`);

  } else if (Interaction.commandName === "endTime") {

    const now = new Date();
    const d = new Date(Date.now() - startTime);

    const nowH = now.getHours();
    const nowM = now.getMinutes();
    const nowS = now.getSeconds();

    // const h = String(d.getHours()).padStart(2, 0);
    const m = String(d.getMinutes()).padStart(2, 0);
    const s = String(d.getSeconds()).padStart(2, 0);
    
    const memoryTime = [ m, s];
    console.log(memoryTime);
    
    await Interaction.reply(
      `
      作業終了時間： ${nowH}時${nowM}分${nowS}秒\n【作業時間: ${m}分${s}秒】
      `);
  }
});





// Login to Discord with your client's token
client.login(token);


// help https://teratail.com/questions/sugtmodgflevmr