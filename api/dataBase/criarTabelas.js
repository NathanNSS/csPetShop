const ModeloTabela = require('../router/fornecedores/modelsTabelaFornecedores')

ModeloTabela
    .sync()
    .then(() => console.log('Tabela criada com sucesso :)'))
    .catch(console.log)