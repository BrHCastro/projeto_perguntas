//Imports.............................................................
const express = require('express');

//Variables...........................................................
const PORT = 8081;
const app = express();

//Configs............................................................
app.set('view engine', 'ejs'); //Inform to EXPRESS that view engine is EJS.

//Routes.............................................................
app.get('/', (req, res) => {
    res.render('index');
})




//Server..............................................................
app.listen(PORT, (err) => {
    if (err)
        console.log(`Oops! Server is not good. Error: ${err}`);
    else
        console.log(`Server is runner on port: http://localhost:${PORT}`);
});