const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role.id)) {
            return res.status(403).json({ error: 'Acesso negado' });
        }
        next();
    };
};

module.exports = { checkRole };