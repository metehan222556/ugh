const Discord = require(`discord.js`)
const client = new Discord.Client()
const { readdirSync } = require(`fs`);
const { join } = require(`path`);

client.commands=  new Discord.Collection();

const prefix = "!"

const commandFiles = readdirSync(join(__dirname, "kodlar")).filter(file => file.endsWith(".js"));

for (const file of commandFiles){
  const command = require(join(__dirname, "kodlar", `${file}`));
  client.commands.set(command.kod, command);
}

client.on("error", console.error);

client.on(`ready`, () => {
  client.user.setStatus(`Beyhude Games`)
  console.log(`Yapay Zeka Aktif`)
});

client.on("message", async message => {

    if(message.author.bot) return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;

        try {
            client.commands.get(command).run(client, message, args);

      }   catch (error){
            console.error(error);
      }
   }
})

client.login(`OTY3NzM2Nzg1ODA5NTg0MTg4.YmUpHQ.Jsda8WeeOBJn3Z-GI96R_u2pCus`)
