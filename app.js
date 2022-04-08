const express = require('express');
const app = express();
const moment = require('moment');
const port = 8081;
const path = require('path');
const handlebars = require('express-handlebars');
const Cavalo = require('./models/Cavalo');//modelo que vai fazer a conexão com o banco de dados, modelo da tabela

//O Express oferece soluções para: Gerenciar requisições de diferentes verbos HTTP em diferentes URLs.
//e Integrar "view engines" para inserir dados nos templates

//configura qual o motor template 
//função do engine template linkar os dados com um template (db-html)
//Pega as informações do banco de dados e junta com o template resultando em um documento com as informações do banco
//outra função: consegue particionar a visualização do site, consegue reaproveitar código exemplo é navbar chamado no principal se refletindo para as demais páginas

//sequelize: faz a comunicação com o banco de dados
//orm - faz o mapeamento do banco usando o sequelize(postgres)

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    helpers: {
        //formata a data para o formato brasileiro
        formateDate: (date) => {
            return moment.date.format('DD/MM/YYYY');
        }
    }

}));
//setar o projeto com o template
app.set('view engine', 'handlebars');

//middleware
//transformação das informações pra json para poderem ser implemetadas

app.use(express.urlencoded({ extend: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'/assets')))

//rota principal da aplicação
app.get('/', (req, res) => {
    //tá pegando o model e 
    //por estar renderizando a página com um motor template usa o render
    //página home
    Cavalo.findAll().then((cavalos)=>{
        //renderiza uma página ou resposta
        res.render('home'); //leva para home
    }); //imprime todos os cadastrados
    
})

app.get('/lista', (req, res) => {
    Cavalo.findAll().then((cavalos)=>{
        res.render('lista', {cavalos: cavalos}); //leva para home os cadastros de cavalo
    }); 
    
})

//abre o formulário
//renderiza o cadastro
app.get('/cadastro', (req, res) => {
    res.render('cadastroCavalo');
});


//
app.post('/cadastroPost', (req, res) => {

    //uso do módulo Cavalo para enviar os dados para o formulario
    //criação de objeto para enviar os dados para o banco, persistência dos dados

    if(!req.body.nome){
        console.log('nome obrigatorio')
        res.redirect('/')

    }

    Cavalo.create({ //traz infos que estão vindo pelo corpo da requisição (vem do front-end)
        baia: req.body.baia,
        nome: req.body.nome,
        nroRegistro: req.body.nroRegistro,
        pelagen: req.body.pelagem,
        raca: req.body.raca,
        sexo: req.body.sexo,
        dataNasc: req.body.dataNasc,
        nomePai: req.body.nomePai,
        nomeMae: req.body.nomeMae,
        proprietario: req.body.proprietario,
        cpf: req.body.cpf,
        contato: req.body.contato,
        email: req.body.email,
    }).then(()=>{
        //caso seja sucesso
        console.log('Informações do cavalo salva com sucesso');
        res.redirect('/lista');
    }).catch((erro)=>{
        //caso contrário lança o erro
        console.log(`erro ao salvar as informações do cavalo: ${erro}`);
        res.redirect('/');
    })

})
//pega o id do cavalo passado pela url
app.get('/deletar/:id',(req,res)=>{
    Cavalo.destroy({
        where: {'id': req.params.id}
    }).then(()=>{
        res.redirect('/lista');
    }).catch(err=>{
        res.send(`erro ao excluir informações do cavalo: ${erro}`);
    })
})

// editando um cadastro
app.get('/editar/:id',(req, res)=>{
    id=req.params.id
    res.render('editar')
})
app.post('/editar',(req, res)=>{
    Cavalo.update({
        baia: req.body.baia,
        nome: req.body.nome,
        nroRegistro: req.body.nroRegistro,
        pelagen: req.body.pelagem,
        raca: req.body.raca,
        sexo: req.body.sexo,
        dataNasc: req.body.dataNasc,
        nomePai: req.body.nomePai,
        nomeMae: req.body.nomeMae,
        proprietario: req.body.proprietario,
        cpf: req.body.cpf,
        contato: req.body.contato,
        email: req.body.email,
    }, {
        where: {id: id},
    }).then(()=>{
        res.redirect('/lista')
    }).catch((erro)=>{
        console.log(`Erro ao editar cadastro do cavalo: ${erro}`)
    })
})


//abrir o servidor
app.listen(port, () => { console.log(`servidor rodando na url htt://localhost ${port}`) }); //template string
