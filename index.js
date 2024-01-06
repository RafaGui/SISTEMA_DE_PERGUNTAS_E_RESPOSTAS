const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // CAPTURA OS DADOS DO FORMULÁRIO COMO LISTADOS NA ROTA POST DO FORM
const retornohihi = require("./mod/functions");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
// DATABASE CONNECTION
connection
    .authenticate()
    .then(()=>{
        retornohihi();
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

app.set('view engine','ejs'); // SET A VIEW ENGINE QUE USAREMOS... NO CASO A EJS // POR PADRÃO PROCURA ARQUIVOS NA PASTA VIEWS
app.use(express.static('public')); // SET A PASTA PUBLIC COM OS ARQUIVOS CSS, JS.. ETC
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json);

// DEFINE AS ROTAS A PARTIR DO METODO GET
app.get("/", (req, res)=>{
    Pergunta.findAll({ raw: true, order: [
        ['id', 'DESC'] // ASC = CRESCENTE, DESC = DECRESCENTE
    ]}).then(perguntas => { //FINDALL 
        res.render("index", {
            perguntas: perguntas
        });
    })
})
app.get("/perguntar", (req, res)=>{
    res.render("perguntar"); // RENDERIZA O ARQUIVO INDEX LOCALIZADO NA PASTA VIEWS
})
app.post("/questrecived", (req, res)=>{
    let title = req.body.title;
    let description = req.body.description;
    Pergunta.create({
        title: title,
        description: description
    }).then(() =>{
        res.redirect("/");
    });
})

app.get("/pergunta/:id" , (req, res) =>{ // usando :n vc define um parametro na url, "n" é o nome do parametro
    let id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaID: pergunta.id},
                order: [['id','DESC']]
            }).then(respostas =>{
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        } else{
            res.redirect('/');
        }
    });
})

app.post("/pergunta", (req, res)=>{
    let corpo = req.body.corpo;
    let respostaid = req.body.respostaid;
    
    Resposta.create({
        corpo: corpo,
        perguntaID: respostaid
    }).then(()=>{
        res.redirect("/pergunta/"+respostaid);
    });

});

// INICIA O SERVIDOR
app.listen(8181, ()=>{
    console.log("Servidor Rodando");
})