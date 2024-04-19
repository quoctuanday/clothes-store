const path = require('path');
const express = require('express');

const methodOverride = require('method-override');
const handlebars = require('express-handlebars');

const db = require('./config/db');
const route = require('./routes');

const app = express();
const PORT = 8000;

//Connect to db
db.connect();

//router init
route(app);

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

//Static file
app.use(express.static(path.join(__dirname, 'public')));

//Override method
app.use(methodOverride('_method'));

//Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.listen(PORT, () => {
    console.log(`Server started on  http://localhost:${PORT}`);
});
