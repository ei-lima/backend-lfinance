module.exports = {
    secretKey: process.env.JWT_TOKEN,
    timeToTokenExpiresInHours: 3,
    defaultReturnUsers: {
        attributes: ['id', 'name', 'cpf', 'email', 'roleId']
    },
    permission: {
        admin: 1,
        viewer: 2,
        limited: 3,
        operator: 4
    }
}