class DadosNaoFornecidos extends Error {
    constructor (){
        super('Prencha os campos corretamente para poder atualizar !');
        this.name = 'DadosNaoFornecidos';
        this.idErro = 2;
    }
}

module.exports = DadosNaoFornecidos