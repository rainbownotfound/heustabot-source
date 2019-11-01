var RichEmbed = require('discord.js').RichEmbed;

class Embed {
    constructor(client, title, description = '', fields = [], options = {}) {
        this.title = title;
        this.description = description;
        this.fields = fields;
        this.type = options.type
        this.url = options.url
        this.timestamp = options.timestamp
        this.color = options.color
        this.footer = options.footer
        this.image = options.image
        this.thumbnail = options.thumbnail
        this.video = options.video
        this.provider = options.provider
        this.author = options.author

        return new RichEmbed({ fields, video: this.video || this.url })
            .setTitle(this.title)
            .setColor(this.color == undefined ? 'RANDOM' : this.color)
            .setDescription(this.description)
            .setURL(this.url)
            .setImage(this.image)
            .setFooter(this.footer == undefined ? 'DHeusta - Glitch Hop Artist' : this.footer)
            .setAuthor(this.author === undefined ? client.user.tag : this.author)
            .setThumbnail(this.thumbnail == undefined ? client.user.avatarURL : this.thumbnail);
    }
}

module.exports.Embed = Embed;