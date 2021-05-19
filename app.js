//Imports.............................................................
const express = require('express');

//Variables...........................................................
const PORT = 8081;
const app = express();

//Configs............................................................
app.set('view engine', 'ejs'); //Inform to EXPRESS that the view engine is the EJS.
app.use(express.static('public')); //Inform the directory of static files

//Routes.............................................................
app.get('/', (req, res) => {
    res.render('index', {title: "Início"});
})




//Server..............................................................
app.listen(PORT, (err) => {
    if (err)
        console.log(`Oops! Server is not good. Error: ${err}`);
    else
        console.log(`Server is runner on port: http://localhost:${PORT}`);
});