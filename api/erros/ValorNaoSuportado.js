class ValorNaoSuportado extends Error{
    
    constructor(contentType){
        super(`O tipo de conteudo ${contentType} não e suportado !!`);
        this.name = 'ValorNaoSuportado';
        this.idErro = 3;
    }
}

module.exports = ValorNaoSuportado