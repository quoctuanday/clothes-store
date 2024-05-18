const path = require('path');
const { PORT } = require('./config/env');
const handlebars = require('express-handlebars');
const express = require('express');
const methodOverride = require('method-override');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const route = require('./routes');
const db = require('./config/db');

const app = express();
// const PORT = 8000;

db.connect();

app.use(cookieParser());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
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
            eq: function (arg1, arg2, options) {
                return arg1 === arg2 ? options.fn(this) : options.inverse(this);
            },
        },
    })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//router init
route(app);

app.listen(PORT, () => {
    console.log(`Server started on  http://localhost:${PORT}`);
});
