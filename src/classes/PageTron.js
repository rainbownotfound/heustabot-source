const PageTron = async(msg, PageList, EmojiList = ['⏪', '⏩'], timeout = 300000) => {
    if(!msg && !msg.channel) msg.author.send('Channel is inaccessible.').catch(() => {
        msg.guild.channels.find(c => c.name == "logs").send('**Error!** Discord.MessageChannel is inaccessible. Discord.GuildMember disabled DMs.');
    });
    if(!PageList) msg.guild.channels.find(c => c.name == 'logs').send('**Error!** PageTron.PageList is not given.').then(() => {
        msg.channel.send('I encountered an error! Log created.');
    });
    if(EmojiList.length !== 2) msg.guild.channels.find(c => c.name == 'logs').send('**Error!** PageTron.EmojiList needs 2 emojis!');

    let Page = 0;
    const CurPage = await msg.channel.send(PageList[Page].setFooter(`Page ${Page + 1} / ${PageList.length}`));

    for (const Emoji of EmojiList) await CurPage.react(Emoji);

    const ReactionCollector = CurPage.createReactionCollector(
        (Reaction, User) => EmojiList.includes(Reaction.emoji.name) && !User.bot,
        { time: timeout }
    );

    ReactionCollector.on('collect', Reaction => {
        Reaction.remove(msg.author);
        switch (Reaction.emoji.name) {
            case EmojiList[0]:
                Page = Page > 0 ? --Page : PageList.length - 1;
                break;
            case EmojiList[1]:
                Page = Page + 1 < PageList.length ? ++Page : 0;
                break;
            default:
                break;
        }

        CurPage.edit(PageList[Page].setFooter(`Page ${Page + 1} / ${PageList.length}`));
    });
    return CurPage;
}

module.exports = PageTron;