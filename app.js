//Imports.............................................................
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/mysql');
const modelQuestion = require('./models/Question');
const modelAnswer = require('./models/Answer');
const moment = require('moment')
const localization = require('moment/locale/pt-br')

//Variables...........................................................
const PORT = 8081;
const app = express();

//Configs............................................................
app.set('view engine', 'ejs'); //Inform to EXPRESS that the view engine is the EJS.
app.use(express.static('public')); //Inform the directory of static files

app.use(bodyParser.urlencoded({extended: false})) //Translate form data to JSON
app.use(bodyParser.json());

//Mysql..............................................................
connection.authenticate()
    .then(() => {
        console.log('Connected on MySql');
    }).catch((err) => {
        console.log(err);
    });

//Routes.............................................................
app.get('/', (req, res) => {
    modelQuestion.findAll({ raw: true }).then((questions) => {
        // console.log(questions);
        res.render('index', {
            title: "Início", 
            questions: questions, 
            subStringRt, momentRt
        });
    }).catch((err) => {
        console.log(`Erro ao selecionar os dados: ${err}`);
    });
})

app.get('/askquestion', (req, res) => {
    res.render('askquestion', {title: "Faça sua pergunta!"});
})

app.post('/savequestion', (req, res) => {
    let title = req.body.title;
    let desc = req.body.desc;
    modelQuestion.create({
        title: title,
        description: desc
    }).then(() => {
        res.redirect('/')
    }).catch((err) => {
        console.log(`Error Create Question: ${err}`);
    })
});

app.get('/viewquestion/:id', (req, res) => {
    let id = req.params.id;
    modelQuestion.findOne({
        where: {id:id}
    }).then(question => {
        if (question != undefined)
            res.render('question', {title:question.title,momentRt,question:question});
        else
            res.redirect('/');
        
    }).catch((err) => {
        console.log(`Erro ao localizar a Pergunta solicitada: ${err}`);
    });
});

//Functions...........................................................
let subStringRt = ((str) => {
    return str.substring(0, 400) + '...'
});

let momentRt = ((dt) => {
    return moment(dt).fromNow();
});


//Server..............................................................
app.listen(PORT, (err) => {
    if (err)
        console.log(`Oops! Server is not good. Error: ${err}`);
    else
        console.log(`Server is runner on port: http://localhost:${PORT}`);
});