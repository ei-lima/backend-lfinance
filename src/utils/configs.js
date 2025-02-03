module.exports = {
    secretKey: process.env.JWT_TOKEN,
    timeToTokenExpiresInHours: 3,
    defaultReturnUsers: { attributes: ['id', 'name', 'cpf', 'email'] }
}