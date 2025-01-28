const fieldValidator = (requiredFields) => {
    return (req, res, next) => {
        const errors = [];

        const payload = req.params.lenght ? req.params : req.body;

        requiredFields.forEach((field) => {
            if (!payload[field]) {
                errors.push(`O campo '${field}' é obrigatório.`);
            }
        });

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        next();
    };
};

module.exports = fieldValidator;