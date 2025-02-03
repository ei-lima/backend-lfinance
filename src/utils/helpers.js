exports.generateHash = async (passwd) => {
    const bcrypt = require('bcryptjs');
    return await bcrypt.hash(passwd, 10);
}