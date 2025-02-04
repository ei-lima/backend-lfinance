exports.generateHash = async (passwd) => {
    const bcrypt = require('bcryptjs');
    return await bcrypt.hash(passwd, 10);
}

exports.compareHash = async (passwd, user_passwd) => {
    const bcrypt = require('bcryptjs');
    return await bcrypt.compare(passwd, user_passwd);
}