const CampoInvalido = require("../../erros/CampoInvalido");
const DadosNaoFornecidos = require("../../erros/DadosNaoFornecidos");
const TabelaFornecedor = require("./tabelaFornecedor");

class Fornecedor{
    constructor({id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao}){
        this.id = id;
        this.empresa = empresa;
        this.email = email;
        this.categoria = categoria;
        this.dataCriacao = dataCriacao;
        this.dataAtualizacao = dataAtualizacao;
        this.versao = versao;

    }
    
    async criar(){
        this.validar()
        const resultado = await TabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        })

        this.id = resultado.id;
        this.dataCriacao = resultado.dataCriacao;
        this.dataAtualizacao = resultado.dataAtualizacao;
        this.versao = resultado.versao;
    }

    validar(){
        const campos = ['empresa', 'email', 'categoria']

        campos.forEach(campos => {
            let value = this[campos]
            if(typeof value !== 'string' || value.length === 0){
                throw new CampoInvalido(campos)
            }
        })
    }

    async buscarPorID(){
        const resultado = await TabelaFornecedor.buscarPorID(this.id)
        console.log(resultado.email)
        this.empresa = resultado.empresa;
        this.email = resultado.email;
        this.categoria = resultado.categoria;
        this.dataCriacao = resultado.dataCriacaoa;
        this.dataAtualizacao = resultado.dataAtualizacao;
        this.versao = resultado.versao;
    }
    
    async update(){
        await TabelaFornecedor.buscarPorID(this.id)
        const campos = ['empresa', 'email', 'categoria']
        const dadosParaAtualizar = {}

        campos.forEach((campos) => {
            const valor = this[campos]

            if(typeof valor === 'string' && valor.length > 0){
                dadosParaAtualizar[campos] = valor
            }
        })

        if (Object.keys(dadosParaAtualizar).length === 0){
            throw new DadosNaoFornecidos();
        }

        await TabelaFornecedor.update(this.id, dadosParaAtualizar)
    }

    async delete(){
        const id = this.id
        console.log(`id do forn 2: ${id}`)
        const resultados = await TabelaFornecedor.buscarPorID(id)

        //Provavelmente nunca vai chegar nessa mensagem
        if(resultados.length < 0 || resultados.length > 1 ){
            throw new Error ('Especifique um valor valido !')
        }

        await TabelaFornecedor.delete(id)
    }
}

module.exports = Fornecedor;