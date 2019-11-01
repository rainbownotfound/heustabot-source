var Config = require('../../config.json');

class PermChecker {
    constructor(message, member, perm = '') {
        this.member = member;
        this.perm = perm;
        this.msg = message;
    }

    Check() {
        if(this.perm = 'BOT_DEVELOPER') {
            if(this.msg.author.id == Config.devID) {
                return true;
            } else {
                return false;
            }
        } else {
            if(this.member.permissions.has(this.perm)) {
                return true;
            } else {
                return false;
            }
        }
    }

    Perm() {
        return this.perm;
    }
}

module.exports.PermChecker = PermChecker;