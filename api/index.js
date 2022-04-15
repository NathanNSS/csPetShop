const express = require('express');
const config = require('config');
const NaoEncontrado = require('./erros/NaoEncontrado');
const CampoInvalido = require('./erros/CampoInvalido');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos');
const ValorNaoSuportado = require('./erros/ValorNaoSuportado');
const formtAceitos = require('./Serializador').formatosAceitos;
const SerializadorErro = require('./Serializador').SerializadorErro;

const app = express();

app.use(express.json());
//app.use(express.urlencoded({extended:true}));

app.use((req, res, next) => {
    let formtReq = req.header('Accept');
    
    if(formtReq === '*/*'){
        formtReq = 'application/json'
    }

    if(formtAceitos.indexOf(formtReq) === -1){
        res.status(406).end()
        return;
    }

    res.setHeader('content-Type', formtReq);
    next();        
})

const router = require('./router/fornecedores');
app.use('/api/fornecedores', router)

app.use((erro, req, res, next) => {

    let status = 500

    if(erro instanceof NaoEncontrado){
        status = 404
    }
    if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos){
        status = 400
    }

    if(erro instanceof ValorNaoSuportado){
        status = 406
    }

    const serializador = new SerializadorErro(
        res.getHeader('Content-Type')
    )
    res.status(status)
    res.send(
        serializador.serializar({
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})

const port = config.get('api.port')
app.listen(port,() => {
    let cData = new Date() 
    let data = `${cData.getDate()}/${ cData.getMonth() + 1}/${cData.getFullYear()} ${cData.getHours()}:${cData.getMinutes()}:${cData.getSeconds()}`;
    console.log(`${data} Servidor rodando na porta ${port} :)`);
})