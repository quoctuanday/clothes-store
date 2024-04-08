const express = require('express');
const cors = require('cors');
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

app.use(cors());

app.listen(PORT, () => {
    console.log(`Server started on  http://localhost:${PORT}`);
});
