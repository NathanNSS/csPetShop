const express = require('express');
const TabelaFornecedor = require('./tabelaFornecedor');
const Fornecedor = require('./Fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor;


const router = express.Router()

router.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar();
    const serializador = new SerializadorFornecedor(
        res.getHeader('Content-Type')
    )
    res.status(200).send(
        serializador.serializar(resultados)
    )
});

router.get('/:idFornecedor', async (req, res, next) => {
    try{
        const idFornecedor = req.params.idFornecedor
        const resultado = new Fornecedor({id:idFornecedor});
        await resultado.buscarPorID();
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type'),
            ['email', 'dataCriacao', 'dataAtualizacao', 'versao']
        )
        res.status(200).send(
            serializador.serializar(resultado)
        )
    }catch(erro){
        next(erro)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const dados = req.body;
        const fornecedor = new Fornecedor(dados);
        await fornecedor.criar();
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type')
        )
        res.status(201).send(
            serializador.serializar(fornecedor)
        )
        //res.status(201).json(fornecedor)
    }catch(erro){
        next(erro);
    }
})

router.put('/:idFornecedor', async (req, res, next) => {
    try{
        const id = req.params.idFornecedor
        const dadosBody = req.body
        const dados = Object.assign({}, dadosBody,{id: id});
        const fornecedor = new Fornecedor(dados);
        await fornecedor.update()
        res.status(204).end()
    }catch(erro){
        next(erro)
    }
})

router.delete('/:idFornecedor',async (req, res, next) => {
    try{
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.delete()
        res.status(204).end()
    }catch(erro){
        next(erro);
    }
})


module.exports = router;