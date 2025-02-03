class UserRequest {
    constructor(body) {
        this.id = null;
        this.name = null;
        this.cpf = null;
        this.email = null;
        this.password = null;
        this.#assign(body);
    }

    #assign(body) {
        for (const attr in body) {
            if (Object.prototype.hasOwnProperty.call(this, attr)) {
                this[attr] = body[attr];
            }
        }
    }
}

module.exports = { UserRequest };