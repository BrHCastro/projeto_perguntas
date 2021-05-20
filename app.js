//Imports.............................................................
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/mysql');
const modelQuestion = require('./models/Question');

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
        res.render('index', {title: "Início", questions: questions});
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



//Server..............................................................
app.listen(PORT, (err) => {
    if (err)
        console.log(`Oops! Server is not good. Error: ${err}`);
    else
        console.log(`Server is runner on port: http://localhost:${PORT}`);
});