const fieldValidator = (requiredFields) => {
    return (req, res, next) => {
        const errors = [];

        let payload = req.params;

        if (!Object.keys(payload).length) {
            payload = req.body;
        }

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