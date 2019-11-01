const { YouTube } = require('better-youtube-api');
var yt = new YouTube('AIzaSyBMYjZfnsJDv5jM0aEEiWKv67wyZSRlqQE');

const { Embed } = require('../classes/Embed');

module.exports.run = (client, message, args) => {
    yt.getChannel('UCnDRJtCIvu8vGr7BiFSlQAg').then(async (channel) => {
        await message.channel.send(new Embed(client, `${channel.data.snippet.title}`, `${channel.data.snippet.description}`, [
            {
                name: 'Basic Stats',
                value: `**${channel.data.statistics.viewCount}** channel views\n**${channel.data.statistics.subscriberCount}** subscribers\n**${channel.data.statistics.commentCount}** channel comments`,
                inline: true
            },
            {
                name: 'Channel Keywords',
                value: `${channelKeyWords(channel.keywords)}`,
                inline: true
            },
            {
                name: 'Developer Stats',
                value: `${devStatsForChannel(channel)}`
            }
        ], {
            image: channel.banners.bannerImageUrl,
            thumbnail: channel.profilePictures.high.url,
            author: `YouTube Channel - ${channel.name}`,
            footer: `URL - ${channel.customUrl ? channel.customUrl : channel.url}`
        }));
    });
}

function channelKeyWords(keywords) {
    res = '';
    keywords.forEach(keyword => {
        res += `${keyword}\n`;
    });

    return res;
}

function devStatsForChannel(chan) {
    full = chan.full;
    publishedAt = chan.data.snippet.publishedAt;
    linked = chan.data.status.isLinked;
    subsHidden = chan.data.statistics.hiddenSubscriberCount;
    id = chan.id;
    country = chan.country;
    lang = chan.language;

    if(full === true) {
        fullMsg = 'This channel is FULL';
    } else {
        fullMsg = 'This channel is NOT FULL';
    }

    if(linked === true) {
        linkedMsg = 'This channel is LINKED';
    } else {
        linkedMsg = 'This channel is NOT LINKED';
    }

    if(subsHidden === true) {
        subMsg = 'Channel subscribers are PRIVATE';
    } else {
        subMsg = 'Channel subscriptions are PUBLIC';
    }

    if(lang === undefined) {
        langMsg = 'Channel language is UNDEFINED';
    } else {
        langMsg = `Channel language is ${lang}`;
    }

    res = `${fullMsg}\n${linkedMsg}\n${subMsg}\n${langMsg}\n\nPublished at \`${publishedAt}\`\nChannel ID is \`${id}\`\nChannel is based in ${country}`;

    return res;
}