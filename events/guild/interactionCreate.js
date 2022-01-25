module.exports = async (Discord, client, interaction) => {
  if (interaction.isCommand()) {
    const profileModel = require("../../models/profileSchema");
    let profileData;
    try {
      profileData = await profileModel.findOne({
        userID: interaction.user.id
      });
      if (!profileData) {
        profileData = await profileModel.create({
          userID: interaction.user.id,
          dono: 0
        });
        profileData.save();
      }
    } catch (err) {
      console.log(err);
    }


    await interaction.deferReply({
      ephemeral: false
    }).catch(() => {});

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd)
      return interaction.followUp({
        content: "An error has occured "
      });

    const args = [];
    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(interaction.user.id);

    cmd.execute(interaction, args, cmd, client, Discord, profileData);
  }

}