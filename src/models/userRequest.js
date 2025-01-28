class UserRequest {
    constructor(body) {
        this.id = body.id;
        this.name = body.name;
        this.cpf = body.cpf;
        this.email = body.email;
        this.password = body.password;
    }
}