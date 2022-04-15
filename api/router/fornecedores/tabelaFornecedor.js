const Modelo = require('./modelsTabelaFornecedores');
const NaoEncontrado = require('../../erros/NaoEncontrado');

module.exports = {
    listar(){
        return Modelo.findAll({raw: true});
    },

    inserir(fornecedor){
        return Modelo.create(fornecedor);
    },

    async buscarPorID(id){
        const resultado = await Modelo.findOne({
            where:{
                id: id
            }
        })

        if(!resultado){
            throw new NaoEncontrado()
        }

        return resultado;
    },

    update (id, dadosParaAtualizar){
        return Modelo.update(dadosParaAtualizar,{
            where:{id:id}
        }); 
    },

    delete (id){
        return Modelo.destroy({
            where:{id: id}
        });
    }
}