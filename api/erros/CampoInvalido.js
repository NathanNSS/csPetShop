class CampoInvalido extends Error {
    constructor (campo) {
        const mensagem = `Campo ${campo} esta invalido !!`
        super(mensagem);
        this.name = 'CampoInvalido';
        this.idErro = 1;
    }
}

module.exports = CampoInvalido
